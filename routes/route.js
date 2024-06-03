
const regionController = require("../controllers/regionController")
const districtController = require("../controllers/districtController")

const router = require("express").Router();

router.get('/position/region', regionController.getRegions)

router.get('/position/district', districtController.getDistricts)

router.use('/', require('./adminRoute'))

router.use('/', require('./amiRoute'))

router.use('/', require('./documentsRoute'))

router.use('/', require('./statisticsRoute'))

router.use('/', require('./superviseurRoute'))

router.use('/', require('./visitorRoute'))

module.exports = router;