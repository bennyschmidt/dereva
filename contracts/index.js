/*
 *
 * Service:Contracts
 * (default)
 *
 */

(() => {

  /*
  Exports
  */

  module.exports = ({ drv, peers, serviceEvents }) => ({
    Record: require('./contracts.record')({ drv, peers, serviceEvents }),
    NonFungibleRecord: require('./contracts.nonFungibleRecord')({ drv, peers, serviceEvents })
  });
})();
