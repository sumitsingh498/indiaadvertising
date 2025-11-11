import express from 'express';
import { sendQuoteMail } from '../utils/sendMail.js';

const router = express.Router();

router.post('/quote', async (req, res) => {
  const { name, mobile, email, message, product } = req.body;

  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  try {
    await sendQuoteMail({ name, mobile, email, message, product: product || 'General' });
    res.json({ success: true, message: 'Message sent!' });
  } catch (e) {
    console.error('Mail error:', e);
    res.status(500).json({ success: false, message: 'Failed to send' });
  }
});

export default router;