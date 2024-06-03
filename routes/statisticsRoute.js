
const statisticsController = require("../controllers/statisticsController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post('/statistics', authenticateAdmin, statisticsController.getDownloadStatistics)

module.exports = router;