# india-advertising-node

Node.js API replacement for the original PHP backend used by the India Advertising project.

Features

- GET `/api/getData` and `/api/getData.php` — reads `companyData.json`
- POST `/api/updateData` and `/api/updateData.php` — writes `companyData.json` (requires `ADMIN_KEY` header or body)
- POST `/api/upload` — multipart file upload (returns path)
- POST `/api/sendQuote` — sends email via SMTP (Nodemailer)

Quick start

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```powershell
cd C:\xampp\htdocs\indiaadvertising\india-advertising-node
npm install
```

3. Run locally:

```powershell
npm run dev
# or
npm start
```

Deployment

- You can deploy this to Render, Railway, or any Node-capable host.
- If you prefer to keep the React frontend on GitHub Pages, set `CORS_ORIGIN` in `.env` to the GitHub Pages domain and update the frontend API URLs to your deployed Node server.

Notes

- Keep `.env` private. Use `ADMIN_KEY` to protect the update endpoint.
- The included `data/companyData.json` is copied from the existing build; update via admin panel or API.
