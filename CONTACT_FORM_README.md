# Quick Setup Instructions

## 🚀 Get Your Contact Form Working in 3 Steps

### Step 1: Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with your Gmail account (maryu.3738@gmail.com)
3. If you don't see "App passwords", enable 2-Factor Authentication first
4. Create a new app password:
   - App: Mail
   - Device: Other (name it "Portfolio")
5. Copy the 16-character password (it looks like: `abcd efgh ijkl mnop`)

### Step 2: Update .env File

Open `.env` file and replace `your-app-password-here` with the password you just copied:

```env
SMTP_USER=maryu.3738@gmail.com
SMTP_APP_PASSWORD=abcdefghijklmnop
```

**Note**: Remove all spaces from the app password!

### Step 3: Test It

```bash
npm run dev
```

Navigate to the Contact section and send a test message. You should receive it at maryu.3738@gmail.com!

---

## 📝 What This Does

- **Client-side validation**: Checks email format, required fields, minimum message length
- **Honeypot protection**: Blocks spam bots
- **Rate limiting**: Max 5 messages per hour per IP
- **Secure email**: Uses Gmail SMTP with app password (never your real password)
- **Beautiful UI**: Maintains your vinyl-themed design with smooth animations

## 🔒 Security

✅ SMTP credentials stored in environment variables  
✅ Never exposed to frontend code  
✅ Honeypot field for bot protection  
✅ Rate limiting prevents spam  
✅ Server-side validation  
✅ .env file gitignored

## 🐛 Troubleshooting

**"Server configuration error"**
→ Make sure .env file exists and has the correct credentials

**"Invalid email format"**
→ Check that you're entering a valid email with @ and domain

**"Too many requests"**
→ Wait an hour or test from a different network

**Emails not arriving**
→ Check spam folder, verify app password is correct

## 📦 When Deploying to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `SMTP_USER` = maryu.3738@gmail.com
   - `SMTP_APP_PASSWORD` = your-16-char-password
3. Redeploy

---

For detailed documentation, see [CONTACT_SETUP.md](./CONTACT_SETUP.md)
