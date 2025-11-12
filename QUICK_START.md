# 🚀 QUICK REFERENCE - Commands to Go Live

## ⚡ TL;DR - 5 Minute Setup to Deploy

### 1. Create Heroku App

```bash
heroku login
heroku create india-advertising-api
```

### 2. Get API Key

```bash
heroku auth:token
# Copy the output
```

### 3. Add Secrets to GitHub (One-time Setup)

Go to: `https://github.com/sumitsingh498/indiaadvertising/settings/secrets/actions`

Add these 7 secrets:

```
HEROKU_API_KEY          = [paste from step 2]
HEROKU_EMAIL            = your-email@gmail.com
HEROKU_APP_NAME         = india-advertising-api
GMAIL_USER              = indiaadvertising05@gmail.com
GMAIL_PASS              = stllwvdrvljilqhq
ADMIN_PASSWORD          = your-secure-password
CORS_ORIGIN             = * (or your domain)
```

### 4. Deploy

```bash
git push origin main
# Done! GitHub Actions auto-deploys!
```

### 5. Verify Live

```bash
# Check if API responds
curl https://india-advertising-api.herokuapp.com/data/categories

# View logs if needed
heroku logs --app=india-advertising-api --tail
```

---

## 📋 Common Commands

### Start Backend Locally

```bash
cd india-advertising-node
npm install
npm run dev
# Runs on http://localhost:5000
```

### Test Admin Access

```bash
curl -X POST http://localhost:5000/admin/verify \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123india321"}'
```

### Check Deployment Status

```bash
heroku logs --app=india-advertising-api --tail
```

### Restart Heroku App

```bash
heroku restart --app=india-advertising-api
```

### View Environment Variables

```bash
heroku config --app=india-advertising-api
```

### Manually Redeploy

```bash
cd india-advertising-node
git push heroku main
```

### Kill Local Port 5000

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🔑 Where to Find Secrets

| Secret            | Where to Get                              |
| ----------------- | ----------------------------------------- |
| `HEROKU_API_KEY`  | Run: `heroku auth:token`                  |
| `HEROKU_EMAIL`    | Your Heroku account email                 |
| `HEROKU_APP_NAME` | From `heroku create` output               |
| `GMAIL_USER`      | `indiaadvertising05@gmail.com`            |
| `GMAIL_PASS`      | Gmail Settings → App Passwords (16 chars) |
| `ADMIN_PASSWORD`  | Any strong password you choose            |
| `CORS_ORIGIN`     | Your frontend domain or `*`               |

---

## ✅ Verification Checklist

- [ ] Heroku account created
- [ ] `heroku create india-advertising-api` ran successfully
- [ ] `HEROKU_API_KEY` added to GitHub Secrets
- [ ] All 7 secrets are set in GitHub
- [ ] `git push origin main` executed
- [ ] GitHub Actions workflow completed (check Actions tab)
- [ ] `curl https://india-advertising-api.herokuapp.com/data/categories` returns JSON

---

## 🎯 Next Features to Add (Optional)

- [ ] React frontend (build and integrate)
- [ ] Database (PostgreSQL instead of JSON file)
- [ ] Authentication system (JWT tokens)
- [ ] Image CDN (AWS S3 or Cloudinary)
- [ ] Analytics/monitoring
- [ ] Automated backups

---

**Your Project is Ready to Deploy! 🎉**

Follow steps 1-5 above and your project goes live in minutes.

Questions? Check `README.md` or `DEPLOYMENT_GUIDE.md`
