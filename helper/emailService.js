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
    const text = `
      Bonjour

      Veuillez suivre le lien suivant pour continuer: 
      http://localhost:5173/dao/${id_ami}/${token}
      
      Cordialement,
    `;
  
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

  const sendEmailToAdmin = async (to, subject, text) => {
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
  
  module.exports = { sendEmailWithToken, sendEmailToAdmin };