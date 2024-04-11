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

const validateAjoutDossier = [
  body('nom').isString().notEmpty(),
  body('prenom').optional().isString(),
  body('email').isEmail(),
  body('telephone').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,16}$/;
    if (!telephoneRegex.test(value)) {
        throw new Error('Contact invalide.');
    }
    return true;
  }),
  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "DAO non valide" });
    }
    
    next();
  }
]

module.exports = {
  validateSignin,
  validateAjoutDossier
};
