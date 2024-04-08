
const router = require("express").Router();

router.use('/', require('./adminRoute'))

router.use('/', require('./amiRoute'))

router.use('/', require('./documentsRoute'))

router.use('/', require('./superviseurRoute'))

router.use('/', require('./visitorRoute'))

module.exports = router;