/* eslint-disable no-magic-numbers */

/*
 *
 * Service
 * (default)
 *
 */

(() => {

  /*
  Dependencies
  */

  const { http } = require('node-service-client');
  const drv = require('drv-core');

  const identity = require('identity-client');
  const fern = require('fern-client');

  const {
    SERVER_ERROR,
    BAD_REQUEST,
    INVALID_TOKEN_ERROR,
    USER_NOT_FOUND_ERROR,
    INSUFFICIENT_FUNDS,
    UNAVAILABLE_TOKEN,
    UNPROCESSABLE_REQUEST
  } = require('./errors');

  const {
    HOST,
    TOKEN_ADDRESS,
    TOKEN_NAME,
    TOKEN_LOGO_URL,
    TOKEN_DENOMINATION
  } = require('./constants');

  /*
  Backend
  */

  fern.setURL(HOST);

  const userModel = require('./model/model.user')();
  const serviceEvents = require('./events/events.service')();
  const peers = require('./peers');
  const { generateUUID } = require('./utilities');

  const { Record, NonFungibleRecord } = require('./contracts')({
    drv,
    peers,
    serviceEvents
  });

  /*
  Private
  */

  const getDrvTokenBalance = async ({ address }) => {
    const transactionsResult = await serviceEvents.onServiceGet({
      service: drv,
      serviceName: 'dereva',
      method: 'transactions'
    });

    if (!transactionsResult?.success) {
      return -1;
    }

    const transactions = transactionsResult.body;

    let tokenDebit = transactions
      .filter(block => (
        typeof (block.drvValue) === 'number' &&
        block.senderAddress === address
      ))
      .map(({ drvValue }) => drvValue * TOKEN_DENOMINATION);

    if (tokenDebit?.length > 1) {
      tokenDebit = tokenDebit.reduce((a, b) => a + b);
    }

    let tokenCredit = transactions
      .filter(block => (
        typeof (block.drvValue) === 'number' &&
        block.recipientAddress === address
      ))
      .map(({ drvValue }) => drvValue * TOKEN_DENOMINATION);

    if (tokenCredit?.length > 1) {
      tokenCredit = tokenCredit.reduce((a, b) => a + b);
    }

    return tokenCredit - tokenDebit;
  };

  /*
  Service (HTTP)
  */

  module.exports = http({
    GET: {
      price: async () => await serviceEvents.onServiceGet({
        service: drv,
        serviceName: '/',
        method: 'price'
      }),
      transactions: async () => await serviceEvents.onServiceGet({
        service: drv,
        serviceName: '/',
        method: 'transactions'
      }),
      info: () => ({
        address: TOKEN_ADDRESS,
        name: TOKEN_NAME,
        logo: TOKEN_LOGO_URL,
        denomination: TOKEN_DENOMINATION,
        peers
      })
    },
    POST: {
      auth: async ({
        username,
        password = false,
        token = ''
      }) => {
        if (!username) return;

        let result, userData;

        if (token) {
          result = await userModel.getUser({ token });

          if (!result?.username) {
            return INVALID_TOKEN_ERROR;
          }

          userData = result.userData || {};
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

        const user = await userModel.createUser({
          token,
          id: username,
          username,
          userData
        });

        if (!user.userData?.address) {
          return UNPROCESSABLE_REQUEST;
        }

        const priceResult = await serviceEvents.onServiceGet({
          service: drv,
          serviceName: 'drv',
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
      },
      register: async ({ username }) => {
        const signup = await identity.register({
          username,
          userData: {
            address: generateUUID()
          },
          appSlug: 'dereva'
        });

        if (!signup?.success) {
          return BAD_REQUEST;
        }

        return {
          success: true
        };
      },
      reset: async ({ username }) => {
        const reset = await identity.resetPassword({
          username,
          appSlug: 'dereva'
        });

        if (!reset?.success) {
          return BAD_REQUEST;
        }

        return {
          success: true
        };
      },
      cards: fern.cards,
      transaction: async ({
        token,
        username,
        recipient,
        recipientAddress,
        usdValue,
        drvValue,
        cardNumber = false,
        squareToken = false,
        contract = 'record'
      }) => {
        if (!username || !token) return;

        const senderResult = await identity.read({ username, token });
        const recipientResult = await identity.read({ username: recipient, token });

        let senderResponse;

        if (senderResult?.username) {
          senderResponse = {
            username: senderResult.username,
            userData: senderResult?.appData?.dereva
          };
        }

        let recipientResponse;

        if (recipientResult?.username) {
          recipientResponse = {
            username: recipientResult.username,
            userData: recipientResult?.appData?.dereva
          };
        }

        if (!senderResponse?.username || !recipientResponse?.username) {
          return USER_NOT_FOUND_ERROR;
        }

        const isDrv = !squareToken && !cardNumber;
        const isFungible = contract === 'record';

        if (isDrv) {
          if (isFungible) {
            const senderTokenDrvBalance = await getDrvTokenBalance({
              address: senderResponse.userData.address
            });

            if (senderTokenDrvBalance < drvValue) {
              return INSUFFICIENT_FUNDS;
            }
          }
        } else {
          if (isFungible) {
            const recipientTokenDrvBalance = await getDrvTokenBalance({
              address: recipientAddress
            });

            if (recipientTokenDrvBalance < drvValue) {
              return UNAVAILABLE_TOKEN;
            }
          }

          const paymentResult = await fern.transaction({
            username: senderResponse.username,
            token,
            recipient: recipientResponse.username,
            usdValue,
            cardNumber,
            squareToken
          });

          if (!paymentResult?.success) {
            return SERVER_ERROR;
          }
        }

        const transactionResult = isFungible
          ? await Record({
            token,
            sender: senderResponse,
            recipient: recipientResponse,
            recipientAddress,
            usdValue,
            drvValue,
            isDrv
          })
          : await NonFungibleRecord({
            token,
            sender: senderResponse,
            recipient: recipientResponse,
            recipientAddress,
            usdValue,
            drvValue
          });

        if (!transactionResult) {
          return SERVER_ERROR;
        }

        user = await userModel.getUser({ token });

        if (isFungible) {
          console.log(
            // eslint-disable-next-line max-len
            `<Dereva> ${senderResponse.username} sent ${recipientResponse.username} ${isDrv ? `${drvValue.toFixed(2)} DRV` : `${usdValue.toFixed(2)} USD`}.`
          );
        } else {
          console.log(
            // eslint-disable-next-line max-len
            `<Dereva> ${senderResponse.username} transferred a record to ${senderResponse.username === recipientResponse.username ? 'the blockchain' : recipientResponse.username}.`
          );
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
          price: transactionResult.price,
          price24hAgo: transactionResult.price24hAgo,
          marketCap: transactionResult.marketCap
        };
      }
    },
    PUT: {
      card: fern.save
    },
    DELETE: {}
  });
})();
