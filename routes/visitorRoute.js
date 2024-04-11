const visitorController = require("../controllers/visitorController");
const tokenController = require("../controllers/tokenController");
const { validateAjoutDossier } = require("../helper/validation");

const router = require("express").Router();

router.post('/', validateAjoutDossier, tokenController.requestDownload, visitorController.insert)

router.get('/visiteur/:id_visiteur',visitorController.getVisitorById)

module.exports = router;