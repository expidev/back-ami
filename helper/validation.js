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
  body('nom').isString().notEmpty().withMessage("Entrez le nom."),
  body('prenom').optional().isString(),
  body('cin_nif').isString().notEmpty(),
  body('email_entreprise').isEmail(),
  body('telephone1').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,16}$/;
    if (!telephoneRegex.test(value)) {
        throw new Error('Numéro de téléphone invalide.');
    }
    return true;
  }),
  body('telephone2').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,16}$/;
    if (value && !telephoneRegex.test(value)) {
        throw new Error('Numéro de téléphone invalide.');
    }
    return true;
  }),
  body('telephone3').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,16}$/;
    if (value && !telephoneRegex.test(value)) {
        throw new Error('Numéro de téléphone invalide.');
    }
    return true;
  }),
  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors });
    }
    
    next();
  }
]

module.exports = {
  validateSignin,
  validateAjoutDossier
};
