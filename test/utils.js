const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

mongoose.Promise = global.Promise;

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/iot_db_test', { useMongoClient: true });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});
