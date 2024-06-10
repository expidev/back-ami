const userController = require("../controllers/userController");
const { validateSignin } = require("../utility/validation");
const tokenController = require("../controllers/tokenController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post('/signin', validateSignin, userController.signin);

//create an user for an authentication
//router.post('/signup', userController.signup)

router.post('/logout', authenticateAdmin, userController.logout);

router.get('/token/:token', tokenController.verifyToken);

module.exports = router;