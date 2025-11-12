# India Advertising (Monorepo)

This repository contains the frontend (React) and backend (Node/Express) for the India Advertising website.

Structure

- `indiaadvertising/` — React app (frontend)
- `india-advertising-node/` — Express API (backend)

Quick start (local)

1. Frontend

   ```powershell
   cd indiaadvertising
   npm ci
   npm start
   ```

2. Backend
   ```powershell
   cd india-advertising-node
   npm ci
   # create .env from .env.example and update values
   node index.js
   ```

Important

- Do NOT commit `.env` files with secrets. Use `.env.example` as a template.
- Back up `india-advertising-node/data/companyData.json` regularly.

CI

- A GitHub Actions workflow is included to build the frontend and run backend checks.
