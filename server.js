import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

// Rate limiting store
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Middleware
app.use(cors());
app.use(express.json());

// Clean up old entries periodically
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now - data.firstRequestTime > RATE_LIMIT_WINDOW) {
        rateLimitStore.delete(ip);
      }
    }
  },
  5 * 60 * 1000,
);

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (now - record.firstRequestTime > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

app.post("/api/contact", async (req, res) => {
  try {
    const clientIp = req.ip || req.connection.remoteAddress || "unknown";

    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: "Message is too short" });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
      console.error("SMTP credentials not configured");
      return res.status(500).json({
        error: "Server configuration error. Please try again later.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Timestamp: ${new Date().toLocaleString()}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="margin-top: 20px; padding: 20px; background: #fff; border-left: 4px solid #ff6b35;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      error: "Failed to send message. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✉️  API Server running on http://localhost:${PORT}`);
});
