const mongoose = require('./mongoose');
const Readings = require('./readings');

const { Schema } = mongoose;

const DevicesSchema = new Schema({
  _id: String,
  friendly_name: String,
  readings: [Readings.Schema],
}, { _id: false });

module.exports = {
  Model: mongoose.model('Device', DevicesSchema),
  Schema: DevicesSchema,
};
