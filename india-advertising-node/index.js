import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { sendQuoteMail } from './utils/sendMail.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Config ----------
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const DATA_PATH = process.env.COMPANY_DATA_PATH || path.join(__dirname, 'data', 'companyData.json');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');

fs.ensureDirSync(path.dirname(DATA_PATH));
fs.ensureDirSync(UPLOADS_DIR);

// ---------- Multer ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});

const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    allowed.includes(ext) ? cb(null, true) : cb(new Error('Invalid file type'));
  },
}).any(); // Accept any field name

// ---------- Helpers ----------
async function readData() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeData(obj) {
  await fs.writeJson(DATA_PATH, obj, { spaces: 2 });
}

const safeParse = (val, fallback = {}) => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'string') {
    try { return JSON.parse(val); } catch { return val; }
  }
  return val;
};

// ---------- Routes ----------
app.get(['/api/getData.php', '/api/getData'], async (req, res) => {
  try {
    const data = await readData();

    // Clean nulls exactly like PHP
    if (Array.isArray(data.categories)) {
      data.categories = data.categories.filter(Boolean);
      data.categories.forEach(c => {
        if (Array.isArray(c.subProducts)) {
          c.subProducts = c.subProducts.filter(Boolean);
        } else {
          c.subProducts = [];
        }
      });
    } else {
      data.categories = [];
    }

    if (!Array.isArray(data.gallery)) data.gallery = [];
    if (!Array.isArray(data.clients)) data.clients = [];

    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post(
  ['/api/updateData.php', '/api/updateData'],
  upload,
  async (req, res) => {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (req.body.password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    let data;
    try { data = await readData(); }
    catch (e) { return res.status(500).json({ error: 'Corrupt JSON file' }); }

    // Normalize top-level arrays
    data.categories ??= [];
    data.gallery ??= [];
    data.clients ??= [];
    data.companyInfo ??= {};

    const action = req.body.action;
    const uploaded = (req.files || []).map(f => `uploads/${f.filename}`);

    try {
      switch (action) {
        // ---------- LOGIN ----------
        case 'verify':
          return res.json({ success: true, message: 'Authenticated' });

        // ---------- COMPANY INFO ----------
        case 'updateCompanyInfo':
          data.companyInfo = safeParse(req.body.companyInfo, {});
          break;

        // ---------- PRODUCTS ----------
        case 'addProduct': {
          const catIdx = +req.body.catIndex;
          const prod = safeParse(req.body.product, {});
          prod.images = [...(prod.images || []), ...uploaded];
          data.categories[catIdx].subProducts ??= [];
          data.categories[catIdx].subProducts.push(prod);
          break;
        }
        case 'updateProduct': {
          const catIdx = +req.body.catIndex;
          const prodIdx = +req.body.prodIndex;
          const updates = safeParse(req.body.updates, {});
          const del = safeParse(req.body.deleteImages, []);
          const p = data.categories[catIdx].subProducts[prodIdx];

          Object.assign(p, updates);
          if (del.length) p.images = (p.images || []).filter(i => !del.includes(i));
          if (uploaded.length) p.images = [...(p.images || []), ...uploaded];
          break;
        }
        case 'deleteProduct': {
          const catIdx = +req.body.catIndex;
          const prodIdx = +req.body.prodIndex;
          data.categories[catIdx].subProducts.splice(prodIdx, 1);
          break;
        }

        // ---------- CATEGORIES ----------
        case 'addCategory': {
          const category = safeParse(req.body.category, {});
          category.subProducts = [];
          category.images = [...(category.images || []), ...uploaded];
          data.categories.push(category);
          break;
        }
        case 'updateCategory': {
          const catIdx = +req.body.catIndex;
          const updates = safeParse(req.body.category, {});
          const del = safeParse(req.body.deleteImages, []);
          const cat = data.categories[catIdx];

          Object.assign(cat, updates);
          if (del.length) cat.images = (cat.images || []).filter(i => !del.includes(i));
          if (uploaded.length) cat.images = [...(cat.images || []), ...uploaded];
          break;
        }
        case 'deleteCategory':
          data.categories.splice(+req.body.catIndex, 1);
          break;

        // ---------- GALLERY ----------
        case 'addGalleryImage': {
          const caption = req.body.caption || '';
          if (uploaded.length) {
            uploaded.forEach(img => {
              data.gallery.push({ image: img, caption });
            });
          } else if (req.body.image) {
            data.gallery.push({ image: req.body.image, caption });
          } else {
            throw new Error('No image provided');
          }
          break;
        }
        case 'deleteGalleryImage':
          data.gallery.splice(+req.body.index, 1);
          break;
        case 'updateGalleryImage': {
          const idx = +req.body.index;
          const updates = safeParse(req.body.image, {});
          const item = data.gallery[idx];
          if (!item) throw new Error('Not found');
          Object.assign(item, updates);
          if (uploaded.length) item.image = uploaded[0];
          break;
        }

        // ---------- CLIENTS ----------
        case 'addClient': {
          const name = (req.body.client || '').trim();
          if (!name) throw new Error('Empty client name');
          data.clients.push(name);
          break;
        }
        case 'deleteClient':
          data.clients.splice(+req.body.index, 1);
          break;

        default:
          return res.status(400).json({ error: `Unknown action: ${action}` });
      }

      await writeData(data);
      res.json({ success: true, message: `${action} successful`, images: uploaded });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

// ---------- QUOTE EMAIL ----------
app.post('/api/sendQuote', async (req, res) => {
  try {
    const { name, email, mobile, message, product } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, mobile, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    await sendQuoteMail({ name, email, mobile, message, product });
    res.json({ success: true, message: 'Quote sent successfully!' });
  } catch (e) {
    console.error('Quote mail error:', e);
    res.status(500).json({ 
      error: 'Failed to send email. Please check server logs for details.',
      details: process.env.NODE_ENV === 'development' ? e.message : undefined
    });
  }
});

// ---------- SERVE UPLOADS ----------
app.use('/uploads', express.static(UPLOADS_DIR));

// ---------- SERVE REACT BUILD (optional) ----------
if (process.env.SERVE_BUILD === 'true') {
  const buildPath = path.join(__dirname, '..', 'build');
  if (fs.pathExistsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  }
}

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`API ready at http://localhost:${PORT}`);
  console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
});