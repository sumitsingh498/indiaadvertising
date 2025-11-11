# Production Deployment Guide - India Advertising v1.0.0

## 🎯 Overview

This guide walks through deploying the India Advertising Platform to production, making it accessible on the internet 24/7.

---

## 📋 Current Status

### Frontend - Already Live ✅
- **Platform:** GitHub Pages
- **URL:** https://www.indiaadvertising.com
- **Status:** Production (auto-deployed from main branch)
- **Build:** React production build in `/build` folder

### Backend - Currently Local ⚙️
- **Status:** Running locally on port 5000
- **Issue:** Only accessible from your computer
- **Action Required:** Deploy to cloud hosting

---

## 🚀 Option 1: Deploy Backend to Render.com (Easiest)

### Step 1: Prepare Repository
Ensure your GitHub repo has both frontend and backend:
```
https://github.com/sumitsingh498/indiaadvertising
├── india-advertising-node/
├── indiaadvertising/
└── ... other files
```

### Step 2: Sign Up for Render
1. Go to https://render.com
2. Click "Sign up" and connect your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service
1. In Render dashboard, click "New +" → "Web Service"
2. Select your `sumitsingh498/indiaadvertising` repository
3. Configure:
   - **Name:** `india-advertising-api`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `india-advertising-node`
   - **Plan:** Free or Paid

### Step 4: Set Environment Variables
1. Go to Service Settings → Environment
2. Add variables:
   ```
   PORT=5000
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-16-char-app-password
   NODE_ENV=production
   ```

### Step 5: Deploy
1. Click "Create Web Service"
2. Render automatically deploys when you push to GitHub
3. Wait for build to complete (2-3 minutes)
4. Get your API URL from Render dashboard (e.g., `https://india-advertising-api.onrender.com`)

### Step 6: Update Frontend API URL
Edit `indiaadvertising/src/components/Contact.js`:
```javascript
const API_URL = "https://india-advertising-api.onrender.com/api/sendQuote";
```

Edit `indiaadvertising/src/components/Products.js`:
```javascript
const QUOTE_URL = "https://india-advertising-api.onrender.com/api/sendQuote";
```

### Step 7: Redeploy Frontend
```bash
cd indiaadvertising
npm run build
git add .
git commit -m "Update API URL for production"
git push
```

GitHub Pages automatically redeploys (2-3 minutes).

---

## 🚀 Option 2: Deploy Backend to Railway.app

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `sumitsingh498/indiaadvertising`

### Step 3: Configure Service
1. Click "Add Service"
2. Select "GitHub"
3. Select repository and set **Root Directory:** `india-advertising-node`

### Step 4: Set Environment Variables
In Railway dashboard:
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
NODE_ENV=production
```

### Step 5: Deploy
1. Railway automatically deploys from main branch
2. Get API URL from Railway domain settings
3. Update frontend API URLs (same as Option 1, Step 6-7)

---

## 🚀 Option 3: Deploy to Heroku (Classic Method)

### Step 1: Install Heroku CLI
```bash
# Windows
choco install heroku-cli

# Then verify
heroku --version
```

### Step 2: Login to Heroku
```bash
heroku login
```
Opens browser for authentication.

### Step 3: Create Heroku App
```bash
cd india-advertising-node
heroku create your-unique-app-name
```

Example: `heroku create india-advertising-api`

### Step 4: Set Environment Variables
```bash
heroku config:set GMAIL_USER=your-email@gmail.com
heroku config:set GMAIL_PASS=your-app-password
heroku config:set NODE_ENV=production
```

### Step 5: Create Procfile
In `india-advertising-node/`, create file `Procfile`:
```
web: npm start
```

### Step 6: Deploy
```bash
cd india-advertising-node
git add Procfile
git commit -m "Add Procfile for Heroku"
git subtree push --prefix india-advertising-node heroku main
```

Your app is live at: `https://your-unique-app-name.herokuapp.com`

### Step 7: Update Frontend URLs
Update API URLs to your Heroku domain (same as Option 1, Step 6-7).

---

## 🖥️ Option 4: Deploy to DigitalOcean/VPS

### Step 1: Create DigitalOcean Droplet
1. Go to https://www.digitalocean.com
2. Create new Droplet:
   - **OS:** Ubuntu 22.04
   - **Size:** Basic ($5/month)
   - **Region:** Singapore (closest to India)
3. Add SSH key for secure access

### Step 2: SSH into Server
```bash
ssh root@your-droplet-ip
```

### Step 3: Install Node.js
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx
```

### Step 4: Clone Repository
```bash
cd /var/www
git clone https://github.com/sumitsingh498/indiaadvertising.git
cd indiaadvertising/india-advertising-node
```

### Step 5: Set Up Environment
```bash
nano .env
```
Add:
```
PORT=5000
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
NODE_ENV=production
```
Save: Ctrl+X, Y, Enter

### Step 6: Install Dependencies
```bash
npm install
```

### Step 7: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start index.js --name "india-ads"
pm2 startup
pm2 save
```

### Step 8: Configure Nginx Proxy
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace content with:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 9: Enable HTTPS (Free)
```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

### Step 10: Start Services
```bash
sudo systemctl restart nginx
pm2 restart all
```

Your API is live at: `https://your-domain.com/api/sendQuote`

---

## 🔗 Update Frontend for Production API

Once backend is deployed, update both Contact.js and Products.js:

### Contact.js
```javascript
// Replace localhost URL with production URL
const API_URL = "https://your-production-api.com/api/sendQuote";

// Rest of component remains the same
```

### Products.js
```javascript
// Replace localhost URL with production URL
const QUOTE_URL = "https://your-production-api.com/api/sendQuote";

// Rest of component remains the same
```

### Rebuild & Deploy
```bash
cd indiaadvertising
npm run build
git add src/
git commit -m "Update API URLs for production deployment"
git push
```

---

## ✅ Verification Checklist

After deployment, verify everything works:

- [ ] Frontend loads at www.indiaadvertising.com
- [ ] Contact form submits without errors
- [ ] Email arrives in inbox after contact submission
- [ ] Quote requests from Products page work
- [ ] Admin dashboard loads (scroll to bottom)
- [ ] Can add/edit/delete products in admin
- [ ] All form validations work
- [ ] Page is mobile responsive
- [ ] HTTPS certificate is valid (green lock)

---

## 🔍 Monitoring & Logs

### Render.com
- Logs visible in Render dashboard → Service → Logs
- Real-time monitoring and metrics

### Railway.app
- Logs available in project dashboard
- Environment variables editable in UI

### Heroku
```bash
heroku logs --tail
```

### DigitalOcean/PM2
```bash
pm2 logs
pm2 monit
```

---

## 🚨 Troubleshooting

### Backend Won't Start
```bash
# Check logs
npm start
# Look for error messages

# Common issues:
# - PORT already in use
# - .env variables missing
# - Missing node_modules (run npm install)
```

### Email Still Not Working on Production
```bash
# Verify .env variables are set correctly
# Test with TEST_EMAIL.js:
node TEST_EMAIL.js

# Check Gmail App Password:
# - Must be 16 characters
# - Generated from myaccount.google.com/apppasswords
# - 2-Factor Authentication must be enabled
```

### Frontend Can't Connect to Backend
- [ ] Check API URL in Contact.js and Products.js
- [ ] Verify backend is running and accessible
- [ ] Check browser console (F12) for CORS errors
- [ ] Verify CORS is enabled in backend (check index.js)

### Domain SSL Certificate Issues
For custom domain (indiaadvertising.com):
- HTTPS should be automatic via GitHub Pages
- Verify CNAME file exists in `indiaadvertising/public/CNAME`
- Content should be: `www.indiaadvertising.com`

---

## 📊 Cost Breakdown (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| GitHub Pages (Frontend) | ✅ Free | - |
| Render (Backend) | Free (limited) | $7/month |
| Railway (Backend) | Free credits | Pay-as-you-go |
| Heroku (Backend) | Deprecated | From $50/month |
| DigitalOcean (Backend) | - | $5/month |

**Recommended:** Render.com (easiest) or DigitalOcean (cheapest)

---

## 🎉 Completed Deployment

Once you've deployed using any option above:

1. **Frontend** - Already live at www.indiaadvertising.com
2. **Backend** - Now live on cloud (Render, Railway, Heroku, or DigitalOcean)
3. **Email** - Working with production Gmail credentials
4. **Database** - JSON-based storage in uploads and data folders
5. **Users** - Can submit contact forms and product quotes from anywhere

Your India Advertising Platform is now a fully functional production application! 🚀

---

## 📞 Next Steps

1. **Test everything** using the verification checklist above
2. **Monitor logs** for any issues
3. **Backup data** regularly from your backend server
4. **Update content** using the admin dashboard
5. **Promote** the live website to potential clients

---

**Congratulations on your production deployment!** 🎉
