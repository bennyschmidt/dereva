/* eslint-disable no-magic-numbers */

const drv = require('drv-core');

const { TOKEN_DENOMINATION } = require('../../constants');

const serviceGet = require('../../service.get');

module.exports = async ({ address }) => {
  const transactionsResult = await serviceGet({
    service: drv,
    serviceName: '/',
    method: 'transactions'
  });

  if (!transactionsResult?.success) {
    return -1;
  }

  const transactions = transactionsResult
    .body
    .body
    .filter(({ contract }) =>
      contract === 'DRV100'
    );

  let tokenDebit = transactions
    .filter(block => block.senderAddress === address)
    .map(({ drvValue }) => drvValue * TOKEN_DENOMINATION);

  if (tokenDebit?.length > 1) {
    tokenDebit = tokenDebit.reduce((a, b) => a + b);
  }

  let tokenCredit = transactions
    .filter(block => block.recipientAddress === address)
    .map(({ drvValue }) => drvValue * TOKEN_DENOMINATION);

  if (tokenCredit?.length > 1) {
    tokenCredit = tokenCredit.reduce((a, b) => a + b);
  }

  return tokenCredit - tokenDebit;
};
