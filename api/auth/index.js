/* eslint-disable no-magic-numbers */

const drv = require('drv-core');
const { generateUUID } = require('cryptography-utilities');

const { HOST } = require('../../constants');
const { BAD_REQUEST, USER_NOT_FOUND_ERROR } = require('../../errors');
const { sendEmail } = require('../../mailer');
const serviceGet = require('../../service.get');
const getDrvUser = require('../transaction/get-drv-user');

module.exports = ({ getSession, addSession }) => async ({
  address,
  token = ''
}) => {
  if (!address) {
    return BAD_REQUEST;
  }

  const session = getSession({ token });

  if (session?.address === address) {
    const result = await getDrvUser({ address });

    const { username } = result;

    if (!username) {
      return USER_NOT_FOUND_ERROR;
    }

    const user = {
      token,
      username,
      userData: {
        username,
        address: result.unique
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
  }

  const { email } = await getDrvUser({ address });

  if (!email) {
    return USER_NOT_FOUND_ERROR;
  }

  // eslint-disable-next-line no-param-reassign
  token = generateUUID();

  addSession({
    token,
    address
  });

  await sendEmail({
    to: email,
    subject: 'Confirm your login on Dereva.',
    // eslint-disable-next-line max-len
    html: `<a href="${HOST}/?address=${address}&token=${token}" target="_blank">Authorize Login</a><br />If you do not authorize this login, <strong>do not</strong> click the link.`
  });

  return {
    success: true,
    message: 'Authorization sent (check your email).'
  };
};
