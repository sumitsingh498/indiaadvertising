import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '../data/companyData.json');

router.get('/getData', async (req, res) => {
  try {
    const raw = await fs.readFile(jsonPath, 'utf8');
    let data = JSON.parse(raw);

    // ---- Clean null entries (same logic as PHP) ----
    if (Array.isArray(data.categories)) {
      data.categories = data.categories.filter(c => c !== null);
      data.categories.forEach(cat => {
        if (Array.isArray(cat.subProducts)) {
          cat.subProducts = cat.subProducts.filter(p => p !== null);
        } else {
          cat.subProducts = [];
        }
      });
    } else {
      data.categories = [];
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;