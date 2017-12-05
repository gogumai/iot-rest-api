const Readings = require('../models/readings');
const { buildOkBody, buildErrorBody } = require('../utils');

const getReadings = async (ctx, next) => {
  await Readings.findReadings(ctx.query)
    .then((readings) => {
      ctx.status = 200;
      ctx.body = buildOkBody(readings);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
  await next();
};

const getReadingsForDevice = async (ctx, next) => {
  await Readings.findReadingsForDevice(ctx.params.deviceId)
    .then((readings) => {
      ctx.status = 200;
      ctx.body = buildOkBody(readings);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });
  await next();
};

const addReading = async (ctx, next) => {
  await Readings.saveReading(ctx.params.deviceId, ctx.request.body)
    .then((reading) => {
      ctx.status = 201;
      ctx.body = buildOkBody(reading);
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = buildErrorBody(err);
    });

  await next();
};

module.exports = {
  getReadings,
  getReadingsForDevice,
  addReading,
};
