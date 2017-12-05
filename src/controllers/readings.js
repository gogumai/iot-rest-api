const Readings = require('../models/readings');
const { buildOkBody, buildErrorBody } = require('../utils');

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
