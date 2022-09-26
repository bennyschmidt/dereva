const { http } = require('node-service-library');
const drv = require('drv-core');

const {
  auth,
  register,
  reset,
  transaction
} = require('./api');

const {
  TOKEN_ADDRESS,
  TOKEN_NAME,
  TOKEN_LOGO_URL,
  TOKEN_DENOMINATION
} = require('./constants');

const serviceEvents = require('./events/service');
const peers = require('./peers');

module.exports = http({
  GET: {
    price: async () => await serviceEvents.onServiceGet({
      service: drv,
      serviceName: '/',
      method: 'price'
    }),
    transactions: async () => await serviceEvents.onServiceGet({
      service: drv,
      serviceName: '/',
      method: 'transactions'
    }),
    info: () => ({
      address: TOKEN_ADDRESS,
      name: TOKEN_NAME,
      logo: TOKEN_LOGO_URL,
      denomination: TOKEN_DENOMINATION,
      peers
    })
  },
  POST: {
    auth,
    register,
    reset,
    transaction
  },
  PUT: {},
  DELETE: {}
});
