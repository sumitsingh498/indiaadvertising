# India Advertising - Full Stack Project# India Advertising (Monorepo)



A complete advertising platform with Node.js Express backend and React frontend.This repository contains the frontend (React) and backend (Node/Express) for the India Advertising website.



## 📁 Project StructureStructure



```- `indiaadvertising/` — React app (frontend)

india-advertising/- `india-advertising-node/` — Express API (backend)

├── india-advertising-node/      # Node.js Express Backend (API Server)

│   ├── index.js                  # Main server entry pointQuick start (local)

│   ├── package.json              # Backend dependencies

│   ├── .env                      # Environment variables (secrets - DO NOT COMMIT)1. Frontend

│   ├── .env.example              # Template for .env

│   ├── data/   ```powershell

│   │   └── companyData.json      # Company data (products, categories, gallery)   cd indiaadvertising

│   ├── routes/                   # API routes   npm ci

│   ├── middleware/               # Express middleware   npm start

│   ├── utils/                    # Helper functions (email)   ```

│   └── uploads/                  # Uploaded images directory

├── indiaadvertising/             # React Frontend Application2. Backend

└── .github/   ```powershell

    └── workflows/   cd india-advertising-node

        ├── ci.yml                # Continuous Integration (Build & Test)   npm ci

        └── deploy.yml            # Continuous Deployment (Auto-deploy to Heroku)   # create .env from .env.example and update values

```   node index.js

   ```

## ⚡ Quick Start (Local Development)

Important

### Backend Setup

- Do NOT commit `.env` files with secrets. Use `.env.example` as a template.

```powershell- Back up `india-advertising-node/data/companyData.json` regularly.

cd india-advertising-node

CI

# Install dependencies

npm install- A GitHub Actions workflow is included to build the frontend and run backend checks.


# Copy .env template and configure
Copy-Item .env.example .env

# Edit .env with your Gmail credentials
# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```powershell
cd indiaadvertising
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## 🔐 Backend Configuration (.env)

Create `india-advertising-node/.env` with these values:

```bash
PORT=5000
NODE_ENV=development
GMAIL_USER=indiaadvertising05@gmail.com
GMAIL_PASS=stllwvdrvljilqhq
ADMIN_PASSWORD=admin123india321
CORS_ORIGIN=*
COMPANY_DATA_PATH=./data/companyData.json
UPLOADS_DIR=./uploads
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,gif,webp
```

### Gmail Setup (Required for Email)

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character app password (no spaces)
6. Paste into `GMAIL_PASS` in `.env`

## 🌐 Production Deployment to Heroku

### Step 1: Create Heroku Account & App

```bash
# Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create india-advertising-api
```

### Step 2: Add GitHub Secrets

Go to GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value |
|------------|-------|
| `HEROKU_API_KEY` | From `heroku auth:token` |
| `HEROKU_EMAIL` | Your Heroku email |
| `HEROKU_APP_NAME` | `india-advertising-api` (or your app name) |
| `GMAIL_USER` | `indiaadvertising05@gmail.com` |
| `GMAIL_PASS` | Your 16-char Gmail app password |
| `ADMIN_PASSWORD` | Your secure admin password |
| `CORS_ORIGIN` | Your frontend domain (e.g., `https://yourdomain.com`) |

### Step 3: Get Heroku API Key

```bash
heroku auth:token
# Copy the output and add as HEROKU_API_KEY secret
```

### Step 4: Deploy

**Automatic (GitHub Actions):**
```bash
git push origin main
# Deployment runs automatically!
```

**Manual (Heroku CLI):**
```bash
cd india-advertising-node
git push heroku main
```

### View Deployment Logs

```bash
heroku logs --app=india-advertising-api --tail
```

## 🔌 Backend API Endpoints

### Admin (Requires Password)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/admin/verify` | Verify admin password |
| POST | `/admin/sync` | Get all data (categories, gallery, company info) |
| POST | `/admin/upload` | Update data & upload images |

### Public Data

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/data/categories` | Get all categories and products |
| GET | `/data/gallery` | Get gallery images |
| GET | `/data/company-info` | Get company information |

### Quotes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/quote/send` | Send quote request email |

## 📊 Admin Dashboard Usage

### Verify Admin Access

```bash
curl -X POST http://localhost:5000/admin/verify \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123india321"}'
```

### Add Product to Category

```bash
curl -X POST http://localhost:5000/admin/upload \
  -F "password=admin123india321" \
  -F "action=addProduct" \
  -F "catIndex=0" \
  -F "product={\"name\":\"Product Name\",\"description\":\"Description\",\"price\":1000}" \
  -F "files=@image.jpg"
```

### Add Category

```bash
curl -X POST http://localhost:5000/admin/upload \
  -F "password=admin123india321" \
  -F "action=addCategory" \
  -F "category={\"name\":\"Category Name\",\"description\":\"Description\"}" \
  -F "files=@category-image.jpg"
```

### Add Gallery Image

```bash
curl -X POST http://localhost:5000/admin/upload \
  -F "password=admin123india321" \
  -F "action=addGalleryImage" \
  -F "caption=Image Caption" \
  -F "files=@gallery-image.jpg"
```

## 🧪 Testing

### Verify Backend Running

```bash
curl http://localhost:5000/data/categories
```

### Check Admin Authentication

```bash
curl -X POST http://localhost:5000/admin/verify \
  -H "Content-Type: application/json" \
  -d '{"password":"wrong_password"}'
# Should return 401 error
```

## 🚀 Production Checklist

- [ ] Change `ADMIN_PASSWORD` to strong password
- [ ] Set `CORS_ORIGIN` to your frontend domain (not `*`)
- [ ] Enable Heroku SSL/TLS in app settings
- [ ] Backup `companyData.json` regularly
- [ ] Monitor Heroku logs for errors
- [ ] Set up error alerting/monitoring

## 📱 Frontend Integration

To serve React frontend from the same server:

1. Build React app:
```bash
cd indiaadvertising
npm run build
```

2. Uncomment in `india-advertising-node/index.js`:
```javascript
// Serve React build (last route)
app.use(express.static(path.join(__dirname, '../indiaadvertising/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../indiaadvertising/build', 'index.html'));
});
```

3. Set `SERVE_BUILD=true` in `.env`

## ❌ Troubleshooting

### Port 5000 Already in Use

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or use different port
$env:PORT=3000; npm start
```

### Gmail Not Sending Emails

- ✅ Verify 2FA enabled on Gmail
- ✅ Check app password is 16 characters (no spaces)
- ✅ Wait 5-10 minutes after generating app password
- ✅ Check `companyData.json` has valid email addresses

### Heroku Deployment Fails

```bash
# View detailed error logs
heroku logs --app=india-advertising-api --tail

# Check environment variables
heroku config --app=india-advertising-api

# Restart app
heroku restart --app=india-advertising-api
```

## 📚 Useful Links

- [Express.js Documentation](https://expressjs.com/)
- [Multer File Upload](https://github.com/expressjs/multer)
- [Nodemailer Email](https://nodemailer.com/)
- [Heroku Deployment](https://devcenter.heroku.com/)
- [GitHub Actions CI/CD](https://docs.github.com/en/actions)

## 👨‍💻 Author

**Sumit Singh**  
Email: sumitsinghmawai63@gmail.com  
GitHub: [@sumitsingh498](https://github.com/sumitsingh498)

---

**Status**: 🟢 Live & Production Ready  
**Last Updated**: November 12, 2025
