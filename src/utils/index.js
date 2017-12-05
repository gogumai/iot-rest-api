const buildErrorBody = error => ({
  success: false,
  error: error.message || 'Sorry, an error has occurred.',
});

const buildOkBody = entity => ({
  success: true,
  result: entity,
});

module.exports = {
  buildOkBody,
  buildErrorBody,
};
