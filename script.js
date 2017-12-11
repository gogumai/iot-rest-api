const request = require('request');
const si = require('systeminformation');

const URL_DEVICES = 'http://localhost:1337/devices';
const URL_READINGS = deviceId => `http://localhost:1337/devices/${deviceId}/readings`;

const makePost = (url, json, onError = () => {}, onResponse = () => {}) => {
  const postOptions = {
    url,
    headers: {
      'content-type': 'application/json',
    },
    json,
  };

  request.post(postOptions, (err, res, body) => {
    if (err) {
      console.log('Oops! Something went wrong', err);
      onError(err);
      return;
    }
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      console.log('Uploaded correctly!', JSON.stringify(body.result, null, 4));
      onResponse(body.result);
    }
  });
};

const addNewDevice = () => new Promise(async (resolve, reject) => {
  const user = await si.users();
  const data = { friendly_name: `${user[0].user}'s device'` };
  makePost(URL_DEVICES, data, reject, resolve);
});

const addNewReading = async (deviceId) => {
  try {
    const mem = await si.mem();
    const cl = await si.currentLoad();
    const fs = await si.fsSize();
    const temp = await si.cpuTemperature();
    const date = new Date();

    const data = {
      used_memory_percentage: (mem.used * 100) / mem.total,
      cpu_load: cl.currentload,
      disk_usage_percentage: fs[0].use,
      cpu_temperature: temp.main,
      datetime: date.getTime(),
    };

    makePost(URL_READINGS(deviceId), data);
  } catch (e) {
    console.log('Oops! Something went wrong', e);
  }
};

addNewDevice().then((device) => {
  setInterval(() => {
    addNewReading(device._id);
  }, 5000);
});
