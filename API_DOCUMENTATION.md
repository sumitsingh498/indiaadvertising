# 📡 India Advertising - API Documentation

Complete API reference for the India Advertising backend.

## 🌐 Base URL

```
http://localhost:5000    (Local Development)
https://your-api-url     (Production)
```

## 📚 Routes Overview

| Method | Endpoint          | Authentication | Purpose                   |
| ------ | ----------------- | -------------- | ------------------------- |
| GET    | `/api/getData`    | None           | Get all project data      |
| POST   | `/api/updateData` | Password       | Admin CRUD operations     |
| POST   | `/api/sendQuote`  | None           | Submit quote/contact form |

---

## GET `/api/getData`

**Retrieve all project data** (categories, products, gallery, clients, company info)

### Request

```bash
curl http://localhost:5000/api/getData
```

### Response (200 OK)

```json
{
  "companyInfo": {
    "name": "India Advertising",
    "phone": "+91-9876543210",
    "email": "admin@indiaadvertising.in",
    "website": "https://indiaadvertising.in",
    "address": "New Delhi, India"
  },
  "categories": [
    {
      "category": "Branding",
      "images": ["uploads/branding.jpg"],
      "subProducts": [
        {
          "id": "uuid",
          "name": "Logo Design",
          "price": "₹5000",
          "description": "Professional logo design",
          "images": ["uploads/logo1.jpg"],
          "specs": [{ "key": "Format", "value": "Vector" }]
        }
      ]
    }
  ],
  "gallery": [
    {
      "id": 1234567890,
      "image": "uploads/gallery1.jpg",
      "caption": "Our Work"
    }
  ],
  "clients": [
    {
      "id": 1234567890,
      "name": "Client Name",
      "image": "uploads/logo.jpg"
    }
  ]
}
```

### Error Response (500)

```json
{ "error": "Failed to read data: ..." }
```

---

## POST `/api/updateData`

**Admin operations for CRUD on all data types**

### Authentication

All requests must include password in request body:

```
POST /api/updateData
Content-Type: application/json

{
  "password": "admin123",
  "action": "...",
  ...
}
```

### Request Headers

```
Content-Type: application/json         (for JSON actions)
Content-Type: multipart/form-data      (for file uploads)
```

---

## ✏️ Admin Actions

### 1. ADD PRODUCT

Add a product to a specific category.

#### Request (with Files)

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=addProduct" \
  -F "catIndex=0" \
  -F "product={
    \"name\": \"Logo Design\",
    \"price\": \"₹5000\",
    \"description\": \"Professional logo creation\",
    \"specs\": [
      { \"key\": \"Revisions\", \"value\": \"3\" },
      { \"key\": \"Format\", \"value\": \"Vector\" }
    ]
  }" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

#### Parameters

| Name     | Type   | Required | Description              |
| -------- | ------ | -------- | ------------------------ |
| password | string | Yes      | Admin password           |
| action   | string | Yes      | Must be `addProduct`     |
| catIndex | number | Yes      | Category index (0-based) |
| product  | JSON   | Yes      | Product object           |
| images   | file[] | No       | Image files to upload    |

#### Product Object Structure

```json
{
  "name": "Product Name",
  "price": "₹5000",
  "description": "Product description",
  "specs": [{ "key": "Size", "value": "10x10cm" }]
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "addProduct OK",
  "images": ["uploads/1234567_abc.jpg"]
}
```

---

### 2. UPDATE PRODUCT

Update product details and manage images.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=updateProduct" \
  -F "catIndex=0" \
  -F "prodIndex=1" \
  -F "updates={
    \"name\": \"Updated Name\",
    \"price\": \"₹10000\"
  }" \
  -F "deleteImages=[\"uploads/old.jpg\"]" \
  -F "images=@new_image.jpg"
```

#### Parameters

| Name         | Type   | Required | Description                    |
| ------------ | ------ | -------- | ------------------------------ |
| password     | string | Yes      | Admin password                 |
| action       | string | Yes      | Must be `updateProduct`        |
| catIndex     | number | Yes      | Category index                 |
| prodIndex    | number | Yes      | Product index in category      |
| updates      | JSON   | Yes      | Fields to update               |
| deleteImages | JSON   | No       | Array of image paths to delete |
| images       | file[] | No       | New image files                |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "updateProduct OK",
  "images": ["uploads/1234567_xyz.jpg"]
}
```

---

### 3. DELETE PRODUCT

Remove a product from a category.

#### Request (JSON)

```bash
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{
    "password": "admin123",
    "action": "deleteProduct",
    "catIndex": 0,
    "prodIndex": 1
  }'
```

#### Parameters

| Name      | Type   | Required |
| --------- | ------ | -------- |
| password  | string | Yes      |
| action    | string | Yes      |
| catIndex  | number | Yes      |
| prodIndex | number | Yes      |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "deleteProduct OK"
}
```

---

### 4. ADD CATEGORY

Create a new product category.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=addCategory" \
  -F "category={
    \"category\": \"Branding\",
    \"subProducts\": []
  }" \
  -F "images=@category.jpg"
```

#### Parameters

| Name     | Type   | Required |
| -------- | ------ | -------- |
| password | string | Yes      |
| action   | string | Yes      |
| category | JSON   | Yes      |
| images   | file[] | No       |

#### Category Object

```json
{
  "category": "Category Name",
  "subProducts": [],
  "images": []
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "addCategory OK",
  "images": ["uploads/1234567_cat.jpg"]
}
```

---

### 5. UPDATE CATEGORY

Update category details and images.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=updateCategory" \
  -F "catIndex=0" \
  -F "category={\"category\": \"New Name\"}" \
  -F "deleteImages=[\"uploads/old.jpg\"]"
```

#### Parameters

| Name         | Type   | Required |
| ------------ | ------ | -------- |
| password     | string | Yes      |
| action       | string | Yes      |
| catIndex     | number | Yes      |
| category     | JSON   | Yes      |
| deleteImages | JSON   | No       |
| images       | file[] | No       |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "updateCategory OK"
}
```

---

### 6. DELETE CATEGORY

Remove a category and all its products.

#### Request (JSON)

```bash
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{
    "password": "admin123",
    "action": "deleteCategory",
    "catIndex": 0
  }'
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "deleteCategory OK"
}
```

---

### 7. ADD GALLERY IMAGE

Add image(s) to the gallery.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=addGalleryImage" \
  -F "caption=Our Amazing Work" \
  -F "images=@gallery.jpg"
```

#### Parameters

| Name     | Type   | Required |
| -------- | ------ | -------- |
| password | string | Yes      |
| action   | string | Yes      |
| caption  | string | No       |
| images   | file[] | Yes      |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "addGalleryImage OK",
  "images": ["uploads/1234567_gallery.jpg"]
}
```

---

### 8. UPDATE GALLERY IMAGE

Update gallery item caption or image.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=updateGalleryImage" \
  -F "index=0" \
  -F "image={\"caption\": \"Updated Caption\"}" \
  -F "images=@new_image.jpg"
```

#### Parameters

| Name     | Type   | Required |
| -------- | ------ | -------- |
| password | string | Yes      |
| action   | string | Yes      |
| index    | number | Yes      |
| image    | JSON   | No       |
| images   | file[] | No       |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "updateGalleryImage OK"
}
```

---

### 9. DELETE GALLERY IMAGE

Remove a gallery item.

#### Request (JSON)

```bash
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{
    "password": "admin123",
    "action": "deleteGalleryImage",
    "index": 0
  }'
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "deleteGalleryImage OK"
}
```

---

### 10. ADD CLIENT

Add a client name and optional logo.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=addClient" \
  -F "client=Client Name" \
  -F "images=@logo.jpg"
```

#### Parameters

| Name     | Type   | Required |
| -------- | ------ | -------- |
| password | string | Yes      |
| action   | string | Yes      |
| client   | string | Yes      |
| images   | file[] | No       |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "addClient OK",
  "images": ["uploads/1234567_logo.jpg"]
}
```

---

### 11. UPDATE CLIENT

Update client name or logo.

#### Request

```bash
curl -X POST http://localhost:5000/api/updateData \
  -F "password=admin123" \
  -F "action=updateClient" \
  -F "index=0" \
  -F "client={\"name\": \"New Name\"}" \
  -F "images=@new_logo.jpg"
```

#### Parameters

| Name     | Type   | Required |
| -------- | ------ | -------- |
| password | string | Yes      |
| action   | string | Yes      |
| index    | number | Yes      |
| client   | JSON   | No       |
| images   | file[] | No       |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "updateClient OK"
}
```

---

### 12. DELETE CLIENT

Remove a client.

#### Request (JSON)

```bash
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{
    "password": "admin123",
    "action": "deleteClient",
    "index": 0
  }'
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "deleteClient OK"
}
```

---

### 13. UPDATE COMPANY INFO

Update company details.

#### Request (JSON)

```bash
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{
    "password": "admin123",
    "action": "updateCompanyInfo",
    "companyInfo": {
      "name": "India Advertising",
      "phone": "+91-9876543210",
      "email": "admin@indiaadvertising.in",
      "website": "https://indiaadvertising.in",
      "address": "New Delhi, India"
    }
  }'
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "updateCompanyInfo OK"
}
```

---

## POST `/api/sendQuote`

**Submit a quote/contact form request**

This endpoint sends an email to admin with the customer's message.

### Request (No Authentication)

```bash
curl -X POST http://localhost:5000/api/sendQuote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "mobile": "+91-9876543210",
    "email": "john@example.com",
    "product": "Logo Design",
    "message": "I am interested in your services..."
  }'
```

### Parameters

| Name    | Type   | Required | Description                   |
| ------- | ------ | -------- | ----------------------------- |
| name    | string | Yes      | Customer name                 |
| mobile  | string | Yes      | Customer phone                |
| email   | string | Yes      | Customer email                |
| product | string | No       | Product/service interested in |
| message | string | Yes      | Customer message              |

### Response (200 OK)

```json
{
  "ok": true
}
```

### Error Response (400)

```json
{
  "error": "Missing required fields"
}
```

### Error Response (500)

```json
{
  "error": "Mail failed"
}
```

---

## 🔐 Error Responses

### 401 Unauthorized

```json
{
  "error": "Invalid password"
}
```

**Cause:** Password in request doesn't match `ADMIN_PASSWORD` in `.env`

### 400 Bad Request

```json
{
  "error": "Unknown action: invalidAction"
}
```

**Cause:** Invalid action name or missing required parameters

### 500 Server Error

```json
{
  "error": "Database error or file operation failed"
}
```

**Cause:** File system error, corrupted JSON, or unexpected issue

---

## 📁 File Upload Details

### Size Limits

- **Max file size:** 5MB per file
- **Supported formats:** JPG, JPEG, PNG, GIF, WebP, BMP

### File Naming

- Files are saved with timestamp + random string
- Example: `1640123456789_abc12def.jpg`
- All files stored in `/uploads` directory

### Image Paths

- Stored in database as: `uploads/filename.jpg`
- Served at: `http://localhost:5000/uploads/filename.jpg`
- Frontend accesses via static route

---

## 🧪 Testing with Postman

### Import Collection

**Option A: Manual Setup**

1. Open Postman
2. Create new request
3. Select method: POST/GET
4. Enter URL: `http://localhost:5000/api/getData`
5. Click Send

**Option B: Use curl Commands**

Copy any curl command from this documentation and paste in terminal.

### Common Test Scenarios

1. **Get all data:**

   ```bash
   curl http://localhost:5000/api/getData
   ```

2. **Add product:**

   ```bash
   # See ADD PRODUCT section above
   ```

3. **Send quote:**
   ```bash
   curl -X POST http://localhost:5000/api/sendQuote \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "mobile": "9876543210",
       "email": "test@example.com",
       "product": "Branding",
       "message": "Test message"
     }'
   ```

---

## 🚀 Frontend Integration

### JavaScript Fetch Example

```javascript
// Add Product
const formData = new FormData();
formData.append("password", "admin123");
formData.append("action", "addProduct");
formData.append("catIndex", 0);
formData.append(
  "product",
  JSON.stringify({
    name: "Product",
    price: "₹5000",
    description: "Description",
    specs: [],
  })
);
formData.append("images", fileInput.files[0]);

const response = await fetch("http://localhost:5000/api/updateData", {
  method: "POST",
  body: formData,
});

const result = await response.json();
console.log(result);
```

### React Example

```javascript
const updateDataOnServer = async (action, payload, files) => {
  const fd = new FormData();
  fd.append("password", adminPassword);
  fd.append("action", action);

  Object.keys(payload).forEach((k) => {
    const val = payload[k];
    fd.append(k, typeof val === "object" ? JSON.stringify(val) : val);
  });

  if (files) {
    for (let f of files) fd.append("images", f);
  }

  const response = await fetch("http://localhost:5000/api/updateData", {
    method: "POST",
    body: fd,
  });

  return response.json();
};
```

---

## 📞 Debugging Tips

### Check if API is responding

```bash
curl http://localhost:5000/api/getData
```

### View error in browser console

Press F12 → Console tab → Check for error messages

### Check backend logs

Look at terminal where `npm start` is running

### Verify password

Make sure `.env` `ADMIN_PASSWORD` matches what you're sending

### Test endpoint in Postman

- More visual interface
- Shows request/response headers
- Easier to debug

---

**Last Updated:** 2024
