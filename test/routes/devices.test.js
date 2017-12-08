const chai = require('chai');
const chaiHttp = require('chai-http');
const { saveDevice } = require('../../src/repos/devices');
const { buildDevice } = require('../../src/utils/');
const server = require('./../../index');

const { expect } = chai;
chai.use(chaiHttp);

const DEVICE_KEYS = [
  '_id',
  'friendly_name',
  '__v',
  'readings',
];

describe('Routes - devices', () => {
  describe('GET /devices', () => {
    describe('when the db is empty', () => {
      it('should return empty result', (done) => {
        chai.request(server)
          .get('/devices')
          .end((err, res) => {
            const { status, body: { success, result } } = res;
            expect(err).to.be.null;
            expect(success).to.be.true;
            expect(status).to.equal(200);
            expect(result).to.have.lengthOf(0);
            done();
          });
      });
    });

    describe('when has devices', () => {
      let newDevice = {};

      beforeEach(async () => {
        newDevice = await saveDevice(buildDevice());
      });

      it('should return the devices', (done) => {
        chai.request(server)
          .get('/devices')
          .end((err, res) => {
            const { status, body: { success, result } } = res;
            expect(err).to.be.null;
            expect(success).to.be.true;
            expect(status).to.equal(200);
            expect(result).to.have.lengthOf(1);
            expect(result[0]).to.have.all.keys(...DEVICE_KEYS);
            expect(result[0]).to.deep.include(newDevice.toObject());
            done();
          });
      });
    });
  });

  describe('POST /devices', () => {
    it('should return the device that was added', (done) => {
      const newDevice = buildDevice();
      chai.request(server)
        .post('/devices')
        .send(newDevice)
        .end((err, res) => {
          const { status, body: { success, result } } = res;
          expect(err).to.be.null;
          expect(status).to.equal(201);
          expect(success).to.be.true;
          expect(result).to.have.all.keys(...DEVICE_KEYS);
          expect(result).to.deep.include(newDevice);
          done();
        });
    });
  });
});
