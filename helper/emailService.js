require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

const sendEmailWithToken = async (to,id_ami, token) => {
    const subject = 'Confirmation de la demande des dossiers';
    const text = `
  Bonjour,

  Veuillez suivre le lien suivant pour continuer: 
  ${process.env.FRONTEND}/dao/${encodeURIComponent(id_ami)}/${token}
  
  Cordialement,
    `;
  
    try {
      await transporter.sendMail({
        from: '"FID" web@fid.mg',
        to: to,
        subject: subject,
        text: text
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const sendEmailToAdmin = async (to, ccList, visitor) => {
    try {
      const subject = `Un visiteur a téléchargé l' AMI Réf. ${visitor.id_ami}`;
      const text = `
      Bonjour,

      Veuillez trouvez ci-dessous les informations du visiteur ayant téléchargé l'AMI Réf ${visitor.id_ami}
      
      Nom de l'entreprise ou du Candidat: ${visitor.nom} ${visitor.prenom ? visitor.prenom : ""}
      NIF ou CIN: ${visitor.cin_nif}
      Email: ${visitor.email_entreprise}
      Contact: ${visitor.telephone}

      Cordialement,
      `;

      await transporter.sendMail({
        from: `"FID" <${process.env.NOTIFICATION_SENDER}>`,
        to: to,
        cc: ccList,
        subject: subject,
        text: text
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  module.exports = { sendEmailWithToken, sendEmailToAdmin };