/* eslint-disable no-magic-numbers */

const drv = require('drv-core');

const {
  DEREVA_API_KEY
} = require('../../../constants');

const {
  UNAUTHORIZED,
  SERVER_ERROR
} = require('../../../errors');

const servicePost = require('../../../service.post');

module.exports = ({ getRegistrant, removeRegistrant }) => async ({ otp }) => {
  const { username, address } = getRegistrant({ otp });

  if (!username || !address) {
    return UNAUTHORIZED;
  }

  const payload = {
    type: 'User',
    username,
    email: username,
    unique: address,
    date: new Date()
      .toISOString()
      .replace('T', ' ')
      .substr(0, 19)
      .replace(/-/g, '/')
  };

  const signup = await servicePost({
    service: drv,
    serviceName: '/',
    method: 'transaction',
    body: {
      apiKey: DEREVA_API_KEY,
      senderAddress: address,
      recipientAddress: address,
      usdValue: 0,
      drvValue: `data:drv/${payload.type.toLowerCase()};json,${JSON.stringify(payload)}`,
      contract
    }
  });

  if (!signup?.success) {
    return SERVER_ERROR;
  }

  removeRegistrant({ otp });

  return {
    success: true,
    message: 'Registration successful! Sharing with peers...'
  };
};
