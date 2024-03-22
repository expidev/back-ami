const documentsController = require("../controllers/documentController");

const visitorModel = require("../controllers/visitorController");

const router = require("express").Router();

router.post('/ajout', documentsController.uploadAndInsert);

router.post('/', visitorModel.insert)

router.get('/visiteur/:id_visiteur', visitorModel.getVisitorById)

router.get('/documents/:id_ami', documentsController.getListByAmi)

module.exports = router;