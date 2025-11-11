import dotenv from 'dotenv';
import { sendQuoteMail } from './utils/sendMail.js';

dotenv.config();

async function testEmail() {
  try {
    console.log('Testing email functionality...');
    console.log('Gmail User:', process.env.GMAIL_USER);
    console.log('Gmail Pass exists:', !!process.env.GMAIL_PASS);

    await sendQuoteMail({
      name: 'Test User',
      email: 'test@example.com',
      mobile: '+91-1234567890',
      message: 'This is a test email from the India Advertising API',
      product: 'Test Product'
    });

    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    process.exit(1);
  }
}

testEmail();
