const blockchairHelper = {

  output(cmd){
    let json;
    if(!cmd){
      json = {
        Cmdlist: {
          btc_chain: {
            symbol: ['btc', 'bch', 'ltc', 'bsv', 'doge', 'dash'],
            method:  ["getStats","getBlockRelated",'getBlocksRelated','getRawBlock','getBlocksFroSql','getTransaction','getTransactions','getRawTransaction','postPushTransaction','getTransactionForSql','getMempoolTransactions','getAddress','getAddresses','getXput','getAddressForSql','getOutputs','getMempoolOutputs','getUncle','getUncles','getBlockChangeState','getMempoolState','getMempoolState','getNodes']
          },
          eth_chain: {
            symbol: ['eth', 'erc20'],
            method: ['getStats','getBlockRelated','getBlocksRelated','getRawBlock','getBlocksFroSql','getTransaction','getTransactions','getRawTransaction','postPushTransaction','getTransactionForSql','getMempoolTransactions','getAddress','getEthUncles','getCalls','getMempoolState','getNodes']
          },
          erc20_chain: {
            symbol: ["erc20"],
            method: ['getErc20Stats','getErc20Stats','getErc20Address','getErc20Token','getErc20Transactions','getMempoolState','getNodes']
          },
          xrp_chain: {
            symbol: ['xrp'],
            method: ['getStats','getRawLedger','getRawAccount','getMempoolState','getNodes']
          },
          xlm_chain: {
            symbol: ['xlm'],
            method: ['getStats','getRawLedger','getRawAccount','getMempoolState','getNodes']
          },
          omni_chain: {
            symbol: ['omni'],
            method: ['getStats','getProperty','getPropertyList','getMempoolState','getNodes']
          },
          grs_chain: {
            symbol: ['grs'],
            method: ['getStats','getMempoolState','getNodes']
          },
          null_chain: {
            symbol: [null],
            method: ['getNode', 'getPremiumStats']
          }
        }
      };
    }else {
      json = require("./helper/" + cmd + ".json");
    }
    return {
      cmd: `${cmd}`,
      data: json
    }
  }
}
module.exports = blockchairHelper;