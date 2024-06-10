const documentsController = require("../controllers/documentController");
const telechargementController = require("../controllers/telechargementController");
const { validateAjoutDossier } = require('../utility/validation');
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get('/documents/:ref_ami', authenticateAdmin, documentsController.getListByAmi)

router.get('/documents/:ref_ami/:token', telechargementController.insertTelechargement, documentsController.getListByAmi)

router.get('/download/:ref_ami', documentsController.downloadZip)

router.post('/ajout', authenticateAdmin, validateAjoutDossier, documentsController.uploadAndInsert);

router.post('/download/', documentsController.downloadDocument)

router.delete('/documents/:id_fichier/:nom_fichier', authenticateAdmin, documentsController.removeDocument)

module.exports = router;