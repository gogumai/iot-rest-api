const chai = require('chai');
const chaiHttp = require('chai-http');
const { saveDevice } = require('../../src/repos/devices');
const { buildDevice } = require('../../src/utils/');
const server = require('./../../index');

const should = chai.should();
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
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.success.should.eql(true);
            res.body.result.length.should.eql(0);
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
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.success.should.eql(true);
            res.body.result.length.should.eql(1);
            res.body.result[0].should.include.keys(...DEVICE_KEYS);
            res.body.result[0].should.deep.include(newDevice.toObject());
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
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.success.should.eql(true);
          res.body.result.should.include.keys(DEVICE_KEYS);
          res.body.result.should.deep.include(newDevice);
          done();
        });
    });
  });
});
