const drv = require('drv-core');

const serviceGet = require('../../service.get');

module.exports = async () => (
  serviceGet({
    service: drv,
    serviceName: '/',
    method: 'transactions'
  })
);
