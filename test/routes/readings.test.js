const chai = require('chai');
const chaiHttp = require('chai-http');
const { saveDevice } = require('../../src/repos/devices');
const { saveReading } = require('../../src/repos/readings');
const { isIncluded, buildDevice, buildReading } = require('../../src/utils');
const server = require('./../../index');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const READINGS_KEYS = [
  '_id',
  '__v',
  'device_id',
  'used_memory_percentage',
  'cpu_load',
  'disk_usage_percentage',
  'cpu_temperature',
  'datetime',
];

describe('Routes - readings', () => {
  describe('POST /devices/:deviceId/readings', () => {
    let newDevice = {};

    beforeEach(async () => {
      newDevice = await saveDevice(buildDevice());
    });
    it('should return the reading that was added', (done) => {
      const newReading = buildReading(newDevice._id);
      chai.request(server)
        .post(`/devices/${newDevice._id}/readings`)
        .send(newReading)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.body.success.should.eql(true);
          res.body.result.should.include.keys(...READINGS_KEYS);
          expect(isIncluded(res.body.result, newReading)).to.equal(true);
          done();
        });
    });
  });

  describe('GET /devices/:id/readings', () => {
    let newDevice = {};

    beforeEach(async () => {
      newDevice = await saveDevice(buildDevice());
    });

    describe('when the device has no readings', () => {
      it('should return empty result', (done) => {
        chai.request(server)
          .get(`/devices/${newDevice._id}/readings`)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.success.should.eql(true);
            res.body.result.length.should.eql(0);
            done();
          });
      });
    });

    describe('when the device has readings', () => {
      let newReading = {};

      beforeEach(async () => {
        newReading = await saveReading(newDevice._id, buildReading(newDevice._id));
      });

      it('should return the readings', (done) => {
        chai.request(server)
          .get(`/devices/${newDevice._id}/readings`)
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.success.should.eql(true);
            res.body.result.length.should.eql(1);
            res.body.result[0].should.include.keys(...READINGS_KEYS);
            expect(isIncluded(res.body.result[0], newReading.toObject())).to.equal(true);
            done();
          });
      });
    });
  });

  describe('GET /readings', () => {
    let newDevice = {};
    let newReading = {};

    beforeEach(async () => {
      newDevice = await saveDevice(buildDevice());
      newReading = await saveReading(newDevice._id, buildReading(newDevice._id));
    });

    describe('when provided with input that match', () => {
      it('should return the readings that match the input', (done) => {
        chai.request(server)
          .get('/readings?used_memory_percentage=1')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.success.should.eql(true);
            res.body.result.length.should.eql(1);
            res.body.result[0].should.include.keys(...READINGS_KEYS);
            expect(isIncluded(res.body.result[0], newReading.toObject())).to.equal(true);
            done();
          });
      });
    });

    describe('when provided with input that doesnt match', () => {
      it('should return an empty array', (done) => {
        chai.request(server)
          .get('/readings?used_memory_percentage=2')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.body.success.should.eql(true);
            res.body.result.length.should.eql(0);
            done();
          });
      });
    });
  });
});
