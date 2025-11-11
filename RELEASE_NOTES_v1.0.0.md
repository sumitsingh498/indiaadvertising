# India Advertising Platform v1.0.0

## 🎉 Release Overview

**India Advertising Platform v1.0.0** - Production-ready full-stack web application combining a React frontend with Node.js/Express backend. Complete email integration, admin dashboard with CRUD operations, and responsive product showcase.

**Release Date:** November 11, 2025  
**Status:** Production Ready  
**Repository:** https://github.com/sumitsingh498/indiaadvertising

---

## ✨ Key Features

### Frontend (React)
- **Responsive Design** - Mobile-first approach using Tailwind CSS
- **Contact Form** - Email integration with real-time success/error feedback
- **Product Showcase** - Dynamic product cards with quote request modal
- **Category Management** - Filter products by category
- **Admin Dashboard** - Full CRUD operations for:
  - Products (add, edit, delete with category assignment)
  - Categories (create, modify product categories)
  - Clients (manage testimonials/references)
  - Gallery (image upload and showcase)
- **Email Notifications** - Real-time email delivery via SMTP

### Backend (Node.js/Express)
- **RESTful API** - Complete endpoints for data management
- **Email Service** - Nodemailer SMTP integration with Gmail
- **Data Persistence** - JSON-based data storage with file operations
- **File Upload** - Multer integration for image/file uploads
- **CORS Support** - Cross-origin resource sharing enabled
- **Environment Configuration** - Flexible setup via .env variables

### Database & Storage
- **JSON-based Storage** - `companyData.json` for products, categories, clients
- **File System** - Uploads directory for images and documents
- **No External DB Required** - Simplified deployment

---

## 📦 Build Information

### Frontend Build
```
React Build (v1.0.0)
- Main JS Bundle: 98.12 kB (gzipped)
- Main CSS Bundle: 10.07 kB (gzipped)
- Total Optimized Size: ~108 kB
- Build Tool: React Scripts (Create React App)
- Location: indiaadvertising/build/
```

### Backend
```
Node.js Backend (v1.0.0)
- Framework: Express.js
- Runtime: Node.js 14+
- Email: Nodemailer SMTP
- File Upload: Multer
- Location: india-advertising-node/
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 14.0.0 or higher
- **npm** 6.0.0 or higher
- **Gmail Account** with App Password (for email functionality)

### Option 1: Local Development Setup

#### Frontend Setup
```bash
cd indiaadvertising
npm install
npm start
```
Runs on: `http://localhost:3000`

#### Backend Setup
```bash
cd india-advertising-node
npm install
```

Create `.env` file:
```env
PORT=5000
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
NODE_ENV=development
```

Start server:
```bash
npm start
```
Runs on: `http://localhost:5000`

---

## 📚 API Documentation

### Contact/Quote Submission
**Endpoint:** `POST /api/sendQuote`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+91-9876543210",
  "message": "I need advertising services for my business",
  "product": "Digital Marketing" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request sent successfully"
}
```

### Get Data
**Endpoint:** `GET /api/getData`

**Response:** Returns all products, categories, clients, and gallery items

### Update Data
**Endpoint:** `POST /api/updateData`

**Request Body:**
```json
{
  "type": "products|categories|clients|gallery",
  "action": "add|edit|delete",
  "data": { /* respective data object */ }
}
```

---

## 🔧 Email Configuration

### Gmail Setup (Required)
1. Enable 2-Factor Authentication on Gmail
2. Create App Password:
   - Go to `myaccount.google.com/apppasswords`
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
3. Set in `.env`:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=16-character-app-password
   ```

### Test Email System
```bash
cd india-advertising-node
node TEST_EMAIL.js
```
Should show: `✅ Email sent successfully!`

---

## 📊 Admin Dashboard

### Access
1. Open frontend at `http://localhost:3000`
2. Scroll to bottom for Admin Dashboard
3. Use dashboard to manage all content

### Operations

**Products Tab:**
- View all products in grid layout
- Add new product (requires category selection)
- Edit existing product details
- Delete products

**Categories Tab:**
- Manage product categories
- Add new categories
- Edit category names
- Delete categories

**Clients Tab:**
- Add client testimonials/references
- Edit client information
- Delete client entries
- Simplified name-only interface

**Gallery Tab:**
- Upload images
- Manage gallery items
- Display on frontend

---

## 🌐 Deployment

### GitHub Pages (Frontend)
The frontend is automatically deployed to GitHub Pages when you push to the `main` branch.

**Live URL:** https://www.indiaadvertising.com

### Backend Deployment Options

#### Option A: Render.com (Recommended)
1. Push code to GitHub
2. Connect Render to GitHub repo
3. Create Web Service from `india-advertising-node`
4. Set environment variables in Render dashboard
5. Deploy

#### Option B: Railway.app
1. Connect GitHub account
2. Select `india-advertising-node` directory
3. Add environment variables
4. Deploy automatically on git push

#### Option C: Heroku
```bash
cd india-advertising-node
heroku create your-app-name
heroku config:set GMAIL_USER=your-email@gmail.com
heroku config:set GMAIL_PASS=your-app-password
git push heroku main
```

#### Option D: DigitalOcean/VPS
1. SSH into server
2. Install Node.js and npm
3. Clone repository
4. Create `.env` file
5. Install dependencies: `npm install`
6. Use PM2 for process management: `pm2 start index.js --name india-ads`

---

## ✅ Testing Checklist

Before going live, verify:

- [ ] Contact form sends emails successfully
- [ ] Quote requests from Products section work
- [ ] Admin dashboard can add/edit/delete products
- [ ] Admin dashboard can add/edit/delete categories
- [ ] Admin dashboard can add/edit/delete clients
- [ ] Images upload correctly to gallery
- [ ] Responsive design works on mobile devices
- [ ] All forms validate user input
- [ ] Error messages display correctly
- [ ] Success notifications appear after form submission

---

## 📁 Project Structure

```
advertising/
├── india-advertising-node/          # Backend (Express.js API)
│   ├── index.js                     # Main server file
│   ├── package.json
│   ├── .env                         # Environment variables
│   ├── routes/
│   │   ├── admin.js
│   │   ├── data.js
│   │   └── quote.js
│   ├── utils/
│   │   └── sendMail.js              # Email utility
│   ├── middleware/
│   │   └── auth.js
│   ├── data/
│   │   └── companyData.json         # JSON database
│   └── uploads/                     # File upload directory
│
├── indiaadvertising/                # Frontend (React)
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Contact.js
│   │   │   ├── Products.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminDashboard.css
│   │   │   └── ... (other components)
│   │   └── assets/
│   └── build/                       # Production build output
│
└── Documentation files (this file, setup guides, etc.)
```

---

## 🐛 Troubleshooting

### "Failed to send" error on contact form
- **Check:** Backend running on port 5000
- **Check:** `.env` file has correct GMAIL_USER and GMAIL_PASS
- **Check:** Gmail App Password is 16 characters (no spaces)
- **Fix:** Restart Node server: `npm start`

### "Cannot GET /api/sendQuote"
- **Check:** Backend API is running
- **Check:** Correct API URL in Contact.js: `http://localhost:5000/api/sendQuote`
- **Fix:** Restart backend server

### Admin Dashboard not showing
- **Check:** Frontend loaded successfully
- **Check:** Scroll to bottom of page
- **Fix:** Check browser console for errors (F12)

### Images not uploading
- **Check:** `uploads/` directory exists and is writable
- **Check:** File size not exceeding limit
- **Check:** Supported image formats (JPG, PNG, GIF)

### Email not being received
- **Check:** Gmail address in `GMAIL_USER` is correct
- **Check:** Gmail App Password (not regular password)
- **Check:** 2-Factor Authentication enabled
- **Check:** Check spam/promotions folder

---

## 📝 Version History

### v1.0.0 (November 11, 2025) - CURRENT
- ✅ Complete React frontend with responsive design
- ✅ Node.js/Express backend with REST API
- ✅ Email integration with Nodemailer/Gmail
- ✅ Admin dashboard with CRUD operations
- ✅ Product showcase with quote requests
- ✅ Category management system
- ✅ Client testimonials section
- ✅ Gallery with image uploads
- ✅ GitHub Pages deployment configured
- ✅ Custom domain (www.indiaadvertising.com)
- ✅ Production-ready optimized builds

---

## 🔐 Security Notes

- **Email Password:** Use Gmail App Password (not account password)
- **Environment Variables:** Never commit `.env` file to git
- **File Uploads:** Validate file types and sizes on server
- **CORS:** Configure for your domain in production
- **Error Messages:** Don't expose sensitive info in error responses

---

## 📞 Support & Contact

For issues or questions:
1. Check troubleshooting section above
2. Review browser console for errors (F12)
3. Check backend logs: `npm start` (watch console output)
4. Verify `.env` configuration
5. Test with TEST_EMAIL.js to isolate email issues

---

## 📄 License

This project is private and used for India Advertising Services.

---

**Thank you for using India Advertising Platform v1.0.0!** 🚀
