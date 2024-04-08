
const superviseurController = require("../controllers/superviseurController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get('/superviseur/:id_ami', authenticateAdmin, superviseurController.getSuperviseurByAmi)

router.delete('/superviseur/:id_superviseur', authenticateAdmin, superviseurController.removeSuperviseur)

module.exports = router;