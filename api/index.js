const auth = require('./auth');
const info = require('./info');
const price = require('./price');
const register = require('./register');
const reset = require('./reset');
const transaction = require('./transaction');
const transactions = require('./transactions');

/*
 * Dereva Platform API
 * Web2 user endpoints
 */

module.exports = {
  auth,
  info,
  price,
  register,
  reset,
  transaction,
  transactions
};
