const auth = require('./auth');
const authConfirm = require('./auth/confirm');
const file = require('./file');
const info = require('./info');
const price = require('./price');
const register = require('./register');
const registerConfirm = require('./register/confirm');
const transaction = require('./transaction');
const transactions = require('./transactions');

/**
 * In-memory session & registrant management
 * (for now)
 */

const Registrant = {};

const getRegistrant = ({ otp }) => Registrant[otp];

const addRegistrant = ({ otp, address, username }) => {
  Registrant[otp] = {
    address,
    username
  };
};

const removeRegistrant = ({ otp }) => {
  delete Registrant[otp];
};

const Session = {};

const getSession = ({ token }) => Session[token];

const addSession = ({ address, token }) => {
  Session[token] = {
    address
  };
};

// const removeSession = ({ token }) => {
//   delete Registrant[token];
// };

/**
 * Dereva Platform API
 * Web2 user endpoints
 */

module.exports = {
  auth: auth({ getSession, addSession }),
  authConfirm: authConfirm({ getSession }),
  file,
  info,
  price,
  register: register({ getRegistrant, addRegistrant }),
  registerConfirm: registerConfirm({ getRegistrant, removeRegistrant }),
  transaction,
  transactions
};
