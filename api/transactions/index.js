const drv = require('drv-core');

const serviceEvents = require('../../events/service');

module.exports = async () => (
  serviceEvents.onServiceGet({
    service: drv,
    serviceName: '/',
    method: 'transactions'
  })
);
