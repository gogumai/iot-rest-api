const Router = require('koa-router');
const Readings = require('../controllers/readings');

const router = Router();

router.get('/', Readings.getAllReadings);
router.post('/', Readings.addReading);

module.exports = router;
