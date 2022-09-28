const dotenv = require('dotenv');

dotenv.config();

const {
  API_URL,
  DATA_URI,
  HOST,
  PORT,
  TOKEN_ADDRESS,
  TOKEN_NAME,
  TOKEN_LOGO_URL,
  TOKEN_DENOMINATION
} = process.env;

module.exports = {
  API_URL,
  DATA_URI,
  HOST,
  PORT,
  TOKEN_ADDRESS,
  TOKEN_NAME,
  TOKEN_LOGO_URL,
  TOKEN_DENOMINATION,
  URL: HOST
};
