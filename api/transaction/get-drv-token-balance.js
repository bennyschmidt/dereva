/* eslint-disable no-magic-numbers */

const drv = require('drv-core');

const { TOKEN_DENOMINATION } = require('../../constants');

const serviceGet = require('../../service.get');

module.exports = async ({ address }) => {
  const transactionsResult = await serviceGet({
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
