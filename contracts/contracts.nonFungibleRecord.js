/* eslint-disable no-magic-numbers */

/*
 *
 * Service:Contracts
 * Non-Fungible Record
 *
 */

const { capitalizeSlug, generateUUID } = require('../utilities');

module.exports = ({ drv, peers, serviceEvents }) => {
  const Record = require('./contracts.record')({ drv, peers, serviceEvents });

  const NonFungibleRecord = async ({
    token,
    sender,
    recipient,
    recipientAddress,
    usdValue,
    drvValue = 'data:drv/text;text,Hello world!'
  }) => {
    if (drvValue.substring(0, 9) === 'data:drv/') {
      const encoding = drvValue === 'text' ? 'text' : 'json';
      const drvContent = drvValue.split(`;${encoding}`);
      const contentType = drvContent[0].replace(/data:drv\//, '');

      // TODO: Validate and cache file
      // const content = encoding === 'text'
      //   ? drvValue.split(/data\:drv\/.*;text,/)
      //   : drvValue.split(/data\:drv\/.*;json,/);

      // eslint-disable-next-line no-param-reassign
      drvValue = `::magnet=?xt=urn:drv/${contentType}:${generateUUID()}&dn=${capitalizeSlug(contentType)}`;
    }

    return Record({
      token,
      sender,
      recipient,
      recipientAddress,
      contract: 'nonFungibleRecord',
      usdValue,
      drvValue,
      isDrv: true
    });
  };

  return NonFungibleRecord;
};
