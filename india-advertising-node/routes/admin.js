import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '../data/companyData.json');
const uploadDir = path.join(__dirname, '../uploads');

await fs.ensureDir(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

router.post('/admin', requireAdmin, upload.array('images'), async (req, res) => {
  const { action } = req.body;
  let data = await fs.readJson(jsonPath);

  // Ensure top-level arrays exist
  data.categories ??= [];
  data.gallery ??= [];
  data.clients ??= [];

  // ---------- Helper: save JSON ----------
  const save = async () => {
    await fs.writeJson(jsonPath, data, { spaces: 2 });
  };

  // ---------- Uploaded image paths ----------
  const newImages = req.files?.map(f => `uploads/${f.filename}`) ?? [];

  try {
    switch (action) {
      // ====================== PRODUCT ======================
      case 'addProduct': {
        const catIdx = parseInt(req.body.catIndex);
        const prod = JSON.parse(req.body.product);
        prod.images = newImages;
        data.categories[catIdx].subProducts.push(prod);
        await save();
        return res.json({ success: true, message: 'Product added', images: newImages });
      }

      case 'updateProduct': {
        const catIdx = parseInt(req.body.catIndex);
        const prodIdx = parseInt(req.body.prodIndex);
        const updates = JSON.parse(req.body.updates);
        const deleteImgs = JSON.parse(req.body.deleteImages || '[]');

        const prod = data.categories[catIdx].subProducts[prodIdx];
        Object.assign(prod, updates);

        // remove deleted images
        if (deleteImgs.length) {
          prod.images = prod.images.filter(p => !deleteImgs.includes(p));
        }
        // add new uploads
        if (newImages.length) prod.images.push(...newImages);

        await save();
        return res.json({ success: true, message: 'Product updated', images: newImages });
      }

      case 'deleteProduct': {
        const catIdx = parseInt(req.body.catIndex);
        const prodIdx = parseInt(req.body.prodIndex);
        data.categories[catIdx].subProducts.splice(prodIdx, 1);
        await save();
        return res.json({ success: true, message: 'Product deleted' });
      }

      // ====================== CATEGORY ======================
      case 'addCategory': {
        const cat = JSON.parse(req.body.category);
        data.categories.push(cat);
        await save();
        return res.json({ success: true, message: 'Category added' });
      }

      case 'updateCategory': {
        const catIdx = parseInt(req.body.catIndex);
        const upd = JSON.parse(req.body.category);
        Object.assign(data.categories[catIdx], upd);
        await save();
        return res.json({ success: true, message: 'Category updated' });
      }

      case 'deleteCategory': {
        const catIdx = parseInt(req.body.catIndex);
        data.categories.splice(catIdx, 1);
        await save();
        return res.json({ success: true, message: 'Category deleted' });
      }

      // ====================== GALLERY ======================
      case 'addGalleryImage': {
        const caption = req.body.caption || '';
        const imgPath = `uploads/${req.files[0].filename}`;
        data.gallery.push({ image: imgPath, caption });
        await save();
        return res.json({ success: true, message: 'Gallery image added' });
      }

      case 'deleteGalleryImage': {
        const idx = parseInt(req.body.index);
        data.gallery.splice(idx, 1);
        await save();
        return res.json({ success: true, message: 'Gallery image deleted' });
      }

      // ====================== CLIENTS ======================
      case 'addClient': {
        const client = req.body.client.trim();
        if (client) {
          data.clients.push(client);
          await save();
          return res.json({ success: true, message: 'Client added' });
        }
        return res.status(400).json({ error: 'Empty client name' });
      }

      case 'deleteClient': {
        const idx = parseInt(req.body.index);
        data.clients.splice(idx, 1);
        await save();
        return res.json({ success: true, message: 'Client deleted' });
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;