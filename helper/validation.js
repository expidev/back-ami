const { body, validationResult } = require('express-validator');

const validateSignin = [
  body('email').isEmail(),
  body('password').isLength({ min: 3 }),
  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Login invalide." });
    }
    
    next();
  }
];

module.exports = validateSignin;
