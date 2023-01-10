/* eslint-disable no-magic-numbers */

const drv = require('drv-core');

const serviceGet = require('../../../service.get');
const getDrvUser = require('../../transaction/get-drv-user');

const {
  BAD_REQUEST,
  SERVER_ERROR,
  UNAUTHORIZED,
  USER_NOT_FOUND_ERROR
} = require('../../../errors');

module.exports = ({ getSession }) => async ({
  address,
  token = ''
}) => {
  if (!address || !token) {
    return BAD_REQUEST;
  }

  const session = getSession({ token });

  if (!session?.address || session.address !== address) {
    return UNAUTHORIZED;
  }

  const { auth, name } = await getDrvUser({ address });

  const emailAddress = auth?.value;

  if (!emailAddress) {
    return USER_NOT_FOUND_ERROR;
  }

  const user = {
    token,
    username: name,
    userData: {
      username: emailAddress,
      address: name
    }
  };

  const priceResult = await serviceGet({
    service: drv,
    serviceName: '/',
    method: 'price'
  });

  if (!priceResult || priceResult.status !== 200) {
    return SERVER_ERROR;
  }

  return {
    success: true,
    user,
    price: priceResult.price,
    price24hAgo: priceResult.price24hAgo,
  };
};
