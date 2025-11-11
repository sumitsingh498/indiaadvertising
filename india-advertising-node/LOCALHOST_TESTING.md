# India Advertising - Node.js Backend (Localhost Testing Guide)

## 🎉 Server Status

**✅ SERVER IS RUNNING ON LOCALHOST:5000**

The Node.js backend is now fully operational and replacing the PHP backend.

---

## 📝 Project Overview

This is a Node.js/Express backend that provides REST APIs for the India Advertising website. It maintains 100% feature parity with the original PHP backend.

**Key Features:**

- 📊 Data Management (Categories, Products, Gallery, Clients)
- 🖼️ File Upload Support (Images - JPG, PNG, GIF, WebP, BMP)
- 🔐 Admin Password Protection
- 📧 Email Notifications (Quote/Enquiry emails via Gmail)
- 📁 JSON-based Data Storage (No database required)
- 🚀 CORS-enabled (works with React frontend on GitHub Pages)

---

## 🌐 Available Localhost URLs

### **Base API URL**

```
http://localhost:5000
```

### **Data Endpoints**

#### 1. **Get All Data** (Public)

```
GET http://localhost:5000/api/getData
```

**Returns:** Company info, categories with products, gallery, and clients

```powershell
Invoke-RestMethod 'http://localhost:5000/api/getData' | ConvertTo-Json
```

#### 2. **Update Data** (Admin Protected)

```
POST http://localhost:5000/api/updateData
```

**Required:** Password in body, action type, and relevant data

```powershell
$body = @{
    password = 'admin123'
    action = 'addCategory'
    category = '{"category":"New Category","subProducts":[]}'
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:5000/api/updateData' `
    -Method Post `
    -Body $body `
    -ContentType 'application/json'
```

#### 3. **Upload Files**

```
POST http://localhost:5000/api/upload
```

**Form Data:** field name `images[]`

---

## 📋 Admin Actions (POST /api/updateData)

All admin operations require password authentication (`admin123` by default).

### **Category Operations**

**Add Category:**

```json
{
  "password": "admin123",
  "action": "addCategory",
  "category": "{\"category\":\"Electronics\",\"subProducts\":[]}"
}
```

**Update Category:**

```json
{
  "password": "admin123",
  "action": "updateCategory",
  "catIndex": 0,
  "category": "{\"category\":\"Updated Name\"}"
}
```

**Delete Category:**

```json
{
  "password": "admin123",
  "action": "deleteCategory",
  "catIndex": 0
}
```

### **Product Operations**

**Add Product:**

```json
{
  "password": "admin123",
  "action": "addProduct",
  "catIndex": 0,
  "product": "{\"name\":\"Product Name\",\"price\":\"₹500\",\"description\":\"Product Desc\",\"specs\":[]}"
}
```

**Update Product:**

```json
{
  "password": "admin123",
  "action": "updateProduct",
  "catIndex": 0,
  "prodIndex": 0,
  "updates": "{\"price\":\"₹600\"}"
}
```

**Delete Product:**

```json
{
  "password": "admin123",
  "action": "deleteProduct",
  "catIndex": 0,
  "prodIndex": 0
}
```

### **Gallery Operations**

**Add Gallery Image:** (Form Data)

```
password: admin123
action: addGalleryImage
galleryImage: [file]
caption: Image caption
```

**Delete Gallery Image:**

```json
{
  "password": "admin123",
  "action": "deleteGalleryImage",
  "index": 0
}
```

### **Client Operations**

**Add Client:**

```json
{
  "password": "admin123",
  "action": "addClient",
  "client": "Company Name"
}
```

**Delete Client:**

```json
{
  "password": "admin123",
  "action": "deleteClient",
  "index": 0
}
```

---

## 📧 Email/Quote Endpoint

### **Send Enquiry Email**

```
POST http://localhost:5000/api/sendQuote
```

**Body:**

```json
{
  "name": "John Doe",
  "mobile": "+91 98765 43210",
  "email": "john@example.com",
  "message": "I'm interested in your services",
  "product": "Sign Board"
}
```

**Response:**

```json
{
  "ok": true
}
```

---

## 🔧 Configuration

### **Environment Variables (.env)**

```properties
PORT=5000
GMAIL_USER=indiaadvertising05@gmail.com
GMAIL_PASS=stllwvdrvljilqhq
ADMIN_PASSWORD=admin123
CORS_ORIGIN=*
```

**Important Notes:**

- Change `ADMIN_PASSWORD` in production
- Use Gmail **App Passwords** (16 characters), not regular passwords
- `CORS_ORIGIN=*` allows requests from anywhere (change for production)

---

## 📂 Project Structure

```
india-advertising-node/
├── index.js                 # Main Express server
├── package.json             # Dependencies
├── .env                      # Configuration
├── data/
│   └── companyData.json     # JSON database
├── uploads/                 # Uploaded images
├── utils/
│   └── sendMail.js          # Email functionality
├── middleware/
│   └── auth.js              # Admin auth middleware
└── routes/
    ├── admin.js             # Admin routes
    ├── data.js              # Data routes
    └── quote.js             # Quote routes
```

---

## 🚀 Starting the Server

### **Method 1: Using npm**

```powershell
cd e:\advertising\india-advertising-node
npm run dev      # Development with nodemon
npm start        # Production
```

### **Method 2: Direct Node**

```powershell
node "e:\advertising\india-advertising-node\index.js"
```

### **Method 3: Background Process (PowerShell)**

```powershell
Start-Process -FilePath node -ArgumentList '"e:\advertising\india-advertising-node\index.js"' -WindowStyle Hidden
```

---

## 🧪 Test Examples

### **Test 1: Get All Data**

```powershell
$response = Invoke-RestMethod 'http://localhost:5000/api/getData'
Write-Host "Categories: $($response.categories.Count)"
Write-Host "Products: $($response.categories[0].subProducts.Count)"
Write-Host "Clients: $($response.clients.Count)"
```

### **Test 2: Add a New Category**

```powershell
$body = @{
    password = 'admin123'
    action = 'addCategory'
    category = (@{
        category = "New Services"
        subProducts = @()
    } | ConvertTo-Json)
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:5000/api/updateData' `
    -Method Post `
    -Body $body `
    -ContentType 'application/json'
```

### **Test 3: Send Enquiry Email**

```powershell
$body = @{
    name = "Test User"
    mobile = "+91 9876543210"
    email = "test@example.com"
    message = "Can you provide pricing details?"
    product = "Sign Board"
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:5000/api/sendQuote' `
    -Method Post `
    -Body $body `
    -ContentType 'application/json'
```

---

## 🔐 Security Checklist

- [ ] Change `ADMIN_PASSWORD` from default `admin123`
- [ ] Use Gmail **App Password** (not regular password)
- [ ] Set `CORS_ORIGIN` to specific domain in production
- [ ] Use HTTPS in production
- [ ] Keep `.env` file private (never commit to Git)
- [ ] Implement rate limiting for public endpoints
- [ ] Add request validation

---

## 🐛 Troubleshooting

### **Port Already in Use**

```powershell
# Kill Node.js processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Or find which process is using port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

### **CORS Errors**

- Check `CORS_ORIGIN` in `.env`
- Default is `*` (allow all) - change for production

### **Email Not Sending**

- Verify Gmail credentials in `.env`
- Use **App Password** (16 char), not regular password
- Check if 2FA is enabled on Gmail
- Check `GMAIL_USER` email format

### **File Upload Issues**

- Ensure `uploads/` directory exists
- Check file size (max 5MB)
- Verify allowed extensions: jpg, jpeg, png, gif, webp, bmp

---

## 📊 Data Format

### **Company Data JSON Structure**

```json
{
  "companyInfo": {
    "name": "Company Name",
    "description": "Company description",
    "location": "City, Country"
  },
  "categories": [
    {
      "category": "Category Name",
      "subProducts": [
        {
          "name": "Product Name",
          "price": "Price",
          "description": "Description",
          "specs": [
            {
              "key": "Specification key",
              "value": "Specification value"
            }
          ],
          "images": ["uploads/image.jpg"]
        }
      ]
    }
  ],
  "gallery": [
    {
      "image": "uploads/gallery.jpg",
      "caption": "Image caption"
    }
  ],
  "clients": ["Client 1", "Client 2"]
}
```

---

## 📱 Frontend Integration

### **React/GitHub Pages Integration**

Update your React frontend to call these API endpoints:

```javascript
// Get data
fetch("http://localhost:5000/api/getData")
  .then((r) => r.json())
  .then((data) => console.log(data));

// Send quote
fetch("http://localhost:5000/api/sendQuote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Name",
    mobile: "+91...",
    email: "email@...",
    message: "Message",
    product: "Product",
  }),
});
```

---

## 🔄 Comparison: PHP vs Node.js

| Feature     | PHP       | Node.js                            |
| ----------- | --------- | ---------------------------------- |
| Framework   | Custom    | Express.js                         |
| Language    | PHP 7.x   | JavaScript (ES6)                   |
| Database    | JSON File | JSON File                          |
| Email       | PHPMailer | Nodemailer                         |
| Performance | Moderate  | Fast                               |
| Scaling     | Limited   | Good                               |
| Deployment  | Any host  | Node hosts (Render, Railway, etc.) |

---

## ✅ Current Status

- ✅ API Server Running
- ✅ All CRUD Operations Working
- ✅ File Uploads Functional
- ✅ Email Notifications Ready
- ✅ Admin Panel Authentication
- ✅ CORS Configuration
- ✅ Data Persistence

---

## 📞 Support

For issues or questions:

1. Check `.env` configuration
2. Review server logs in terminal
3. Verify network connectivity
4. Test endpoints with Postman or PowerShell

---

**Last Updated:** November 11, 2025  
**Server Version:** 1.0.0  
**Node.js Version:** v22.16.0
