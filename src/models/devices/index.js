const shortid = require('shortid');
const Device = require('./schema');

const findDevice = async (options) => {
  const device = await Device.findOne(options);
  return device;
};

const findAll = async () => {
  const devices = await Device.find({});
  return devices;
};

const saveDevice = async (device) => {
  try {
    const newDevice = new Device({
      _id: shortid.generate(),
      ...device,
    });
    await newDevice.save();
    return Promise.resolve(newDevice);
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

module.exports = {
  findOne: findDevice,
  findAll,
  saveDevice,
};
