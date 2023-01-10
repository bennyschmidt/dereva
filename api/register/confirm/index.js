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
    type: 'Alias',
    name: address,
    auth: {
      type: 'email',
      value: username
    },
    date: new Date().toISOString()
  };

  const signup = await servicePost({
    service: drv,
    serviceName: '/',
    method: 'transaction',
    body: {
      apiKey: DEREVA_API_KEY,
      senderAddress: DEREVA_ADDRESS,
      recipientAddress: address,
      usdValue: 0,
      drvValue: `data:drv/${payload.type.toLowerCase()};json,${JSON.stringify(payload)}`,
      contract: 'DRV200'
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
