require('dotenv').config();
const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
        user: config.EMAIL,
        pass: config.PASS
    }
})

const sendEmailWithToken = async (to, ref_unique, token) => {
    const subject = 'Confirmation de la demande des dossiers';
    const text = `
  Bonjour,

  Veuillez suivre le lien suivant pour continuer: 
  ${config.FRONTEND_URL}/dao/${encodeURIComponent(ref_unique)}/${token}
  
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
      const subject = `Un visiteur a téléchargé l' AMI Réf. ${visitor.ref_ami}`;
      const text = `
      Bonjour,

      Veuillez trouvez ci-dessous les informations du visiteur ayant téléchargé l'appel d'offre ${visitor.ref_ami}
      
      Type: ${visitor.type}
      Nom: ${visitor.nom}
      Région: ${visitor.nom_region}
      Adresse: ${visitor.adresse}${visitor.cin_nif ? `
      NIF ou CIN: ${visitor.cin_nif}` : ""}
      Email: ${visitor.email}
      Contact: ${visitor.telephone1} ${visitor.telephone2 ? `/ ${visitor.telephone2}` : ""} ${visitor.telephone3 ? `/ ${visitor.telephone3}` : ""}

      Cordialement,
      `;

      await transporter.sendMail({
        from: `"FID" <${config.NOTIFICATION_SENDER}>`,
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