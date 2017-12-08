const chai = require('chai');
const { saveDevice } = require('../../src/repos/devices');
const { saveReading } = require('../../src/repos/readings');
const { getReadings, getReadingsForDevice, addReading } = require('../../src/controllers/readings');
const { isIncluded, buildDevice, buildReading } = require('../../src/utils');

const { expect } = chai;

describe('Controllers - readings', () => {
  describe('addReading', () => {
    let newDevice = {};
    let newReading = {};
    let context = {};

    beforeEach(async () => {
      newDevice = await saveDevice(buildDevice());
      newReading = buildReading(newDevice._id);
      context = {
        request: {
          body: newReading,
        },
        params: {
          deviceId: newDevice._id,
        },
      };
    });

    it('should return the reading that was added', async () => {
      await addReading(context);
      const { status, body: { success, result } } = context;
      expect(status).to.equal(201);
      expect(success).to.be.true;
      expect(isIncluded(result, newReading)).to.be.true;
    });
  });


  describe('getReadingsForDevice', () => {
    describe('when the device has no readings', () => {
      let newDevice = {};
      let context = {};

      beforeEach(async () => {
        newDevice = await saveDevice(buildDevice());
        context = {
          params: {
            deviceId: newDevice._id,
          },
        };
      });

      it('should return empty result', async () => {
        await getReadingsForDevice(context);
        const { status, body: { success, result } } = context;
        expect(status).to.equal(200);
        expect(success).to.be.true;
        expect(result).to.have.lengthOf(0);
      });
    });

    describe('when the device has readings', () => {
      let newDevice = {};
      let newReading = {};
      let context = {};

      beforeEach(async () => {
        newDevice = await saveDevice(buildDevice());
        newReading = await saveReading(newDevice._id, buildReading(newDevice._id));
        context = {
          params: {
            deviceId: newDevice._id,
          },
        };
      });

      it('should return the readings', async () => {
        await getReadings(context);
        const { status, body: { success, result } } = context;
        expect(status).to.equal(200);
        expect(success).to.be.true;
        expect(result).to.have.lengthOf(1);
        expect(isIncluded(result[0], newReading.toObject())).to.be.true;
      });
    });
  });


  describe('getReadings', () => {
    describe('when provided with input that match', () => {
      let newDevice = {};
      let newReading = {};
      const context = {
        request: {
          query: {
            used_memory_percentage: 1,
          },
        },
      };

      beforeEach(async () => {
        newDevice = await saveDevice(buildDevice());
        newReading = await saveReading(newDevice._id, buildReading(newDevice._id));
      });

      it('should return the readings that match the input', async () => {
        await getReadings(context);
        const { status, body: { success, result } } = context;
        expect(status).to.equal(200);
        expect(success).to.be.true;
        expect(result).to.have.lengthOf(1);
        expect(isIncluded(result[0], newReading.toObject())).to.be.true;
      });
    });

    describe('when provided with input that doesnt match', () => {
      const context = {
        request: {
          query: {
            used_memory_percentage: 10,
          },
        },
      };
      it('should return an empty array', async () => {
        await getReadings(context);
        const { status, body: { success, result } } = context;
        expect(status).to.equal(200);
        expect(success).to.be.true;
        expect(result).to.have.lengthOf(0);
      });
    });
  });
});
