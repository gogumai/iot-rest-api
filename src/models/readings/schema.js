const mongoose = require('../mongoose');

const { Schema } = mongoose;

const ReadingsSchema = new Schema({
  _id: String,
  device_id: String,
  used_memory_percentage: Number,
  cpu_load: Number,
  disk_usage_percentage: Number,
  cpu_temperature: Number,
  datetime: Date,
}, { _id: false });

module.exports = {
  Model: mongoose.model('Reading', ReadingsSchema),
  Schema: ReadingsSchema,
};
