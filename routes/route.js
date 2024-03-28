const documentsController = require("../controllers/documentController");
const visitorController = require("../controllers/visitorController");
const amiController = require("../controllers/amiController");
const adminController = require("../controllers/adminController");
const tokenController = require("../controllers/tokenController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post('/signin', adminController.post);

router.post('/ajout', authenticateAdmin, documentsController.uploadAndInsert);

router.post('/', tokenController.requestDownload, visitorController.insert)

router.get('/ami', authenticateAdmin, amiController.getList);

router.get('/ami/:id_ami', authenticateAdmin, amiController.getAmiById);

router.get('/visiteur/:id_visiteur', visitorController.getVisitorById)

router.get('/documents/:id_ami', authenticateAdmin, documentsController.getListByAmi)

router.delete('/documents/:id_fichier/:nom_fichier', authenticateAdmin, documentsController.removeDocument)

router.post('/download/', documentsController.downloadDocument)

module.exports = router;