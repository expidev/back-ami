const documentsController = require("../controllers/documentController");
const visitorController = require("../controllers/visitorController");
const amiController = require("../controllers/amiController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post('/ajout', ensureAuthenticated,documentsController.uploadAndInsert);

router.post('/', visitorController.insert)

router.get('/ami', amiController.getList);

router.get('/visiteur/:id_visiteur', visitorController.getVisitorById)

router.get('/documents/:id_ami', documentsController.getListByAmi)

module.exports = router;