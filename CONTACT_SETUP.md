# Contact Form Setup Guide

This guide will help you set up the fully functional contact form with Gmail SMTP integration.

## Prerequisites

- A Gmail account
- Node.js installed
- Your portfolio project

## Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

## Step 2: Generate Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)** - enter "Portfolio Contact Form"
4. Click **Generate**
5. Copy the 16-character app password (shown without spaces)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to create `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:

   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_APP_PASSWORD=abcdefghijklmnop
   ```

   **IMPORTANT**:
   - Use the 16-character app password, NOT your Gmail password
   - Never commit `.env` to version control

## Step 4: Install Dependencies

```bash
npm install
```

This will install:

- `nodemailer` - For sending emails via SMTP

## Step 5: Test Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your Gmail inbox for the test message

## Step 6: Deploy to Vercel

1. Install Vercel CLI (if not already):

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Add environment variables in Vercel Dashboard:
   - Go to your project settings
   - Navigate to **Environment Variables**
   - Add:
     - `SMTP_USER` = your-email@gmail.com
     - `SMTP_APP_PASSWORD` = your-app-password

4. Redeploy to apply the environment variables

## Security Features Implemented

### 1. Honeypot Field

- Hidden field that bots typically fill out
- If filled, submission is silently rejected

### 2. Rate Limiting

- Maximum 5 submissions per hour per IP address
- Prevents spam and abuse
- Automatic cleanup of old entries

### 3. Input Validation

- Server-side validation of all fields
- Email format validation
- Minimum message length enforcement
- Protection against injection attacks

### 4. Environment Variables

- SMTP credentials never exposed to frontend
- Stored securely in environment variables
- Different configs for development and production

## Testing the Contact Form

### Test Valid Submission:

1. Enter name: "John Doe"
2. Enter valid email: "john@example.com"
3. Enter message: "This is a test message from my portfolio contact form."
4. Click "SEND MESSAGE"
5. Should see success message
6. Check your Gmail for the received message

### Test Validation:

1. Try submitting with empty fields - should show error messages
2. Try invalid email format - should show email validation error
3. Try very short message - should show minimum length error

### Test Rate Limiting:

1. Submit 6 messages within an hour
2. The 6th should be rejected with "Too many requests" error

## Troubleshooting

### Error: "Invalid email format"

- Make sure you're using a valid email address with @ and domain

### Error: "Server configuration error"

- Check that environment variables are set correctly
- Verify `.env` file exists in project root
- Restart development server after adding environment variables

### Error: "Failed to send message"

- Verify Gmail app password is correct (16 characters, no spaces)
- Check that 2-Factor Authentication is enabled on Gmail
- Ensure SMTP_USER matches the Gmail account used to generate the app password

### Emails not arriving:

- Check Gmail spam folder
- Verify app password was generated correctly
- Try generating a new app password

## API Endpoint Details

**Endpoint**: `/api/contact`
**Method**: `POST`
**Content-Type**: `application/json`

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Success Response** (200):

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Responses**:

- 400: Invalid input
- 429: Rate limit exceeded
- 500: Server error

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] `.env` added to `.gitignore`
- [ ] Test form submission on production
- [ ] Verify emails are received
- [ ] Test rate limiting
- [ ] Verify error messages display correctly

## Support

If you encounter issues:

1. Check the browser console for errors
2. Check server logs in Vercel dashboard
3. Verify all environment variables are set
4. Test with a different email address

## Security Notes

- Never commit `.env` file to Git
- Never share your Gmail app password
- Rotate app password if compromised
- Monitor submission logs for suspicious activity
- Consider adding CAPTCHA for additional protection if spam becomes an issue
