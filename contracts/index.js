module.exports = ({ drv, peers, serviceEvents }) => ({
  DRV100: require('drv100')({ drv, peers, serviceEvents }),
  DRV200: require('drv200')({ drv, peers, serviceEvents })
});
