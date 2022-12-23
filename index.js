const { http } = require('node-service-library');

const {
  auth,
  authConfirm,
  file,
  info,
  price,
  register,
  registerConfirm,
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
    'confirm-auth': authConfirm,
    file,
    register,
    'confirm-register': registerConfirm,
    transaction
  },
  PUT: {},
  DELETE: {}
});
