const buildErrorBody = error => ({
  success: false,
  error: error.message || 'Sorry, an error has occurred.',
});

const buildOkBody = entity => ({
  success: true,
  result: entity,
});

const isIncluded = (a, b) => {
  const bProps = Object.getOwnPropertyNames(b);

  for (let i = 0; i < bProps.length; i++) {
    const propName = bProps[i];

    const valueA = a[propName];
    const valueB = b[propName];

    if (valueA !== valueB) {
      if (valueA instanceof Date || valueB instanceof Date) {
        return !(Date.parse(valueA) !== Date.parse(valueB));
      }
    }
  }
  return true;
};

const buildReading = deviceId => ({
  device_id: deviceId,
  used_memory_percentage: 1,
  cpu_load: 1,
  disk_usage_percentage: 1,
  cpu_temperature: 1,
  datetime: new Date('2017-12-06T00:00:00.000Z'),
});

const buildDevice = () => ({
  friendly_name: 'Un device',
});

module.exports = {
  buildOkBody,
  buildErrorBody,
  isIncluded,
  buildDevice,
  buildReading,
};
