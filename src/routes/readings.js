const Router = require('koa-router');
const Readings = require('../controllers/readings');

/** Readings related routes. Also defines the readings nested routes for the device parent route
* @module routes/readings
*/

const nestedRouter = Router();
nestedRouter.get('/', Readings.getReadingsForDevice);
nestedRouter.post('/', Readings.addReading);

const router = Router({ prefix: '/readings' });
router.get('/', Readings.getReadings);

module.exports = {
  nestedRouter,
  router,
};
