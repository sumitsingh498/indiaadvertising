# 🚀 India Advertising - Complete Setup Guide

Complete step-by-step instructions to set up and run the India Advertising project locally or deploy to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Admin Dashboard Usage](#admin-dashboard-usage)
4. [Email Configuration](#email-configuration)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js 14+** - Download from https://nodejs.org/
- **npm** - Comes with Node.js
- **Git** - For version control (optional but recommended)
- **A Gmail Account** - For email notifications

### System Requirements

- Windows, Mac, or Linux
- At least 500MB free disk space
- Internet connection

### Verify Installation

```bash
node --version    # Should be 14+ (e.g., v18.0.0)
npm --version     # Should be 6+ (e.g., 8.0.0)
git --version     # Should show git version (e.g., 2.30.0)
```

---

## Local Development Setup

### Step 1: Clone or Download the Project

**Option A: Using Git (Recommended)**

```bash
git clone https://github.com/yourusername/india-advertising.git
cd india-advertising
```

**Option B: Download ZIP**

1. Click "Code" → "Download ZIP"
2. Extract the ZIP file
3. Open terminal/command prompt in the extracted folder

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend folder
cd india-advertising-node

# Install npm packages
npm install

# You should see something like:
# added 150 packages
# npm notice
```

**Troubleshooting `npm install` errors:**

- Delete `node_modules` and `package-lock.json`: `rm -r node_modules package-lock.json`
- Try again: `npm install`

### Step 3: Configure Environment Variables

Create `.env` file in `india-advertising-node/` folder:

```bash
# Windows (Command Prompt)
type nul > .env

# macOS/Linux
touch .env
```

**Copy-paste this into `.env`:**

```properties
PORT=5000
NODE_ENV=development
ADMIN_PASSWORD=admin123

GMAIL_USER=indiaadvertising05@gmail.com
GMAIL_PASS=stllwvdrvljilqhq
```

> ⚠️ **IMPORTANT:** Never commit `.env` to Git! It contains passwords.

### Step 4: Start the Backend Server

```bash
# From india-advertising-node/ folder
npm start

# Expected output:
# API ready at http://localhost:5000
```

**Keep this terminal open!** The server will stay running.

### Step 5: Install Frontend Dependencies

**Open a NEW terminal window/tab** (keep the server running)

```bash
# Navigate to frontend folder
cd indiaadvertising

# Install npm packages
npm install
```

### Step 6: Start the Frontend

```bash
# From indiaadvertising/ folder
npm start

# This will automatically open http://localhost:3000 in your browser
# Wait for "Compiled successfully" message
```

### ✅ You're Ready!

Both servers are now running:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Public Site:** http://localhost:3000/indiaadvertising/
- **Admin Panel:** http://localhost:3000/indiaadvertising/admin

---

## Admin Dashboard Usage

### Accessing the Admin Panel

1. Go to http://localhost:3000/indiaadvertising/
2. Click **"Admin"** button in the navbar
3. Enter password: **`admin123`**
4. Click **Login**

### Dashboard Tabs

#### 🏢 **Company Info Tab**

- Edit company name, phone, email, address, website
- Changes save immediately
- Public website displays this information

#### 📦 **Products Tab**

- **Add Product:**
  - Select a category first
  - Fill: Name, Price, Description
  - Add specs (key-value pairs): Size, Weight, Material, etc.
  - Upload multiple images
  - Click "Add Product"
- **Edit Product:**
  - Click ✏️ pencil icon
  - Modify any field
  - Upload additional images
  - Delete individual images by clicking ✕
  - Click "Save"
- **Delete Product:**
  - Click 🗑️ trash icon
  - Confirms deletion

#### 📁 **Categories Tab**

- **Add Category:**
  - Enter category name (e.g., "Branding", "Printing")
  - Optional: Upload category image
  - Click "Add Category"
- **Edit Category:**
  - Click ✏️ pencil icon
  - Modify category name
  - Upload/delete category images
  - Click "Save"
- **Delete Category:**
  - Click 🗑️ trash icon
  - All products in this category will also be deleted

#### 🎨 **Gallery Tab**

- **Add Gallery Item:**
  - Enter title/description
  - Upload gallery image(s)
  - Click "Add"
- **Edit Gallery Item:**
  - Click ✏️ pencil icon
  - Update title
  - See current image preview
  - Upload new image (replaces old one)
  - Click "Save"
- **Delete Gallery Item:**
  - Click 🗑️ trash icon

#### 👥 **Clients Tab**

- **Add Client:**
  - Enter client name (required)
  - Optional: Upload client logo
  - Click "Add Client"
- **Edit Client:**
  - Click ✏️ pencil icon
  - Update name
  - Upload/delete logo
  - Click "Save"
- **Delete Client:**
  - Click 🗑️ trash icon

### Image Management Best Practices

✅ **Do:**

- Use images under 5MB
- Use common formats: JPG, PNG, GIF
- Optimize images before uploading (use tools like TinyPNG.com)
- Keep file names simple

❌ **Don't:**

- Upload images larger than 5MB
- Use BMP or TIFF format (not supported)
- Upload duplicate images repeatedly
- Delete images without keeping backups

---

## Email Configuration

### Option A: Use Existing Gmail Account (Easy)

The project already has credentials configured:

- **Email:** indiaadvertising05@gmail.com
- **Password:** (stored securely in `.env`)

To test:

1. Go to http://localhost:3000/indiaadvertising/
2. Click "Contact" or fill quote form
3. Submit → Should receive email in indiaadvertising05@gmail.com inbox

### Option B: Use Your Own Gmail Account (Recommended for Production)

#### Step 1: Enable 2-Factor Authentication

1. Go to https://myaccount.google.com/
2. Click "Security" in left menu
3. Scroll to "2-Step Verification"
4. Click "Get Started" and follow prompts
5. Confirm with phone number

#### Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" from dropdowns
3. Google generates a 16-character password
4. **Copy this password (you won't see it again!)**

#### Step 3: Update `.env`

```properties
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=xxxxxxxxxxxx (the 16-char password)
```

#### Step 4: Restart Backend

```bash
# Stop server (Ctrl+C)
# Then:
npm start
```

#### Step 5: Test Email

1. Fill out contact form on frontend
2. Check your email inbox
3. Should receive quote request

### Email Template

Customers who submit the contact form receive:

```
From: indiaadvertising05@gmail.com
Subject: New Enquiry: [Product Name]

Product: [Selected Product]
Name: [Customer Name]
Mobile: [Customer Phone]
Email: [Customer Email]
Message: [Customer Message]
```

Admin receives reply-to email so they can click "Reply" to contact customer.

---

## Deployment

### Option 1: Deploy to Render.com (Recommended, Free Tier)

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/india-advertising.git
git push -u origin main
```

#### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub account
3. Click "Authorize"

#### Step 3: Create Web Service

1. Click **New +** → **Web Service**
2. Select your GitHub repository
3. Fill in settings:
   - **Name:** `india-advertising-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `india-advertising-node`

#### Step 4: Add Environment Variables

1. Scroll down to "Environment Variables"
2. Add each variable from `.env`:
   ```
   PORT=5000
   NODE_ENV=production
   ADMIN_PASSWORD=admin123
   GMAIL_USER=...
   GMAIL_PASS=...
   ```
3. Click **Create Web Service**

#### Step 5: Update Frontend

In `indiaadvertising/src/components/AdminDashboard.js`:

```javascript
const API_BASE = "https://india-advertising-api.onrender.com/api";
```

Push changes to GitHub → Render auto-deploys!

#### Step 6: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Connect GitHub repository
3. Set build command: `npm run build` (in `indiaadvertising` folder)
4. Deploy → Get URL like `https://india-advertising.vercel.app`

### Option 2: Deploy to Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Init and deploy
cd india-advertising-node
railway up

# Set environment variables in Railway dashboard
```

### Option 3: Deploy to Traditional Hosting (VPS/Shared Hosting)

Contact your hosting provider about Node.js support. Most modern hosts support it.

---

## Troubleshooting

### ❌ "Cannot find module 'express'"

```bash
# Solution: Install dependencies
npm install
```

### ❌ "Port 5000 is already in use"

```bash
# Windows (PowerShell as Admin)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or use different port
PORT=5001 npm start
```

### ❌ "Email not sending"

- ✅ Check `.env` has correct Gmail credentials
- ✅ Check Gmail account has 2FA enabled
- ✅ Check App Password was copied correctly (no spaces)
- ✅ Restart backend after changing `.env`
- ✅ Check email inbox and spam folder

### ❌ "Images not uploading"

- ✅ Check file size < 5MB
- ✅ Check file type is .jpg, .png, .gif, or .webp
- ✅ Check `/uploads` folder exists
- ✅ Check terminal for error messages

### ❌ "Admin dashboard shows blank"

- ✅ Check backend is running (http://localhost:5000/api/getData)
- ✅ Check browser console for error (F12)
- ✅ Check network tab to see if API call succeeded
- ✅ Refresh page (Ctrl+R)

### ❌ "Cannot login to admin panel"

- ✅ Verify password is exactly: `admin123`
- ✅ Check `.env` file ADMIN_PASSWORD variable
- ✅ Restart backend after changing password
- ✅ Check browser console for error (F12)

### ❌ "Git errors when pushing"

```bash
# If repo already exists
git remote set-url origin https://github.com/yourusername/india-advertising.git

# If adding new remote
git remote add origin https://github.com/yourusername/india-advertising.git

# Then push
git push -u origin main
```

### ❌ "npm start fails"

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules package-lock.json

# Reinstall
npm install
npm start
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `ADMIN_PASSWORD` in `.env` to a strong password
- [ ] Use your own Gmail account (not shared)
- [ ] Never commit `.env` file to Git
- [ ] Use HTTPS URLs in production
- [ ] Keep dependencies updated: `npm update`
- [ ] Regularly backup `data/companyData.json`
- [ ] Monitor server logs for errors
- [ ] Test all admin functions before going live

---

## 📞 Support & Resources

- **Node.js Docs:** https://nodejs.org/docs/
- **Express.js Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

## 💡 Quick Reference Commands

```bash
# Start both servers (from project root)
# Terminal 1:
cd india-advertising-node
npm start

# Terminal 2:
cd indiaadvertising
npm start

# Stop servers
Ctrl+C

# Build for production
cd indiaadvertising
npm run build

# Clear npm cache
npm cache clean --force

# Update all dependencies
npm update
```

---

**Last Updated:** 2024
**Questions?** Create an issue on GitHub or contact support@indiaadvertising.in
