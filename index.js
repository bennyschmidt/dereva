const { http } = require('node-service-library');

const {
  auth,
  info,
  price,
  register,
  reset,
  transaction,
  transactions
} = require('./api');

module.exports = http({
  GET: {
    price,
    transactions,
    info
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
