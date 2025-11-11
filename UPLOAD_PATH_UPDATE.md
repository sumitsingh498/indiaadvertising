# AdminDashboard.js - Upload Path Update Summary

## What Changed

Updated `AdminDashboard.js` to use a dedicated `UPLOAD_BASE` constant for serving images from the uploads directory, replacing the pattern `${API_BASE.replace('/api', '')}` throughout the component.

## Why This Matters

- **Clarity**: The upload path is now explicit and maintainable
- **Consistency**: All 7 image preview locations use the same constant
- **Easy Updates**: If the upload URL changes (e.g., production domain), update one constant instead of 7+ places
- **Correctness**: Images saved to `E:\advertising\india-advertising-node\uploads\` are served at `http://localhost:5000/uploads/filename`

## Changes Made

### Line 7: Added constant

```javascript
const UPLOAD_BASE = "http://localhost:5000"; // Base URL for serving uploaded files from /uploads
```

### Updated 6 locations where images are displayed:

1. **Category Images in Edit Form** (line 627)

   - `${UPLOAD_BASE}/${img}`

2. **Category Images in List** (line 663)

   - `${UPLOAD_BASE}/${img}`

3. **Product Images in Edit Form** (line 717)

   - `${UPLOAD_BASE}/${img}`

4. **Gallery Item Preview** (line 935)

   - `${UPLOAD_BASE}${editData.image}`

5. **Gallery Item Display** (line 975)

   - `${UPLOAD_BASE}${item.image}`

6. **Client Logo Display** (line 1112)
   - `${UPLOAD_BASE}${client.image}`

## How It Works

### Upload Flow (unchanged)

1. Admin uploads image in form
2. Backend saves to: `E:\advertising\india-advertising-node\uploads\filename.jpg`
3. Backend stores path in companyData.json as: `uploads/filename.jpg`

### Display Flow (updated)

- Before: `http://localhost:5000/api` → remove `/api` → `http://localhost:5000` + `/${img}`
- After: `http://localhost:5000` + `/${img}`

## For Production

When deploying, update line 7:

```javascript
// Development
const UPLOAD_BASE = "http://localhost:5000";

// Production (example)
const UPLOAD_BASE = "https://your-api-domain.com";
// or
const UPLOAD_BASE =
  process.env.REACT_APP_UPLOAD_BASE || "http://localhost:5000";
```

## Verification

All image paths in the admin dashboard now correctly point to:

- `http://localhost:5000/uploads/filename.jpg` (local development)
- Images stored in actual filesystem: `E:\advertising\india-advertising-node\uploads\`
- Backend serves via Express static middleware: `app.use('/uploads', express.static(UPLOADS_DIR))`

## Next Steps

1. Reload admin dashboard in browser
2. Upload a test image via admin
3. Verify image preview displays correctly
4. Verify image appears in admin list views
5. Verify companyData.json contains correct path: `uploads/filename.jpg`
