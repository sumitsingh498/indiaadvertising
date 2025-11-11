# 🚀 Quick Start - Email Functionality (FIXED)

## The Problem Was Fixed ✅

The email functionality was not working because:

1. Environment variable names didn't match between code and `.env`
2. Email address was hardcoded
3. No input validation
4. Missing error handling

**All issues are now resolved!**

---

## Quick Setup (5 Minutes)

### Step 1: Verify Environment Variables

Check that your `.env` file has:

```properties
GMAIL_USER=indiaadvertising05@gmail.com
GMAIL_PASS=stllwvdrvljilqhq
```

**Note:** `GMAIL_PASS` must be a 16-character Google App Password, NOT your real Gmail password.

### Step 2: Start the Server

```bash
cd e:\advertising\india-advertising-node
npm start
```

You should see:

```
API ready at http://localhost:5000
Admin Dashboard: http://localhost:5000/admin
```

### Step 3: Test Email

```bash
node TEST_EMAIL.js
```

Expected output:

```
Testing email functionality...
Gmail User: indiaadvertising05@gmail.com
Gmail Pass exists: true
✅ Email sent successfully!
```

✅ **All Done!** Email is working.

---

## Using the Email API

### From Frontend (JavaScript)

```javascript
async function sendQuote() {
  const response = await fetch("http://localhost:5000/api/sendQuote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "John Doe",
      email: "john@example.com",
      mobile: "+91-9876543210",
      message: "I want a quote",
      product: "Sign Board", // optional
    }),
  });

  const data = await response.json();
  console.log(data);
}
```

### From React

See `FRONTEND_EMAIL_INTEGRATION.md` for full React examples.

### From cURL

```bash
curl -X POST http://localhost:5000/api/sendQuote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","mobile":"1234567890","message":"test"}'
```

---

## Required Fields

| Field   | Type              | Example             |
| ------- | ----------------- | ------------------- |
| name    | string            | "John Doe"          |
| email   | string            | "john@example.com"  |
| mobile  | string            | "+91-9876543210"    |
| message | string            | "I'm interested..." |
| product | string (optional) | "Sign Board"        |

---

## Response Examples

### ✅ Success

```json
{
  "success": true,
  "message": "Quote sent successfully!"
}
```

### ❌ Missing Fields

```json
{
  "error": "Missing required fields: name, email, mobile, and message are required"
}
```

### ❌ Invalid Email

```json
{
  "error": "Invalid email format"
}
```

### ❌ Server Error

```json
{
  "error": "Failed to send email. Please check server logs for details."
}
```

---

## What Happens When Email is Sent?

1. ✅ Customer's quote request is received
2. ✅ All fields are validated
3. ✅ Email is formatted in HTML
4. ✅ Sent to: `indiaadvertising05@gmail.com`
5. ✅ Reply-to: Customer's email address
6. ✅ Subject: "New Enquiry: [Product Name]"
7. ✅ Response is sent back to frontend

---

## Troubleshooting

### Email Not Sending?

**Step 1:** Verify credentials

```bash
cat .env | grep GMAIL
```

**Step 2:** Test with script

```bash
node TEST_EMAIL.js
```

**Step 3:** Check server logs

- Look at the terminal running `npm start`
- Look for error messages

**Step 4:** Verify Gmail Setup

- Go to: https://myaccount.google.com
- Check 2FA is enabled
- Check App Password was created
- Check app password is 16 characters

**Step 5:** Check firewall

- Ensure port 587 is not blocked

---

## Documentation Files

| File                            | Purpose                          |
| ------------------------------- | -------------------------------- |
| `EMAIL_SETUP_GUIDE.md`          | Complete setup & troubleshooting |
| `FRONTEND_EMAIL_INTEGRATION.md` | Code examples for frontend       |
| `TEST_EMAIL.js`                 | Testing script                   |
| `MAIL_FIX_SUMMARY.md`           | What was changed                 |
| `VERIFICATION_COMPLETE.md`      | Full verification report         |

---

## API Endpoint Details

```
POST /api/sendQuote
Host: localhost:5000
Content-Type: application/json

Request Body: {
  "name": string (required),
  "email": string (required),
  "mobile": string (required),
  "message": string (required),
  "product": string (optional)
}

Response: {
  "success": boolean,
  "message": string,
  "error": string (if failed)
}
```

---

## Environment Variables

```properties
# Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-char-app-password

# Server Configuration
PORT=5000
NODE_ENV=development

# Admin
ADMIN_PASSWORD=admin123

# CORS
CORS_ORIGIN=*
```

---

## Common Issues & Fixes

| Issue                     | Fix                                     |
| ------------------------- | --------------------------------------- |
| "Failed to send email"    | Check GMAIL_USER and GMAIL_PASS in .env |
| "Invalid email format"    | Ensure email has @ and domain           |
| "Missing required fields" | All 4 fields must be present            |
| Port 5000 already in use  | Kill process: `taskkill /PID [PID] /F`  |
| CORS error                | Check CORS_ORIGIN in .env               |

---

## Next: Frontend Integration

Your React app in `e:\advertising\indiaadvertising` can now send quotes:

```javascript
// In your Contact.js or QuoteForm.js
await fetch("http://localhost:5000/api/sendQuote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

See `FRONTEND_EMAIL_INTEGRATION.md` for complete examples.

---

## Getting Help

1. Check the troubleshooting section above
2. Read `EMAIL_SETUP_GUIDE.md`
3. Run `TEST_EMAIL.js` for diagnostics
4. Check server console for error messages

---

✅ **Status: READY TO USE**

Your email functionality is now fully operational!

---

Last Updated: November 11, 2025
Quick Start Version
