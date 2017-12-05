const Devices = require('../models/devices');
const { buildOkBody, buildErrorBody } = require('../utils');

const getAllDevices = async (ctx, next) => {
  await Devices.findAll()
    .then((devices) => {
      ctx.status = 200;
      ctx.body = buildOkBody(devices);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
  await next();
};

const addDevice = async (ctx, next) => {
  await Devices.saveDevice(ctx.request.body)
    .then((device) => {
      ctx.status = 201;
      ctx.body = buildOkBody(device);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
  await next();
};

module.exports = {
  getAllDevices,
  addDevice,
};
