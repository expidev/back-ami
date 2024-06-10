const { body, validationResult } = require('express-validator');

const validateSignin = [
  body('email').isEmail(),
  body('mot_de_passe').isLength({ min: 3 }),
  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Login invalide." });
    }
    
    next();
  }
];

const validateAjoutSuperviseur= [
  body('nom').isString().notEmpty(),
  body('email').isEmail().notEmpty(),
];

const validateAjoutDossier = [
  body('ref_ami')
      .notEmpty().withMessage('Ref. Appel d\'Offre is required')
      .isString().withMessage('Ref. Appel d\'Offre must be a string'),
  body('description')
      .isString().withMessage('Description must be a string'),
];


const validateDemandeDossier = [
  body('nom').isString().notEmpty().withMessage("Entrez le nom."),
  body('ref_ami').isString().notEmpty(),
  body('adresse').isString().notEmpty().withMessage("Entrez l'adresse"),
  body('id_region').notEmpty().isInt(),
  body('type').custom((value) => {
    if (value !== 'entreprise' && value !== 'individu') {
      throw new Error("Le type doit être 'entreprise' ou 'individu'.");
    }
    return true;
  }),
  body('cin_nif').optional().isString().notEmpty(),
  body('email').isEmail(),
  body('telephone1').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,18}$/;
    if (!telephoneRegex.test(value)) {
        throw new Error('Numéro de téléphone invalide.');
    }
    return true;
  }),
  body('telephone2').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,18}$/;
    if (value && !telephoneRegex.test(value)) {
        throw new Error('Numéro de téléphone invalide.');
    }
    return true;
  }),
  body('telephone3').custom((value) => {
    const telephoneRegex = /^[0+][0-9 ]{9,18}$/;
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
  validateDemandeDossier,
  validateAjoutDossier,
  validateAjoutSuperviseur
};
