const chai = require('chai');
const { saveDevice } = require('../../src/repos/devices');
const { getAllDevices, addDevice } = require('../../src/controllers/devices');
const { isIncluded, buildDevice } = require('../../src/utils');

const { expect } = chai;

describe('Controllers - devices', () => {
  describe('getAlldevices', () => {
    describe('when the db is empty', () => {
      const context = {};
      it('should return empty result', async () => {
        await getAllDevices(context);
        const { status, body: { success, result } } = context;
        expect(status).to.equal(200);
        expect(success).to.be.true;
        expect(result).to.have.lengthOf(0);
      });
    });

    describe('when has devices', () => {
      const newDevice = buildDevice();
      const context = {};

      beforeEach(async () => {
        await saveDevice(newDevice);
      });

      it('should return the devices', async () => {
        await getAllDevices(context);
        const { status, body: { success, result } } = context;
        expect(status).to.equal(200);
        expect(success).to.be.true;
        expect(result).to.have.lengthOf(1);
        expect(isIncluded(result[0], newDevice)).to.be.true;
      });
    });
  });

  describe('POST /devices', () => {
    const newDevice = buildDevice();
    const context = {
      request: {
        body: newDevice,
      },
    };

    it('should return the device that was added', async () => {
      await addDevice(context);
      const { status, body: { success, result } } = context;
      expect(status).to.equal(201);
      expect(success).to.be.true;
      expect(isIncluded(result, newDevice)).to.be.true;
    });
  });
});
