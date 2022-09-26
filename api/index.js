const auth = require('./auth');
const register = require('./register');
const reset = require('./reset');
const transaction = require('./transaction');

/*
 * Dereva Platform API
 * Web2 user endpoints
 */

module.exports = {
  auth,
  register,
  reset,
  transaction
};
