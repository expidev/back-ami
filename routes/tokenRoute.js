const tokenController = require("../controllers/tokenController");

const router = require("express").Router();

router.get('/token/:token', tokenController.verifyToken);

module.exports = router;