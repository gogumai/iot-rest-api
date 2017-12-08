const Devices = require('../repos/devices');
const { buildOkBody, buildErrorBody } = require('../utils');

/** Devices controller module handles the logic between
* the devices related requests and the access to the repos
* @module controllers/devices
*/

/** Get all existent devices
* @param {Object} ctx - koa context
* @return {Object} the devices
*/
const getAllDevices = async (ctx) => {
  await Devices.findAll()
    .then((devices) => {
      ctx.status = 200;
      ctx.body = buildOkBody(devices);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
};

/** Adds a device
* @param {Object} ctx - koa context
* @return {Object} the recently added device
*/
const addDevice = async (ctx) => {
  await Devices.saveDevice(ctx.request.body)
    .then((device) => {
      ctx.status = 201;
      ctx.body = buildOkBody(device);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
};

module.exports = {
  getAllDevices,
  addDevice,
};
