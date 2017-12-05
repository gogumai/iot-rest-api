const Readings = require('../models/readings');

const getAllReadings = async (ctx) => {
  const readings = await Readings.findAll();
  ctx.body = {
    success: true,
    result: readings,
  };
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
  getAllReadings,
  addReading,
};
