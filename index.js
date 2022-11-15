const { http } = require('node-service-library');

const {
  auth,
  file,
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
    file,
    register,
    reset,
    transaction
  },
  PUT: {},
  DELETE: {}
});
