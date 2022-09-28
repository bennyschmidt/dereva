const dotenv = require('dotenv');

dotenv.config();

const {
  DATA_URI,
  HOST,
  PORT,
  TOKEN_ADDRESS,
  TOKEN_NAME,
  TOKEN_LOGO_URL,
  TOKEN_DENOMINATION
} = process.env;

module.exports = {
  DATA_URI,
  HOST,
  PORT,
  TOKEN_ADDRESS,
  TOKEN_NAME,
  TOKEN_LOGO_URL,
  TOKEN_DENOMINATION,
  URL: HOST
};
