const documentsController = require("../controllers/documentController");
const visitorController = require("../controllers/visitorController");
const amiController = require("../controllers/amiController");
const adminController = require("../controllers/adminController");

const router = require("express").Router();

router.post('/signin', adminController.post);

router.post('/ajout', documentsController.uploadAndInsert);

router.post('/', visitorController.insert)

router.get('/ami', amiController.getList);

router.get('/visiteur/:id_visiteur', visitorController.getVisitorById)

router.get('/documents/:id_ami', documentsController.getListByAmi)

module.exports = router;