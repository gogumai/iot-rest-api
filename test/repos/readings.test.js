const chai = require('chai');
const { findReadings, findReadingsForDevice, saveReading } = require('../../src/repos/readings');
const { saveDevice } = require('../../src/repos/devices');
const { buildDevice, buildReading } = require('../../src/utils');

const { expect } = chai;

describe('Model - readings', () => {
  describe('saveReading', () => {
    describe('given a device id and a reading to be saved', () => {
      let newDevice = buildDevice();
      let newReading = {};

      beforeEach(async () => {
        newDevice = await saveDevice(newDevice);
        newReading = buildReading(newDevice._id);
      });

      it('should return the saved reading', async () => {
        await saveReading(newDevice._id, newReading).then((result) => {
          expect(result).to.include(newReading);
        });
      });
    });
  });

  describe('findReadingsForDevice', () => {
    describe('given a device id', () => {
      let newDevice = buildDevice();
      let newReading = buildReading();

      beforeEach(async () => {
        newDevice = await saveDevice(newDevice);
        newReading = await saveReading(newDevice._id, newReading);
      });

      it('should return corresponding readings for that device', async () => {
        await findReadingsForDevice(newDevice._id).then((result) => {
          expect(result[0]).to.deep.include(newReading.toObject());
        });
      });
    });
  });

  describe('findReadings', () => {
    describe('when provided with input that match', () => {
      let newDevice = buildDevice();
      let newReading = buildReading();
      let options = {
        used_memory_percentage: 1,
      }

      beforeEach(async () => {
        newDevice = await saveDevice(newDevice);
        newReading = await saveReading(newDevice._id, newReading);
      });

      it('should return the readings that match the input', async () => {
        await findReadings(options).then((result) => {
          expect(result.length).to.equal(1);
          expect(result[0]).to.deep.include(newReading.toObject());
        });
      });
    });
  });
});
