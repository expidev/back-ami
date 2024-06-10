const amiController = require("../controllers/amiController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get('/ami/', authenticateAdmin, amiController.countPage);

router.get('/ami/page/:page', authenticateAdmin, amiController.getListByPage);

router.get('/ami/:ref_ami', amiController.getAmiByRef);

router.delete('/ami/:ref_ami', authenticateAdmin, amiController.removeAmiByRef);

router.get('/search/', authenticateAdmin, amiController.searchAmiByRef);

router.get('/search/:ref_ami', authenticateAdmin, amiController.searchAmiByRef);

module.exports = router;