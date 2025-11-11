# 🔗 React API Integration: Connect to Node.js Backend

## 📌 IMPORTANT: React Must Call Node.js API

Your React frontend must be updated to call the Node.js backend on **port 5000** (not PHP on port 80).

---

## 🔍 FIND & UPDATE: API URLs in React

### **Location: Search in React Code**

Find all files in `E:\advertising\indiaadvertising\src\` that call the API.

Look for these URLs:

```javascript
// OLD PHP URLS (WRONG):
"http://localhost:8080/indiaadvertising/api/getData.php";
"http://localhost:8080/indiaadvertising/api/updateData.php";
"http://localhost:8080/indiaadvertising/sendQuoteMail.php";
"localhost:8080/indiaadvertising/api/";
```

Replace with these URLs:

```javascript
// NEW NODE.JS URLS (CORRECT):
"http://localhost:5000/api/getData";
"http://localhost:5000/api/updateData";
"http://localhost:5000/api/sendQuote";
"http://localhost:5000/api/";
```

---

## 📝 EXAMPLE: React Component Updates

### **OLD CODE (Using PHP):**

```javascript
// src/components/Products.js
useEffect(() => {
  fetch("http://localhost:8080/indiaadvertising/api/getData.php")
    .then((r) => r.json())
    .then((data) => setProducts(data.categories))
    .catch((err) => console.error(err));
}, []);
```

### **NEW CODE (Using Node.js):**

```javascript
// src/components/Products.js
useEffect(() => {
  fetch("http://localhost:5000/api/getData")
    .then((r) => r.json())
    .then((data) => setProducts(data.categories))
    .catch((err) => console.error(err));
}, []);
```

---

## 📨 EXAMPLE: Send Quote Form

### **OLD CODE (Using PHP):**

```javascript
// src/components/QuoteForm.js
const handleSubmit = async (formData) => {
  const response = await fetch(
    "http://localhost:8080/indiaadvertising/sendQuoteMail.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );

  const result = await response.json();
  if (result.success) {
    alert("Quote sent successfully!");
  }
};
```

### **NEW CODE (Using Node.js):**

```javascript
// src/components/QuoteForm.js
const handleSubmit = async (formData) => {
  const response = await fetch("http://localhost:5000/api/sendQuote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  if (result.ok || result.success) {
    alert("Quote sent successfully!");
  }
};
```

---

## 🔧 BEST PRACTICE: Use Environment Variable

### **Create .env in React folder**

**File:** `E:\advertising\indiaadvertising\.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

### **Use in Your Code**

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

// Then use it:
fetch(`${API_URL}/api/getData`)
fetch(`${API_URL}/api/sendQuote`, { method: 'POST', ... })
```

**Benefits:**

- Easy to change (development vs production)
- No hardcoding URLs
- Single place to update

---

## 📋 ALL ENDPOINTS: Node.js Versions

### **GET Data (Public)**

```javascript
// Returns all products, gallery, clients, company info
fetch('http://localhost:5000/api/getData')
  .then(r => r.json())
  .then(data => console.log(data))

// Response structure:
{
  companyInfo: { name, description, location },
  categories: [
    {
      category: "Category Name",
      subProducts: [
        { name, price, description, specs, images }
      ]
    }
  ],
  gallery: [{ image, caption }],
  clients: ["Company1", "Company2"]
}
```

### **Send Quote (Public)**

```javascript
// Send enquiry/quote email
fetch("http://localhost:5000/api/sendQuote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    mobile: "+91 9876543210",
    email: "john@example.com",
    message: "I'm interested...",
    product: "LED Sign Board",
  }),
})
  .then((r) => r.json())
  .then((data) => console.log(data.ok));

// Response: { ok: true } or { error: message }
```

### **Update Data (Admin Protected)**

```javascript
// Add/update/delete products, categories, gallery, clients
// Requires password: admin123

fetch("http://localhost:5000/api/updateData", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    password: "admin123",
    action: "addProduct",
    catIndex: 0,
    product: JSON.stringify({
      name: "New Product",
      price: "₹500",
      description: "Description",
      specs: [],
    }),
  }),
})
  .then((r) => r.json())
  .then((data) => console.log(data.success));

// Response: { success: true, message: "Product added" }
```

---

## 🔐 Authentication

Admin operations require password in the request body:

```javascript
const adminBody = {
  password: "admin123", // ← Add this
  action: "addCategory",
  category: JSON.stringify({
    category: "New Category",
    subProducts: [],
  }),
};

fetch("http://localhost:5000/api/updateData", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(adminBody),
});
```

---

## 🧪 TEST IN REACT: Quick Function

Add this to test your API connection:

```javascript
// In any React component or App.js
const testAPI = async () => {
  try {
    // Test 1: Get data
    const dataResponse = await fetch("http://localhost:5000/api/getData");
    const data = await dataResponse.json();
    console.log("✅ getData works:", data.categories.length, "categories");

    // Test 2: Send quote
    const quoteResponse = await fetch("http://localhost:5000/api/sendQuote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test",
        mobile: "+91 9876543210",
        email: "test@gmail.com",
        message: "Test",
        product: "Test Product",
      }),
    });
    const quoteData = await quoteResponse.json();
    console.log("✅ sendQuote works:", quoteData);
  } catch (err) {
    console.error("❌ API Error:", err);
  }
};

// Call this function:
// testAPI()
```

---

## 🎯 CHECKLIST: API Integration

- [ ] Found all API URLs in React code
- [ ] Replaced with http://localhost:5000 URLs
- [ ] Created .env file with API_URL
- [ ] Updated fetch calls to use process.env.REACT_APP_API_URL
- [ ] Tested getData endpoint
- [ ] Tested sendQuote endpoint
- [ ] Tested admin endpoints (if needed)
- [ ] Products load on homepage
- [ ] Quote form sends emails
- [ ] No console errors

---

## 🚀 AFTER CHANGES: Test Again

```powershell
# Terminal 1: Start Node.js
cd "E:\advertising\india-advertising-node"
npm run dev

# Terminal 2: Start React
cd "E:\advertising\indiaadvertising"
npm start

# Browser: http://localhost:3000
# Check: Products load, no errors
```

---

## 📱 FOR PRODUCTION: Update to Your Domain

When deploying to production:

**.env.production:**

```env
REACT_APP_API_URL=https://yourdomain.com/api
```

Or update Node.js to production URL:

```env
CORS_ORIGIN=https://yourdomain.com
```

---

## ⚠️ COMMON MISTAKES

### **❌ Mistake 1: Hardcoding URL**

```javascript
// DON'T do this:
fetch("http://localhost:5000/api/getData");
```

### **✅ Correct Way:**

```javascript
// DO this:
fetch(`${process.env.REACT_APP_API_URL}/api/getData`);
```

### **❌ Mistake 2: Wrong Port**

```javascript
// DON'T use port 8080 or 80:
fetch("http://localhost:80/api/getData"); // Wrong!
fetch("http://localhost:8080/api/getData"); // Wrong!
```

### **✅ Use Port 5000:**

```javascript
fetch("http://localhost:5000/api/getData"); // Correct!
```

### **❌ Mistake 3: Forgetting .json()**

```javascript
// DON'T forget to parse response:
const data = await fetch("http://localhost:5000/api/getData");
// data is Response object, not JSON!
```

### **✅ Parse Response:**

```javascript
const data = await fetch("http://localhost:5000/api/getData").then((r) =>
  r.json()
);
// Now data is actual JSON!
```

---

## 🔍 DEBUGGING: Check Network Calls

### **In Browser DevTools (F12):**

1. Open DevTools: Press `F12`
2. Go to "Network" tab
3. Refresh page
4. Look for requests to `localhost:5000`
5. Check if:
   - Status is `200` (success)
   - Response has data
   - No errors in console

---

## 📞 NEED HELP?

| Issue                | Solution                                |
| -------------------- | --------------------------------------- |
| 404 error            | Check URL is correct (port 5000)        |
| CORS error           | Check Node.js CORS_ORIGIN in .env       |
| No data              | Check Node.js is running                |
| Email error          | Check Gmail credentials in Node.js .env |
| Products not loading | Check API response in Network tab       |

---

**Complete Integration Checklist Done!** ✅
