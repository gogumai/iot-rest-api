const shortid = require('shortid');
const Reading = require('./schema');
const Device = require('../devices');

const findReadings = async (options) => {
  try {
    const readings = await Reading.Model.find(options);
    if (!readings) return Promise.reject(new Error('No readings matched :('));
    return Promise.resolve(readings);
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

const findReadingsForDevice = async (id) => {
  try {
    const device = await Device.findDeviceById(id);
    if (!device) return Promise.reject(new Error('Device not exists :('));
    return Promise.resolve(device.readings);
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

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
