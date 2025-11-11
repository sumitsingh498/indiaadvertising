# Frontend Email Integration Guide

## JavaScript/React Integration

### Basic Example

```javascript
async function sendQuote(formData) {
  try {
    const response = await fetch("http://localhost:5000/api/sendQuote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
        product: formData.product, // optional
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Quote sent:", data.message);
      return { success: true, message: data.message };
    } else {
      console.error("❌ Error:", data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    return { success: false, error: "Network error" };
  }
}
```

### React Hook Example

```jsx
import { useState } from "react";

function QuoteForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:5000/api/sendQuote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ " + result.message);
        e.target.reset();
      } else {
        setError("❌ " + result.error);
      }
    } catch (err) {
      setError("❌ Failed to send: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <input type="tel" name="mobile" placeholder="Mobile Number" required />
      <textarea name="message" placeholder="Your Message" required />
      <input type="text" name="product" placeholder="Product (Optional)" />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Quote"}
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default QuoteForm;
```

### Using fetch with CORS

```javascript
// Make sure CORS_ORIGIN is set in .env
// Default: CORS_ORIGIN=*

const sendQuote = async (formData) => {
  const response = await fetch("http://localhost:5000/api/sendQuote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // if needed
    body: JSON.stringify(formData),
  });

  return response.json();
};
```

## Form Validation (Frontend)

Before sending to backend, validate:

```javascript
function validateQuoteForm(data) {
  const errors = {};

  // Check required fields
  if (!data.name || !data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.mobile || !data.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  }

  if (!data.message || !data.message.trim()) {
    errors.message = "Message is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

## API Response Examples

### Success Response

```json
{
  "success": true,
  "message": "Quote sent successfully!"
}
```

### Validation Error

```json
{
  "error": "Missing required fields: name, email, mobile, and message are required"
}
```

### Invalid Email

```json
{
  "error": "Invalid email format"
}
```

### Server Error

```json
{
  "error": "Failed to send email. Please check server logs for details."
}
```

## CORS Configuration

The server is configured with CORS enabled. The default origin is `*` (all origins allowed).

To restrict CORS in production, update `.env`:

```properties
CORS_ORIGIN=https://yourdomain.com
```

Multiple origins:

```javascript
// In index.js if needed
const corsOptions = {
  origin: ["https://yourdomain.com", "https://www.yourdomain.com"],
};
app.use(cors(corsOptions));
```

## Testing the Endpoint

### Using cURL

```bash
curl -X POST http://localhost:5000/api/sendQuote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "+91-9876543210",
    "message": "I am interested in your products",
    "product": "Sign Board"
  }'
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:5000/api/sendQuote`
3. Body (JSON):

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "mobile": "+91-1234567890",
  "message": "Test message",
  "product": "Test Product"
}
```

## Troubleshooting

| Problem           | Solution                                  |
| ----------------- | ----------------------------------------- |
| CORS Error        | Check `CORS_ORIGIN` in `.env`             |
| 400 Error         | Check all required fields are present     |
| 401 Error         | Not applicable to quote endpoint          |
| 500 Error         | Check server logs for email config issues |
| No email received | Verify Gmail credentials and spam folder  |

## Environment Variables for Production

```properties
PORT=5000
NODE_ENV=production
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
ADMIN_PASSWORD=change-this-strong-password
CORS_ORIGIN=https://yourdomain.com
```

---

Integration Ready: ✅
Last Updated: November 11, 2025
