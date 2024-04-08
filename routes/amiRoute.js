const amiController = require("../controllers/amiController");
const superviseurController = require("../controllers/superviseurController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get('/ami/', authenticateAdmin, amiController.countPage);

router.get('/ami/page/:page', authenticateAdmin, amiController.getListByPage);

router.get('/ami/:id_ami', authenticateAdmin, amiController.getAmiById);

router.get('/search/', authenticateAdmin, amiController.searchAmiById);

router.get('/search/:id_ami', authenticateAdmin, amiController.searchAmiById);

router.post('/ami/email', authenticateAdmin, superviseurController.addSuperviseur);

module.exports = router;