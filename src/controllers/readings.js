const Readings = require('../repos/readings');
const { buildOkBody, buildErrorBody } = require('../utils');

/** Devices controller module handles the logic between
* the readings related requests and the access to the repos
* @module controllers/readings
*/

/** Get all the readings that match the specified query params
* If those are empty, returns all the readings
* @param {Object} ctx - koa context
* @return {Object} the readings that match query params
*/
const getReadings = async (ctx) => {
  await Readings.findReadings(ctx.query)
    .then((readings) => {
      ctx.status = 200;
      ctx.body = buildOkBody(readings);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
};

/** Get all the readings for a secified device
* @param {Object} ctx - koa context
* @return {Object} the readings of a device
*/
const getReadingsForDevice = async (ctx) => {
  await Readings.findReadingsForDevice(ctx.params.deviceId)
    .then((readings) => {
      ctx.status = 200;
      ctx.body = buildOkBody(readings);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
};

/** Adds a reding for a device
* @param {Object} ctx - koa context
* @return {Object} the recently added reading
*/
const addReading = async (ctx) => {
  await Readings.saveReading(ctx.params.deviceId, ctx.request.body)
    .then((reading) => {
      ctx.status = 201;
      ctx.body = buildOkBody(reading);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
};

module.exports = {
  getReadings,
  getReadingsForDevice,
  addReading,
};
