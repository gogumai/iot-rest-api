const shortid = require('shortid');
const Reading = require('./schema');
const Device = require('../devices');

// const findReadings = async (options) => {
//   const reading = await Reading.Model.findOne(options);
//   return reading;
// };

const findReadingsForDevice = async (id) => {
  try {
    const device = await Device.findDeviceById(id);
    if (!device) return Promise.reject(new Error('Device not exists :('));
    return Promise.resolve({ readings: device.readings });
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

// const findAll = async () => {
//   const readings = await Reading.Model.find({});
//   return readings;
// };

const saveReading = async (deviceId, reading) => {
  try {
    const newReading = new Reading.Model({
      _id: shortid.generate(),
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
  // findReadings,
  findReadingsForDevice,
  // findAll,
  saveReading,
};
