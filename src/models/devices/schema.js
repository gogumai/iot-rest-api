const mongoose = require('../mongoose');

const { Schema } = mongoose;

const DevicesSchema = new Schema({
  _id: String,
  friendly_name: String,
}, { _id: false });

module.exports = mongoose.model('Device', DevicesSchema);
