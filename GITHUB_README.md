# India Advertising - Full Stack Project

A modern React + Node.js application for India Advertising with a complete admin dashboard for managing products, categories, gallery, and client information.

## 📁 Project Structure

```
india-advertising/
├── indiaadvertising/          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.js    # Complete admin interface
│   │   │   ├── Gallery.js            # Public gallery display
│   │   │   ├── Products.js           # Product listing
│   │   │   ├── Navbar.js             # Navigation
│   │   │   ├── Contact.js            # Contact form
│   │   │   └── Home.js               # Home page
│   │   └── App.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── india-advertising-node/    # Node.js Backend
    ├── routes/
    │   ├── admin.js           # Admin CRUD operations
    │   ├── data.js            # Public data retrieval
    │   └── quote.js           # Email quote requests
    ├── middleware/
    │   └── auth.js            # Admin authentication
    ├── utils/
    │   └── sendMail.js        # Email service (Gmail SMTP)
    ├── data/
    │   └── companyData.json   # All project data (JSON database)
    ├── uploads/               # User-uploaded images
    ├── index.js               # Express server
    ├── package.json
    ├── .env                   # Configuration (passwords, API keys)
    └── .env.example           # Configuration template
```

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm
- A Gmail account with [App Password](https://support.google.com/accounts/answer/185833) for email functionality
- Git for version control

### Step 1: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/india-advertising.git
cd india-advertising
```

### Step 2: Backend Setup

```bash
cd india-advertising-node
npm install
```

**Create `.env` file** (copy from `.env.example`):

```properties
# Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-char-app-password

# Server Configuration
PORT=5000
NODE_ENV=development

# Admin Authentication
ADMIN_PASSWORD=admin123
```

**Start the backend:**

```bash
npm start
# Backend runs on http://localhost:5000
```

### Step 3: Frontend Setup

```bash
cd ../indiaadvertising
npm install
npm start
# Frontend runs on http://localhost:3000
```

### Step 4: Access Admin Dashboard

1. Open http://localhost:3000/indiaadvertising/
2. Click "Admin" in navbar
3. Password: `admin123`

## 📚 API Documentation

### Data Routes

#### GET `/api/getData`

Retrieves all project data (products, categories, gallery, clients, company info).

**Response:**

```json
{
  "companyInfo": {...},
  "categories": [
    {
      "category": "name",
      "subProducts": [...],
      "images": ["uploads/..."]
    }
  ],
  "gallery": [
    {
      "id": "uuid",
      "image": "uploads/...",
      "title": "..."
    }
  ],
  "clients": [
    {
      "id": "uuid",
      "name": "Client Name",
      "image": "uploads/..."
    }
  ]
}
```

### Admin Routes

#### POST `/api/admin`

All admin operations require `Authorization: Bearer admin123` header.

Supports actions:

- **`addProduct`** - Add product to category
- **`updateProduct`** - Update product details
- **`deleteProduct`** - Remove product
- **`addCategory`** - Add new category
- **`updateCategory`** - Update category details
- **`deleteCategory`** - Remove category
- **`addGalleryImage`** - Upload gallery image
- **`deleteGalleryImage`** - Remove gallery image
- **`addClient`** - Add client
- **`deleteClient`** - Remove client

**Example - Add Product:**

```bash
curl -X POST http://localhost:5000/api/admin \
  -H "Authorization: Bearer admin123" \
  -F "action=addProduct" \
  -F "catIndex=0" \
  -F "product={\"name\":\"Product\",\"price\":\"100\",...}" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

### Quote Routes

#### POST `/api/quote`

Submit quote/contact request (sends email).

**Body:**

```json
{
  "name": "John Doe",
  "mobile": "+91-98765-43210",
  "email": "john@example.com",
  "product": "Product Name",
  "message": "I'm interested in..."
}
```

## 🎨 Admin Dashboard Features

### Products Tab

- ✅ Add/Edit/Delete products per category
- ✅ Multiple image upload and management
- ✅ Dynamic specs (key-value pairs)
- ✅ Price and description fields
- 📸 Image preview with delete buttons

### Categories Tab

- ✅ Add/Edit/Delete categories
- ✅ Category images management
- ✅ Add products directly from category card

### Gallery Tab

- ✅ Upload gallery images
- ✅ Add titles to gallery items
- ✅ Edit/Delete gallery items
- 📸 Image preview in list and edit form

### Clients Tab

- ✅ Add/Edit/Delete clients
- ✅ Optional client logos
- ✅ Client name only required

### Company Info Tab

- ✅ Edit company details
- ✅ Update contact information
- ✅ Manage social links

## 📧 Email Configuration

Email functionality uses **Gmail SMTP** with App Passwords:

1. **Enable 2-Factor Authentication** in Google Account
2. **Generate App Password** at https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Google generates a 16-character password
3. **Add to `.env`:**
   ```properties
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-16-char-password
   ```
4. **Test email** by submitting the contact form

> ⚠️ **Never commit `.env` with real passwords!** Add `.env` to `.gitignore`

## 🔐 Security

### Frontend

- Admin dashboard requires password to unlock editing
- CORS configured to allow only specific origins
- No sensitive data in localStorage

### Backend

- All admin operations require `Authorization` header
- Upload validation: only image files (jpg, png, gif, webp, bmp)
- File size limit: 5MB per image
- Uploaded files saved outside public directory

### Deployment

```bash
# .gitignore should contain:
.env
node_modules/
uploads/
```

## 📱 Mobile Responsive

- ✅ Mobile-friendly admin dashboard
- ✅ Responsive gallery grid
- ✅ Touch-friendly buttons and inputs

## 🛠 Development

### Available Scripts

**Frontend:**

```bash
npm start          # Run development server
npm build          # Build for production
npm test           # Run tests
```

**Backend:**

```bash
npm start          # Run server (requires .env)
npm run dev        # Run with auto-reload (nodemon)
```

### File Upload Workflow

1. **Admin selects images** → FormData with files
2. **Frontend sends to backend** → `/api/admin` with multipart
3. **Backend saves files** → `uploads/` directory
4. **Returns file paths** → e.g., `uploads/1234567_abc.jpg`
5. **Frontend stores paths** → in `companyData.json`
6. **Frontend displays** → via `/uploads/...` static route

## 🚢 Deployment

### Option 1: Render (Recommended)

```bash
# Create new Render.com account and project
# In Render dashboard:
- Select "New +" → "Web Service"
- Connect GitHub repository
- Set build command: npm install
- Set start command: npm start (from india-advertising-node)
- Add environment variables from .env
- Deploy!
```

### Option 2: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway up
```

### Option 3: Vercel + Backend Elsewhere

- Deploy React frontend to Vercel
- Deploy Node backend to Railway/Render
- Update frontend API URLs to deployed backend

## 📝 Data Structure (companyData.json)

```json
{
  "companyInfo": {
    "name": "India Advertising",
    "phone": "+91-...",
    "email": "...",
    "website": "...",
    "address": "..."
  },
  "categories": [
    {
      "category": "Category Name",
      "images": ["uploads/image1.jpg"],
      "subProducts": [
        {
          "id": "uuid",
          "name": "Product Name",
          "price": "₹5000",
          "description": "...",
          "images": ["uploads/img1.jpg", "uploads/img2.jpg"],
          "specs": [{ "key": "Size", "value": "10x10" }]
        }
      ]
    }
  ],
  "gallery": [
    {
      "id": "uuid",
      "image": "uploads/gallery1.jpg",
      "title": "Gallery Title"
    }
  ],
  "clients": [
    {
      "id": "uuid",
      "name": "Client Name",
      "image": "uploads/logo.jpg"
    }
  ]
}
```

## 🐛 Troubleshooting

### "Cannot find module" errors

```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

### "EADDRINUSE: Port 5000 already in use"

```bash
# Kill process on port 5000
# Windows: Use PowerShell as Admin
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change PORT in .env
PORT=5001
```

### Images not uploading

- Check file size (limit: 5MB)
- Verify file type (.jpg, .png, .gif, .webp, .bmp)
- Check `/uploads` directory has write permissions
- Verify `Authorization` header in browser dev tools

### Email not sending

- Verify `.env` has correct Gmail credentials
- Check Gmail account has App Password enabled
- Ensure backend console shows no SMTP errors
- Test with valid email addresses

### Frontend API errors

- Ensure backend is running: `npm start` in `india-advertising-node`
- Check browser console for CORS errors
- Verify `API_BASE` URL in AdminDashboard.js matches backend URL

## 📄 License

This project is proprietary to India Advertising. All rights reserved.

## 👨‍💼 Support

For issues or questions:

1. Check troubleshooting section above
2. Review server logs in terminal
3. Check browser console (F12 → Console tab)
4. Contact: support@indiaadvertising.in

---

**Last Updated:** 2024
**Backend:** Node.js + Express
**Frontend:** React 18+
**Database:** JSON (companyData.json)
**Email:** Gmail SMTP via Nodemailer
