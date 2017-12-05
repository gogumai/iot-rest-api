const shortid = require('shortid');
const Device = require('./schema');

const findDeviceById = async (id) => {
  const device = await Device.Model.findById(id);
  return device;
};

const findAll = async () => {
  const devices = await Device.Model.find({});
  return devices;
};

const saveDevice = async (device) => {
  try {
    const newDevice = new Device.Model({
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
  findDeviceById,
  findAll,
  saveDevice,
};
