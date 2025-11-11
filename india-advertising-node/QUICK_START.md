# 🚀 India Advertising Node.js Backend - QUICK START

## ✅ SERVER STATUS: LIVE ON LOCALHOST:5000

Your Node.js backend is fully operational and ready for testing!

---

## 🎯 Quick Start (3 Steps)

### **Step 1: Start the Server**

**Option A - Double-click batch file:**

```
START_SERVER.bat
```

**Option B - PowerShell:**

```powershell
.\START_SERVER.ps1
```

**Option C - Manual npm:**

```powershell
npm run dev
```

### **Step 2: Verify It's Running**

Open any terminal and run:

```powershell
Invoke-RestMethod 'http://localhost:5000/api/getData'
```

You should see company data returned!

### **Step 3: Start Testing**

Use the endpoints listed below...

---

## 🌐 API ENDPOINTS (Live)

All URLs are live on **http://localhost:5000**

### **🔓 Public Endpoints (No Auth Required)**

#### Get All Data

```
GET http://localhost:5000/api/getData
GET http://localhost:5000/api/getData.php (PHP compatibility)
```

**PowerShell Example:**

```powershell
$data = Invoke-RestMethod 'http://localhost:5000/api/getData'
$data | ConvertTo-Json -Depth 2
```

#### Send Enquiry/Quote

```
POST http://localhost:5000/api/sendQuote
```

**Body (JSON):**

```json
{
  "name": "Your Name",
  "mobile": "+91 98765 43210",
  "email": "your@email.com",
  "message": "Your message",
  "product": "Sign Board"
}
```

**PowerShell Example:**

```powershell
$body = @{
    name = "John Doe"
    mobile = "+91 9876543210"
    email = "john@example.com"
    message = "I need a quote"
    product = "LED Sign Board"
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:5000/api/sendQuote' `
    -Method Post `
    -Body $body `
    -ContentType 'application/json'
```

---

### **🔐 Admin Endpoints (Password Protected)**

All admin actions use:

```
POST http://localhost:5000/api/updateData
```

**Default Password:** `admin123` (change in `.env`)

#### Add Category

```powershell
$body = @{
    password = 'admin123'
    action = 'addCategory'
    category = '{"category":"New Category","subProducts":[]}'
} | ConvertTo-Json

Invoke-RestMethod 'http://localhost:5000/api/updateData' -Method Post -Body $body -ContentType 'application/json'
```

#### Add Product

```powershell
$body = @{
    password = 'admin123'
    action = 'addProduct'
    catIndex = 0
    product = '{"name":"Product","price":"₹500","description":"Desc","specs":[]}'
} | ConvertTo-Json

Invoke-RestMethod 'http://localhost:5000/api/updateData' -Method Post -Body $body -ContentType 'application/json'
```

#### Delete Product

```powershell
$body = @{
    password = 'admin123'
    action = 'deleteProduct'
    catIndex = 0
    prodIndex = 0
} | ConvertTo-Json

Invoke-RestMethod 'http://localhost:5000/api/updateData' -Method Post -Body $body -ContentType 'application/json'
```

#### Upload Images

```powershell
$file = Get-Item "path/to/image.jpg"
$form = @{
    password = 'admin123'
    images = $file
}

Invoke-RestMethod 'http://localhost:5000/api/upload' -Method Post -Form $form
```

---

## 📋 Admin Actions Supported

| Action               | Endpoint             | Auth       |
| -------------------- | -------------------- | ---------- |
| Add Category         | POST /api/updateData | ✓ Required |
| Update Category      | POST /api/updateData | ✓ Required |
| Delete Category      | POST /api/updateData | ✓ Required |
| Add Product          | POST /api/updateData | ✓ Required |
| Update Product       | POST /api/updateData | ✓ Required |
| Delete Product       | POST /api/updateData | ✓ Required |
| Add Gallery Image    | POST /api/updateData | ✓ Required |
| Delete Gallery Image | POST /api/updateData | ✓ Required |
| Add Client           | POST /api/updateData | ✓ Required |
| Delete Client        | POST /api/updateData | ✓ Required |
| Get All Data         | GET /api/getData     | ✗ Public   |
| Send Quote           | POST /api/sendQuote  | ✗ Public   |

---

## 🧪 Test Commands (Copy & Paste)

### Test 1: Get Data

```powershell
Invoke-RestMethod 'http://localhost:5000/api/getData' | Select-Object companyInfo, categories, gallery, clients
```

### Test 2: Get Category Count

```powershell
$data = Invoke-RestMethod 'http://localhost:5000/api/getData'
"Total Categories: $($data.categories.Count)"
"Total Products: $(($data.categories | ForEach-Object { $_.subProducts.Count } | Measure-Object -Sum).Sum)"
"Total Clients: $($data.clients.Count)"
```

### Test 3: Send Test Email

```powershell
$body = @{
    name = "Test User"
    mobile = "+91 9876543210"
    email = "testuser@example.com"
    message = "This is a test enquiry"
    product = "LED Sign Board"
} | ConvertTo-Json

Invoke-RestMethod 'http://localhost:5000/api/sendQuote' -Method Post -Body $body -ContentType 'application/json'
```

### Test 4: Add Category

```powershell
$body = @{
    password = 'admin123'
    action = 'addCategory'
    category = (@{
        category = "Test Category"
        subProducts = @()
    } | ConvertTo-Json -Compress)
} | ConvertTo-Json

Invoke-RestMethod 'http://localhost:5000/api/updateData' -Method Post -Body $body -ContentType 'application/json'
```

---

## 📁 Project Structure

```
india-advertising-node/
├── 📄 index.js                    ← Main Express server
├── 📄 package.json               ← Dependencies
├── 📄 .env                        ← Configuration (keep secret!)
├── 📄 LOCALHOST_TESTING.md       ← Full testing guide
├── 📄 START_SERVER.bat           ← Windows launcher
├── 📄 START_SERVER.ps1           ← PowerShell launcher
├── 📂 data/
│   └── companyData.json          ← Your database
├── 📂 uploads/                   ← Uploaded images
├── 📂 utils/
│   └── sendMail.js               ← Email functionality
├── 📂 middleware/
│   └── auth.js                   ← Authentication
└── 📂 routes/
    ├── admin.js
    ├── data.js
    └── quote.js
```

---

## ⚙️ Configuration (.env)

```env
PORT=5000
GMAIL_USER=indiaadvertising05@gmail.com
GMAIL_PASS=stllwvdrvljilqhq
ADMIN_PASSWORD=admin123
CORS_ORIGIN=*
```

**⚠️ IMPORTANT:**

- Change `ADMIN_PASSWORD` in production
- Use Gmail **App Password** (16 chars), not your real password
- Enable 2FA on Gmail for App Passwords to work
- Set `CORS_ORIGIN` to your domain in production

---

## 🔄 Stopping the Server

**From the running terminal:**

```
Press Ctrl+C
```

**From another terminal:**

```powershell
# Find and kill Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## 🐛 Common Issues & Solutions

### **"Port 5000 already in use"**

```powershell
# Option 1: Kill existing process
Get-Process node | Stop-Process -Force

# Option 2: Use different port
# Edit .env and change: PORT=5001
```

### **"Cannot GET /api/getData"**

- Check if server is running: `netstat -ano | findstr :5000`
- Restart the server
- Check URL spelling

### **"Invalid password"**

- Default is `admin123`
- Check `.env` for `ADMIN_PASSWORD`
- Password is case-sensitive

### **"Email not sending"**

- Verify Gmail credentials in `.env`
- Use **App Password** (16 char), not regular password
- Enable 2FA on Gmail account
- Check internet connection

### **"CORS error in React"**

- Change `CORS_ORIGIN` in `.env`
- Default `*` allows all (fine for dev)
- For production, set to your GitHub Pages domain

---

## 🚀 Next Steps

### For Development

1. ✅ Server running locally
2. Run tests (see commands above)
3. Modify data via API
4. Test with your React frontend

### For Deployment

1. Choose a hosting platform:

   - **Render** (free tier available)
   - **Railway** (free tier available)
   - **Heroku** (paid)
   - **DigitalOcean** (paid)

2. Set environment variables on host
3. Deploy the code
4. Update React frontend API URLs

---

## 📖 Full Documentation

For complete documentation including:

- All endpoint specifications
- Authentication details
- Data structure
- Security checklist
- Integration guide

👉 **See:** `LOCALHOST_TESTING.md`

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com/
- **Nodemailer:** https://nodemailer.com/
- **Multer:** https://github.com/expressjs/multer
- **Node.js:** https://nodejs.org/docs/

---

## 📞 Quick Reference

| Need            | Command                                                 |
| --------------- | ------------------------------------------------------- |
| Start Server    | `./START_SERVER.ps1` or `npm run dev`                   |
| Stop Server     | `Ctrl+C`                                                |
| Test API        | `Invoke-RestMethod 'http://localhost:5000/api/getData'` |
| Check Running   | `netstat -ano \| findstr :5000`                         |
| Kill Process    | `Get-Process node \| Stop-Process -Force`               |
| View Logs       | Check terminal output while running                     |
| Change Password | Edit `.env` → `ADMIN_PASSWORD=newpass`                  |
| Change Port     | Edit `.env` → `PORT=5001`                               |

---

## ✨ Features Working

- ✅ Get all data (categories, products, gallery, clients)
- ✅ Add/Update/Delete categories
- ✅ Add/Update/Delete products
- ✅ Upload product images
- ✅ Add/Delete gallery items
- ✅ Add/Delete clients
- ✅ Send enquiry emails
- ✅ Admin authentication
- ✅ File storage
- ✅ CORS support
- ✅ JSON data persistence

---

**Server Ready for Testing! 🎉**

**Start with:** `./START_SERVER.ps1`

**Test with:** `Invoke-RestMethod 'http://localhost:5000/api/getData'`

Happy coding! 🚀
