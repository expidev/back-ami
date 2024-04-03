const documentsController = require("../controllers/documentController");
const visitorController = require("../controllers/visitorController");
const amiController = require("../controllers/amiController");
const adminController = require("../controllers/adminController");
const tokenController = require("../controllers/tokenController");
const superviseurController = require("../controllers/superviseurController");
const { authenticateAdmin } = require("../middleware/authMiddleware");
const validateSignin = require("../helper/validation");

const router = require("express").Router();

router.post('/signin', validateSignin, adminController.signin);

router.post('/ajout', authenticateAdmin, documentsController.uploadAndInsert);

router.post('/', tokenController.requestDownload, visitorController.insert)

router.get('/ami', authenticateAdmin, amiController.getList);

router.get('/token/:token', tokenController.verifyToken);

router.get('/ami/:id_ami', authenticateAdmin, amiController.getAmiById);

router.get('/visiteur/:id_visiteur', visitorController.getVisitorById)

router.get('/documents/:id_ami', authenticateAdmin, documentsController.getListByAmi)

router.get('/documents/:id_ami/:token', documentsController.getListByAmi)

router.delete('/documents/:id_fichier/:nom_fichier', authenticateAdmin, documentsController.removeDocument)

router.get('/superviseur/:id_ami', authenticateAdmin, superviseurController.getSuperviseurByAmi)

router.delete('/superviseur/:id_superviseur', authenticateAdmin, superviseurController.removeSuperviseur)

router.post('/ami/email', authenticateAdmin, superviseurController.addSuperviseur);

router.post('/download/', documentsController.downloadDocument)

module.exports = router;