# 🚀 DEPLOYMENT SETUP GUIDE

## ✅ What's Already Done

- ✅ Backend (Node.js/Express) fully configured and working
- ✅ GitHub repository connected and synced
- ✅ GitHub Actions CI/CD workflows created
- ✅ Email system configured (Gmail SMTP)
- ✅ Admin dashboard API endpoints ready
- ✅ File upload & image handling setup
- ✅ Comprehensive README with API docs

## 📋 Next Steps to Go LIVE

### 1. Deploy Backend to Heroku (REQUIRED)

#### Option A: Automatic Deployment (Recommended)

1. **Create Heroku Account** → https://signup.heroku.com
2. **Create Heroku App**:
   ```bash
   heroku login
   heroku create india-advertising-api
   ```
3. **Get Heroku API Key**:

   ```bash
   heroku auth:token
   ```

   Copy the output token.

4. **Add GitHub Secrets** (GitHub repo → Settings → Secrets and variables → Actions → New repository secret):

   | Name              | Value                          |
   | ----------------- | ------------------------------ |
   | `HEROKU_API_KEY`  | Your token from step 3         |
   | `HEROKU_EMAIL`    | Your Heroku email              |
   | `HEROKU_APP_NAME` | `india-advertising-api`        |
   | `GMAIL_USER`      | `indiaadvertising05@gmail.com` |
   | `GMAIL_PASS`      | Gmail app password (16 chars)  |
   | `ADMIN_PASSWORD`  | Your secure password           |
   | `CORS_ORIGIN`     | Your frontend domain           |

5. **Deploy**:

   ```bash
   git push origin main
   ```

   → GitHub Actions automatically deploys to Heroku!

6. **Verify Deployment**:
   ```bash
   heroku logs --app=india-advertising-api --tail
   ```
   Visit: `https://india-advertising-api.herokuapp.com/data/categories`

#### Option B: Manual Deployment (If GitHub Actions fails)

```bash
cd india-advertising-node
heroku login
git push heroku main
```

### 2. Setup Frontend (Optional - If Using React)

If you have a React frontend, build and serve it:

```bash
cd indiaadvertising
npm install
npm run build
```

Then uncomment the frontend serving code in `india-advertising-node/index.js`.

### 3. Connect Your Domain (Optional)

In Heroku app settings:

- Add your custom domain: `api.yourdomain.com`
- Enable SSL/TLS certificate

### 4. Verify Everything Works

Test the live API:

```bash
# Get all categories
curl https://india-advertising-api.herokuapp.com/data/categories

# Send a quote email
curl -X POST https://india-advertising-api.herokuapp.com/quote/send \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"9876543210",
    "message":"Hello, I need advertising services"
  }'
```

## 🔑 GitHub Secrets Setup (Detailed)

### HEROKU_API_KEY

```bash
# Generate this token
heroku login
heroku auth:token
# Copy the entire output (don't include "Enter your password:" prompt)
```

### HEROKU_EMAIL

```
Your Heroku account email (e.g., sumitsinghmawai63@gmail.com)
```

### HEROKU_APP_NAME

```
india-advertising-api
# Or your custom Heroku app name
```

### GMAIL_USER

```
indiaadvertising05@gmail.com
```

### GMAIL_PASS

⚠️ **IMPORTANT**: This is NOT your Gmail password!

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password (it will look like: `stllwvdrvljilqhq`)
6. Paste it WITHOUT spaces

### ADMIN_PASSWORD

```
Create a strong password (e.g., P@ssw0rd!Admin2024)
This protects your admin dashboard
```

### CORS_ORIGIN

```
For development: *
For production: https://yourdomain.com
```

## 📊 Admin Dashboard Access

Once live, you can:

1. **Login to Admin Dashboard** (your frontend will have the form)
2. **Add Products** to categories
3. **Upload Images** (JPG, PNG, GIF, WebP up to 5MB each)
4. **Manage Gallery**
5. **Edit Company Info**
6. **View Incoming Quotes** (stored in companyData.json)

### Admin API Example

```bash
# Verify password
curl -X POST https://india-advertising-api.herokuapp.com/admin/verify \
  -H "Content-Type: application/json" \
  -d '{"password":"P@ssw0rd!Admin2024"}'

# Get all data
curl -X POST https://india-advertising-api.herokuapp.com/admin/sync \
  -H "Content-Type: application/json" \
  -d '{"password":"P@ssw0rd!Admin2024"}'
```

## 🐛 Common Issues & Fixes

### "Deployment failed" on GitHub Actions

```bash
# Check logs
heroku logs --app=india-advertising-api --tail

# Verify secrets are set
heroku config --app=india-advertising-api

# Rebuild manually
heroku rebuild --app=india-advertising-api
```

### Emails not sending

- Verify Gmail 2FA is enabled
- Regenerate app password (wait 5-10 minutes)
- Check `companyData.json` has correct email addresses
- View server logs: `heroku logs --app=india-advertising-api`

### Port 5000 error locally

```bash
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port
PORT=3000 npm start
```

### CORS errors from frontend

Make sure `CORS_ORIGIN` in secrets matches your frontend domain exactly.

## 📈 Monitoring & Maintenance

### Daily

- Check Heroku logs for errors
- Monitor new incoming quotes/emails

### Weekly

- Backup `companyData.json`
- Review admin logs

### Monthly

- Update Node.js packages: `npm update`
- Check for security vulnerabilities: `npm audit`

## 🔒 Security Checklist (Before Production)

- [ ] Change `ADMIN_PASSWORD` to strong, unique password
- [ ] Set `CORS_ORIGIN` to your exact frontend domain (not `*`)
- [ ] Enable Heroku SSL/TLS
- [ ] Never commit `.env` file
- [ ] Rotate Gmail app password quarterly
- [ ] Enable GitHub branch protection rules
- [ ] Set up automated backups of `companyData.json`
- [ ] Use strong Heroku API key (rotate if exposed)

## 📞 Support & Debugging

If something breaks:

1. **Check Logs**:

   ```bash
   heroku logs --app=india-advertising-api --tail
   ```

2. **Restart App**:

   ```bash
   heroku restart --app=india-advertising-api
   ```

3. **View Config**:

   ```bash
   heroku config --app=india-advertising-api
   ```

4. **Force Redeploy**:
   ```bash
   git push origin main --force
   ```

## 🎉 Success!

Once you complete the Heroku setup and see your API responding:

✅ Backend is LIVE  
✅ Emails are working  
✅ Admin dashboard is accessible  
✅ Your project is production-ready!

---

**Questions?** Check the main README.md or GitHub Actions logs for details.

**Last Updated**: November 12, 2025  
**Backend Status**: Ready for Deployment ✅
