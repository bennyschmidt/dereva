const {
  TOKEN_ADDRESS,
  TOKEN_NAME,
  TOKEN_LOGO_URL,
  TOKEN_DENOMINATION
} = require('../../constants');

const peers = require('../../peers');

module.exports = () => ({
  address: TOKEN_ADDRESS,
  name: TOKEN_NAME,
  logo: TOKEN_LOGO_URL,
  denomination: TOKEN_DENOMINATION,
  peers
});
