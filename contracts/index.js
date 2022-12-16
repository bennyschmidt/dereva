const drv = require('drv-core');

const serviceGet = require('../service.get');
const servicePost = require('../service.post');
const peers = require('../peers');

/*
 * A set of default contracts from the open
 * source community.
 */

const DEFAULT_CONTRACTS = [

  /*
   * DRV100
   * Fungible Record
   */

  'drv100',

  /*
   * DRV200
   * Non-Fungible Record
   */

  'drv200',

  /*
   * DRV201
   * Non-Fungible Record (unique)
   */

  'drv201',

  /*
   * Include other contracts here:
   *
   * 'drv000',
   * 'drv000A',
   * '...'
   */
];

/*
 * Manually require private contracts like this:
 *
 * module.exports = {
 *   ...defaultContracts,
 *
 *   MyContract: require('/contracts/path-to-contract')
 * };
 */

module.exports = Object.assign(
  ...DEFAULT_CONTRACTS.map(contract => ({
    [contract.toUpperCase()]: (
      require(contract)({
        drv,
        peers,
        serviceEvents: {
          onServiceGet: serviceGet,
          onServicePost: servicePost
        }
      })
    )
  }))
);
