const documentsController = require("../controllers/documentController");
const logController = require("../controllers/logController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get('/documents/:id_ami', authenticateAdmin, documentsController.getListByAmi)

router.get('/documents/:id_ami/:token', logController.insertLog, documentsController.getListByAmi)

router.get('/download/:id_ami', documentsController.downloadZip)

router.post('/ajout', authenticateAdmin, documentsController.uploadAndInsert);

router.post('/download/', documentsController.downloadDocument)

router.delete('/documents/:id_fichier/:nom_fichier', authenticateAdmin, documentsController.removeDocument)

module.exports = router;