/* eslint-disable no-magic-numbers */

const {
  SERVER_ERROR,
  USER_NOT_FOUND_ERROR,
  INSUFFICIENT_FUNDS,
  UNAUTHORIZED
} = require('../../errors');

const Contracts = require('../../contracts');

const getDrvTokenBalance = require('./get-drv-token-balance');
const getDrvUser = require('./get-drv-user');

module.exports = async ({
  apiKey = false,
  token = '',
  senderAddress = '',
  recipientAddress = '',
  usdValue = 0,
  drvValue = 0,
  contract = 'DRV100'
}) => {
  if (!token && !apiKey) {
    return UNAUTHORIZED;
  }

  const user = await getDrvUser({
    address: senderAddress
  });

  if (!user?.name) {
    return USER_NOT_FOUND_ERROR;
  }

  const isFungible = contract === 'DRV100';

  if (isFungible) {
    const senderTokenDrvBalance = await getDrvTokenBalance({
      address: senderAddress
    });

    if (senderTokenDrvBalance < drvValue) {
      return INSUFFICIENT_FUNDS;
    }
  }

  const transactionResult = isFungible
    ? await Contracts.DRV100({
      senderAddress,
      recipientAddress,
      usdValue,
      drvValue,
      isDrv: true
    })
    : await Contracts[contract]({
      senderAddress,
      recipientAddress,
      usdValue,
      drvValue
    });

  if (!transactionResult) {
    return SERVER_ERROR;
  }

  if (isFungible) {
    console.log(
      // eslint-disable-next-line max-len
      `<Dereva> ${senderAddress} sent ${drvValue.toFixed(5)} DRV to ${recipientAddress}.`
    );
  } else {
    console.log(
      // eslint-disable-next-line max-len
      `<Dereva> ${senderAddress} transferred a record to ${senderAddress === recipientAddress ? 'the blockchain' : recipientAddress}.`
    );
  }

  return {
    success: true,
    user: {
      token,
      username: user.name,
      userData: {
        username: user.auth.value,
        address: senderAddress
      }
    },
    price: transactionResult.price,
    price24hAgo: transactionResult.price24hAgo
  };
};
