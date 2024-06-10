const { v4: uuidv4 } = require('uuid');
const Token = require('../models/tokenModel');
const { sendEmailWithToken } = require('../utility/emailService');

const requestDownload = async (req, res, next) => {
    const { ref_ami, email } = req.body;
    const token = uuidv4();

    try {
      const isPresent = await Token.findByEmail(email);
      // if visitor is already existed, update the token
      if (isPresent && isPresent.email == email) {
        await Token.update(isPresent.id, token)
      } else {
        await Token.create(email, token);
      }

      sendEmailWithToken(email, ref_ami, token);
      next()
    } catch (error) {
      console.error('Error submitting download request:', error);
      res.status(500).send({message: 'Internal server error'});
    }
}

const verifyToken = async (req, res) => {
    const { token } = req.params;

    try {
        const tokenData = await Token.findByToken(token);
        if (!tokenData || new Date() - tokenData.created_at > 24 * 60 * 60 * 1000) {
            return res.status(404).json({message: 'Invalid or expired token'});
        }
        res.status(200).json({token: true});
      } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).send('Internal server error');
      }
}

module.exports = { requestDownload, verifyToken }