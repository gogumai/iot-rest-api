const Devices = require('../models/devices');
const { buildOkBody, buildErrorBody } = require('../utils');

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
