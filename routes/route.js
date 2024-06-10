
const regionController = require("../controllers/regionController")

const router = require("express").Router();

router.get('/position/region', regionController.getRegions)

router.use('/', require('./userRoute'))

router.use('/', require('./amiRoute'))

router.use('/', require('./tokenRoute'))

router.use('/', require('./documentsRoute'))

router.use('/', require('./statisticsRoute'))

router.use('/', require('./superviseurRoute'))

router.use('/', require('./visitorRoute'))

module.exports = router;