const Devices = require('../models/devices');

const getAllDevices = async (ctx) => {
  const devices = await Devices.findAll();
  ctx.body = {
    success: true,
    result: devices,
  };
};

const addDevice = async (ctx, next) => {
  await Devices.saveDevice(ctx.request.body)
    .then((device) => {
      ctx.status = 201;
      ctx.body = {
        success: true,
        result: device,
      };
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: err.message || 'Sorry, an error has occurred.',
      };
    });

  await next();
};

module.exports = {
  getAllDevices,
  addDevice,
};
