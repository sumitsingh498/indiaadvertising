# Email Configuration Guide

## Overview

The India Advertising Node API includes email functionality for sending quote requests to the admin and customers.

## Email Setup Instructions

### 1. Gmail SMTP Configuration

The system uses Gmail's SMTP server to send emails. You need an **App Password**, not your real Gmail password.

### 2. Getting Your Gmail App Password

**Steps:**

1. Go to your Google Account: https://myaccount.google.com
2. Enable **2-Factor Authentication** (2FA) if not already enabled:
   - Click "Security" in the left sidebar
   - Find "2-Step Verification" and enable it
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your platform)
5. Google will generate a 16-character password
6. Copy this password to your `.env` file

### 3. Environment Variables

In your `.env` file, set:

```properties
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-character-app-password
```

**Example:**

```properties
GMAIL_USER=indiaadvertising05@gmail.com
GMAIL_PASS=stllwvdrvljilqhq
```

## Testing Email Functionality

### Method 1: Using the Test Script

```bash
node TEST_EMAIL.js
```

### Method 2: Using API Endpoint

Send a POST request to:

```
POST http://localhost:5000/api/sendQuote
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+91-9876543210",
  "message": "I'm interested in your products",
  "product": "Sign Board"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Quote sent successfully!"
}
```

**Error Response (if fields missing):**

```json
{
  "error": "Missing required fields: name, email, mobile, and message are required"
}
```

## Required Fields for Email

| Field   | Type   | Required | Example             |
| ------- | ------ | -------- | ------------------- |
| name    | string | Yes      | "John Doe"          |
| email   | string | Yes      | "john@example.com"  |
| mobile  | string | Yes      | "+91-9876543210"    |
| message | string | Yes      | "I'm interested..." |
| product | string | No       | "Sign Board"        |

## Troubleshooting

### "Failed to send email" Error

1. **Check credentials in `.env`:**

   ```bash
   echo $env:GMAIL_USER
   echo $env:GMAIL_PASS
   ```

2. **Verify Gmail App Password:**

   - Make sure you're using an **App Password** (16 chars), not your real password
   - Check that 2FA is enabled on your Google Account

3. **Check Gmail Security:**

   - Go to https://myaccount.google.com/lesssecureapps
   - Less secure apps should be disabled (2FA with App Passwords is more secure)

4. **Test SMTP Connection:**

   - Use the TEST_EMAIL.js script
   - Check console output for detailed error messages

5. **Server Logs:**
   - Check the terminal running the server for error messages
   - Look for "Quote mail error:" messages

### "Invalid email format" Error

- Ensure the email address is valid (e.g., user@domain.com)

### "Missing required fields" Error

- Make sure all required fields are sent: name, email, mobile, message

## Email Features

- ✅ Sends quote requests to admin email
- ✅ Includes product name in subject
- ✅ HTML formatted email with all details
- ✅ Reply-to set to customer email
- ✅ Input validation
- ✅ Error logging
- ✅ Environment variable support

## API Endpoint Details

**Endpoint:** `POST /api/sendQuote`

**Headers Required:**

```
Content-Type: application/json
```

**CORS:** Enabled (configured in index.js)

**Rate Limiting:** Not currently implemented (add if needed)

---

Last Updated: November 11, 2025
