const Router = require('koa-router');
const Devices = require('../controllers/devices');

const router = Router({ prefix: '/devices' });

router.post(
  '/',
  Devices.addDevice,
);

router.get(
  '/',
  Devices.getAllDevices,
);

module.exports = router;
