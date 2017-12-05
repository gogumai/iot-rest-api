const Readings = require('../models/readings');

// const getAllReadings = async (ctx) => {
//   const readings = await Readings.findAll();
//   ctx.body = {
//     success: true,
//     result: readings,
//   };
// };

const getReadingsForDevice = async (ctx, next) => {
  await Readings.findReadingsForDevice(ctx.params.deviceId)
    .then((readings) => {
      ctx.status = 201;
      ctx.body = {
        success: true,
        readings,
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

const addReading = async (ctx, next) => {
  await Readings.saveReading(ctx.params.deviceId, ctx.request.body)
    .then((reading) => {
      ctx.status = 201;
      ctx.body = {
        success: true,
        reading,
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
  // getAllReadings,
  getReadingsForDevice,
  addReading,
};
