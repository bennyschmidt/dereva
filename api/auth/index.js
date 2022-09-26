/* eslint-disable no-magic-numbers */

const identity = require('identity-client');
const drv = require('drv-core');

const serviceEvents = require('../../events/service');

const {
  SERVER_ERROR,
  INVALID_TOKEN_ERROR,
  UNPROCESSABLE_REQUEST
} = require('../../errors');

module.exports = async ({
  username,
  password = false,
  token = ''
}) => {
  if (!username) return;

  let result, userData;

  if (token) {
    result = await identity.read({
      username,
      token
    });

    if (!result?.username) {
      return INVALID_TOKEN_ERROR;
    }

    userData = result?.appData?.dereva || {};
  } else {
    result = await identity.create({
      username,
      password,
      appSlug: 'dereva'
    });

    if (!result?.token) {
      return SERVER_ERROR;
    }

    // eslint-disable-next-line no-param-reassign
    token = result.token;

    result = await identity.read({
      username,
      token
    });

    userData = result?.appData?.dereva || {};
  }

  const user = {
    token,
    id: username,
    username,
    userData
  };

  if (!user.userData?.address) {
    return UNPROCESSABLE_REQUEST;
  }

  const priceResult = await serviceEvents.onServiceGet({
    service: drv,
    serviceName: '/',
    method: 'price'
  });

  if (!priceResult || priceResult.status !== 200) {
    return SERVER_ERROR;
  }

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      token: user.token,
      isOnline: user.isOnline,
      userData: {
        address: user.userData.address
      }
    },
    price: priceResult.price,
    price24hAgo: priceResult.price24hAgo,
  };
};
