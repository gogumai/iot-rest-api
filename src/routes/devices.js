const Router = require('koa-router');
const Devices = require('../controllers/devices');
const { nestedRoutes: nestedReadingsRouter } = require('./readings');

/** Devices related routes.
* @module routes/devices
*/

const router = Router({ prefix: '/devices' });

router.post('/', Devices.addDevice);
router.get('/', Devices.getAllDevices);

router.use('/:deviceId/readings', nestedReadingsRouter);

module.exports = router.routes();
