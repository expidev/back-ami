
const superviseurController = require("../controllers/superviseurController");
const { validateAjoutSuperviseur } = require("../utility/validation");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get('/superviseur/:ref_ami', authenticateAdmin, superviseurController.getSuperviseurByAmi)

router.post('/superviseur', authenticateAdmin, validateAjoutSuperviseur, superviseurController.addSuperviseur);

router.delete('/superviseur/:id', authenticateAdmin, superviseurController.removeSuperviseur)

module.exports = router;