const shortid = require('shortid');
const Device = require('./schema');

/** Devices model logic.
* @module models/devices
*/

/** Finds a device by its id
* @param {string} id - device's id
* @return {Object} the corresponding device
*/
const findDeviceById = async (id) => {
  const device = await Device.Model.findById(id);
  return device;
};

/** Finds all devices
* @return {Object} all the devices
*/
const findAll = async () => {
  const devices = await Device.Model.find({});
  return devices;
};

/** Saves a given device
* @param {Object} device - device to be saved
* @return {Object} the recently saved device
*/
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
