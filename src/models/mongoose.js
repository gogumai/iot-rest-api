const mongoose = require('mongoose');

const handleErr = (err) => {
  if (err) {
    console.log('connect to %s error: ', err.message);
  }
};

mongoose.connect('mongodb://localhost:27017/iot_db', { useMongoClient: true }, handleErr);

mongoose.Promise = global.Promise;

module.exports = mongoose;
