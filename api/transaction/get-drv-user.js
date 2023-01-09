/* eslint-disable no-magic-numbers */

const drv = require('drv-core');

const serviceGet = require('../../service.get');
const servicePost = require('../../service.post');

module.exports = async ({ address }) => {
  let result = {};

  const transactionsResult = await serviceGet({
    service: drv,
    serviceName: '/',
    method: 'transactions'
  });

  if (!transactionsResult?.success) {
    return false;
  }

  const transactions = transactionsResult.body;

  await Promise.all(
    transactions
      .filter(({ contract }) => contract === 'DRV200')
      .map(async transaction => {
        if (!transaction.drvValue.match(/drv\/alias/)) return;

        const mediaAddress = transaction.drvValue
          .replace('::magnet:?xt=urn:drv/alias:', '')
          .replace('&dn=Alias', '');

        const response = await servicePost({
          service: drv,
          serviceName: 'fs',
          method: 'search',
          body: {
            mediaAddress,
            mediaType: 'json'
          }
        });

        if (!response?.success) return;

        const body = JSON.parse(response.data);

        if (body.name === address) {
          result = body;
        }
      })
  );

  return result;
};
