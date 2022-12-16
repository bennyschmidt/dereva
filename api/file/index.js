const drv = require('drv-core');

const servicePost = require('../../service.post');

module.exports = async ({ mediaAddress, mediaType }) => (
  servicePost({
    service: drv,
    serviceName: 'fs',
    method: 'search',
    body: {
      mediaAddress,
      mediaType
    }
  })
);
