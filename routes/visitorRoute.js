const visitorController = require("../controllers/visitorController");
const tokenController = require("../controllers/tokenController");
const { validateDemandeDossier } = require("../utility/validation");

const router = require("express").Router();

router.post('/visiteur', validateDemandeDossier, tokenController.requestDownload, visitorController.insert)

router.get('/visiteur/:id_visiteur',visitorController.getVisitorById)

module.exports = router;