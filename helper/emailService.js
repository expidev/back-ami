require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const sendEmailWithToken = async (to,id_ami, token) => {
    const subject = 'Confirmation du demande des dossiers';
    const text = `Please click the following link to verify your email http://localhost:5173/dao/${id_ami}/${token}`;
  
    try {
      await transporter.sendMail({
        from: '"noreply" <noreply@example.com>',
        to: to,
        subject: subject,
        text: text
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  module.exports = { sendEmailWithToken };