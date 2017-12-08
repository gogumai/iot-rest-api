const shortid = require('shortid');
const Reading = require('../models/readings');
const Device = require('./devices');

/** Readings repo logic.
* @module repos/readings
*/

/** Finds all the readings that match the specified options
* @param {Object} options - object that contains reading properties
* @return {Object} the readings that match the options
*/
const findReadings = async (options) => {
  try {
    const readings = await Reading.Model.find(options);
    if (!readings) return Promise.reject(new Error('No readings matched :('));
    return Promise.resolve(readings);
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

/** Finds all the readings for a specific device
* @param {string} id - device's id
* @return {Object} the readings of the device
*/
const findReadingsForDevice = async (id) => {
  try {
    const device = await Device.findDeviceById(id);
    if (!device) return Promise.reject(new Error('Device not exists :('));
    return Promise.resolve(device.readings);
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

/** Saves a reading for a specific device
* @param {string} deviceId - device's id
* @param {Object} reading - reading to be saved
* @return {Object} the recently added reading
*/
const saveReading = async (deviceId, reading) => {
  try {
    const newReading = new Reading.Model({
      _id: shortid.generate(),
      device_id: deviceId,
      ...reading,
    });
    const device = await Device.findDeviceById(deviceId);
    await newReading.save();
    device.readings.push(newReading);
    await device.save();
    return Promise.resolve(newReading);
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

module.exports = {
  findReadings,
  findReadingsForDevice,
  saveReading,
};
