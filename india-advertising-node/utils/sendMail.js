import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendQuoteMail = async ({ name, email, mobile, message, product }) => {
  const gmailUser = process.env.GMAIL_USER || 'indiaadvertising05@gmail.com';
  const gmailPass = process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD || 'stllwvdrvljilqhq';

  if (!gmailUser || !gmailPass) {
    throw new Error('Gmail credentials are not configured in environment variables');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  // Validate required fields
  if (!name || !email || !mobile || !message) {
    throw new Error('Missing required fields: name, email, mobile, or message');
  }

  const html = `
    <h2>New Enquiry: ${product || 'General'}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
  `;

  await transporter.sendMail({
    from: `"India Advertising" <${gmailUser}>`,
    to: gmailUser,
    replyTo: email,
    subject: `New Enquiry: ${product || 'Contact'}`,
    html,
  });
};