# 🚀 Deployment Checklist

Complete checklist to ensure your project is ready for production deployment.

## Pre-Deployment (Local Testing)

### Frontend Testing

- [ ] Run `npm install` successfully in `indiaadvertising/`
- [ ] Run `npm start` and verify site loads at localhost:3000
- [ ] Test all pages load correctly
- [ ] Test responsive design on mobile (Chrome DevTools)
- [ ] Test all navigation links work
- [ ] Test Contact form submits without errors
- [ ] Verify products display correctly
- [ ] Verify gallery loads with images
- [ ] Verify clients section displays

### Backend Testing

- [ ] Run `npm install` successfully in `india-advertising-node/`
- [ ] Verify `.env` file exists with all required variables
- [ ] Run `npm start` and verify server starts (http://localhost:5000)
- [ ] Test API endpoint: `curl http://localhost:5000/api/getData`
- [ ] Verify uploads directory exists
- [ ] Test admin login with password

### Admin Dashboard Testing

- [ ] Login to admin with password `admin123`
- [ ] Navigate through all tabs (Company, Products, Categories, Gallery, Clients)
- [ ] **Products Tab:**
  - [ ] Add a new product with image
  - [ ] Edit product (change name, add description)
  - [ ] Delete image from product
  - [ ] Add another image to product
  - [ ] Delete product
- [ ] **Categories Tab:**
  - [ ] Add a new category with image
  - [ ] Edit category name and image
  - [ ] Delete category
  - [ ] Verify products per category work
- [ ] **Gallery Tab:**
  - [ ] Add gallery item with image
  - [ ] Edit gallery item
  - [ ] Delete gallery item
- [ ] **Clients Tab:**
  - [ ] Add client with name
  - [ ] Add client with logo
  - [ ] Edit client
  - [ ] Delete client
- [ ] Logout and verify session ends

### Email Testing

- [ ] Fill out contact form with test data
- [ ] Submit form
- [ ] Check email inbox (indiaadvertising05@gmail.com)
- [ ] Verify email contains all submitted information
- [ ] Verify "Reply-To" header is set to customer email

### Image Upload Testing

- [ ] Upload JPG image - should succeed
- [ ] Upload PNG image - should succeed
- [ ] Upload image > 5MB - should fail
- [ ] Upload .BMP image - should succeed
- [ ] Upload .TXT file - should fail
- [ ] Verify image paths saved to companyData.json
- [ ] Verify images display in admin preview
- [ ] Verify images display on public website

### Data Persistence Testing

- [ ] Add a product via admin
- [ ] Refresh the page
- [ ] Verify product still exists
- [ ] Restart server
- [ ] Verify product still exists
- [ ] Check companyData.json file manually

---

## Production Preparation

### Code Review

- [ ] Review all modified files for debugging code
- [ ] Remove any `console.log()` statements
- [ ] Verify error handling is in place
- [ ] Check for hardcoded credentials (should use .env)
- [ ] Verify all API calls handle errors

### Security Checklist

- [ ] Change `ADMIN_PASSWORD` in `.env` to strong password
- [ ] Verify `.env` is in `.gitignore`
- [ ] Verify `.gitignore` includes `node_modules`, `uploads`
- [ ] Verify no `.env` file committed to Git
- [ ] Check for exposed API keys or credentials in code
- [ ] Review CORS configuration for security
- [ ] Verify file upload validation is active
- [ ] Check image size limits are enforced (5MB)
- [ ] Verify image format whitelist (JPG, PNG, GIF, WebP, BMP only)

### Dependencies & Packages

- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Update all packages: `npm update`
- [ ] Verify package versions are compatible
- [ ] Review package.json for unused dependencies
- [ ] Test after any dependency updates

### Documentation Review

- [ ] README.md is complete and accurate
- [ ] GITHUB_README.md covers setup
- [ ] SETUP_GUIDE.md has step-by-step instructions
- [ ] API_DOCUMENTATION.md documents all endpoints
- [ ] Deployment section is complete
- [ ] Troubleshooting section covers common issues
- [ ] Comments in code explain complex logic

### Build Optimization

- [ ] Run `npm run build` in frontend folder
- [ ] Verify build completes without errors
- [ ] Check build size (should be < 500KB gzipped)
- [ ] Test built application locally
- [ ] Verify source maps are included for debugging

---

## Git & GitHub Setup

### Repository Setup

- [ ] Create GitHub repository
- [ ] Clone locally: `git clone <url>`
- [ ] Verify `.gitignore` is correct
- [ ] Add all files: `git add .`
- [ ] Create first commit: `git commit -m "Initial commit"`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Verify files on GitHub (no .env, no node_modules)

### Repository Configuration

- [ ] Add README to repository
- [ ] Create CONTRIBUTING.md (optional)
- [ ] Add LICENSE file (optional)
- [ ] Set repository description
- [ ] Add topics: "react", "nodejs", "express"
- [ ] Enable GitHub Pages (if using)

---

## Deployment to Render.com

### Render Account Setup

- [ ] Create account at render.com
- [ ] Authorize GitHub connection
- [ ] Verify GitHub account has repository access

### Backend Deployment

- [ ] Create new "Web Service"
- [ ] Connect GitHub repository
- [ ] Set root directory: `india-advertising-node`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Set environment variables:
  - [ ] `PORT=5000`
  - [ ] `NODE_ENV=production`
  - [ ] `ADMIN_PASSWORD=<strong-password>`
  - [ ] `GMAIL_USER=<email>`
  - [ ] `GMAIL_PASS=<app-password>`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete
- [ ] Verify deployment successful in logs
- [ ] Note the API URL (e.g., https://india-advertising-api.onrender.com)

### Frontend Deployment

- [ ] Go to frontend folder: `indiaadvertising`
- [ ] Update `AdminDashboard.js` API_BASE URL:
  ```javascript
  const API_BASE = "https://your-api-url/api";
  ```
- [ ] Commit and push change
- [ ] Create new Vercel project
- [ ] Connect GitHub repository
- [ ] Select `indiaadvertising` folder as root
- [ ] Deploy
- [ ] Verify site loads at Vercel URL

### Test Deployed Version

- [ ] Visit frontend URL in browser
- [ ] Verify public site loads
- [ ] Verify images display
- [ ] Verify navigation works
- [ ] Click Admin button and login
- [ ] Test adding a product
- [ ] Submit contact form
- [ ] Verify email received

---

## Alternative Deployment Options

### Railway.app Option

- [ ] Create Railway account
- [ ] Connect GitHub
- [ ] Create new project
- [ ] Link GitHub repository
- [ ] Set environment variables
- [ ] Deploy

### Custom VPS Option

- [ ] Rent server (AWS, DigitalOcean, Linode)
- [ ] Install Node.js
- [ ] Clone repository
- [ ] Install dependencies
- [ ] Create `.env` file with production values
- [ ] Start server with process manager (PM2)
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure SSL/HTTPS
- [ ] Point domain to server IP

### GitHub Pages + Separate Backend Option

- [ ] Deploy frontend build to GitHub Pages
- [ ] Deploy backend separately (Render/Railway)
- [ ] Update frontend to point to deployed backend
- [ ] Verify everything works together

---

## Post-Deployment

### Monitoring

- [ ] Set up error logging (optional)
- [ ] Monitor server performance
- [ ] Check logs regularly for errors
- [ ] Monitor email sending

### Maintenance

- [ ] Regular backup of companyData.json
- [ ] Update dependencies monthly
- [ ] Monitor disk space usage
- [ ] Test backup restore process

### Updates & Improvements

- [ ] Collect user feedback
- [ ] Plan feature improvements
- [ ] Test new features on staging
- [ ] Deploy to production
- [ ] Monitor for issues

---

## Final Verification

Before announcing the site is live:

- [ ] Verify all pages load
- [ ] Verify all functionality works
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Verify email notifications work
- [ ] Verify images display correctly
- [ ] Verify admin dashboard accessible
- [ ] Verify contact form submits
- [ ] Check website performance (load time < 3 seconds)
- [ ] Verify no console errors in DevTools
- [ ] Test on slow network (throttle in DevTools)
- [ ] Verify HTTPS is enabled
- [ ] Verify domain points to correct server

---

## Launch Announcement

Once deployed and verified:

1. **Notify stakeholders:** Send deployment notification
2. **Update DNS:** Point domain to server (if applicable)
3. **Promote:** Update social media with new website link
4. **Monitor:** Watch for any user-reported issues
5. **Document:** Log deployment date and version
6. **Celebrate:** 🎉 Your site is live!

---

## Quick Reference

### Important URLs (After Deployment)

- **Frontend:** https://your-frontend-url
- **Backend API:** https://your-api-url
- **Admin Panel:** https://your-frontend-url/indiaadvertising/admin
- **GitHub:** https://github.com/yourusername/india-advertising

### Important Passwords/Credentials

- Admin Password: ******\_****** (set in deployment)
- Gmail User: ********\_********
- Gmail Pass: ********\_******** (16-char App Password)

### Important File Paths

- Config: `india-advertising-node/.env`
- Database: `india-advertising-node/data/companyData.json`
- Frontend Config: `indiaadvertising/src/components/AdminDashboard.js` (API_BASE)

---

## Support Contacts

- **GitHub Issues:** Create issue in repository
- **Email:** admin@indiaadvertising.in
- **Render Support:** https://render.com/support
- **Node.js Docs:** https://nodejs.org/docs

---

## Notes

Use this space for deployment notes:

```
Deployment Date: _______________
Deployed By: ___________________
Backend URL: ___________________
Frontend URL: __________________
Issues Encountered: _____________
Resolution: _____________________
```

---

**Status:** Ready to Deploy ✅
**Date:** 2024
**Version:** 1.0.0

Good luck with your deployment! 🚀
