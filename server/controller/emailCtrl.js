const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const sendEmail = asyncHandler(async (data) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.MAIL_ID}>`,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
});

module.exports = sendEmail;
