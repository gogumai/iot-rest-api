const chai = require('chai');
const { findDeviceById, findAll, saveDevice } = require('../../src/repos/devices');
const { buildDevice } = require('../../src/utils');

const { expect } = chai;

describe('Model - devices', () => {
  describe('saveDevice', () => {
    describe('given a device to be saved', () => {
      const newDevice = buildDevice();
      it('should return the saved device', async () => {
        await saveDevice(newDevice).then((result) => {
          expect(result).to.include(newDevice);
        });
      });
    });
  });

  describe('findDeviceById', () => {
    describe('given an id', () => {
      let newDevice = buildDevice();

      beforeEach(async () => {
        newDevice = await saveDevice(newDevice);
      });

      it('should return corresponding device', async () => {
        await findDeviceById(newDevice._id).then((result) => {
          expect(result).to.deep.include(newDevice.toObject());
        });
      });
    });
  });

  describe('findAll', () => {
    describe('when asked for all devices', () => {
      let newDevice = buildDevice();

      beforeEach(async () => {
        newDevice = await saveDevice(newDevice);
      });

      it('should return all the existent devices', async () => {
        await findAll().then((result) => {
          expect(result.length).to.equal(1);
          expect(result[0]).to.deep.include(newDevice.toObject());
        });
      });
    });
  });
});
