const Router = require('koa-router');
const Devices = require('../controllers/devices');
const ReadingsRouter = require('./readings');

const router = Router({ prefix: '/devices' });

router.post('/', Devices.addDevice);
router.get('/', Devices.getAllDevices);

router.use('/:deviceId/readings', ReadingsRouter.routes());

module.exports = router;