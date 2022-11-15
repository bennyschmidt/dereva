const drv = require('drv-core');

const serviceEvents = require('../../events/service');

module.exports = async ({ mediaAddress, mediaType }) => (
  serviceEvents.onServicePost({
    service: drv,
    serviceName: 'fs',
    method: 'search',
    body: {
      mediaAddress,
      mediaType
    }
  })
);
