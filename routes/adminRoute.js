const adminController = require("../controllers/adminController");
const { validateSignin } = require("../helper/validation");
const tokenController = require("../controllers/tokenController");

const router = require("express").Router();

router.post('/signin', validateSignin, adminController.signin);

router.get('/token/:token', tokenController.verifyToken);

module.exports = router;