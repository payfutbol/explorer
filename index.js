const model = require('./lib');
module.exports = model;

/**
let btcExplorer = new model.btcExplorer('btc');
    btcExplorer.getUnTx().then(res=>{
      console.log(res);
    });

let blockIoExplorer = new model.blockIoExplorer('Your Api KEY');
    blockIoExplorer.getBalance().then(res=>{
      console.log(res);
    });

let etherscanIoExplorer = new model.etherscanIoExplorer('mainnet');
    etherscanIoExplorer.getSupply().then((res)=>{
      console.log(res);
    });
let sochainExplorer = new model.sochainExplorer('coin');
sochainExplorer.getInfo().then(res=>{
  'use strict'
  console.log(res);
let blockchairExplorer = new model.blockchairExplorer(null);
blockchairExplorer.setChain("btc");
let help = blockchairExplorer.getHelper("getErc20Token");

console.log(help);

let blockchairExplorer = new model.blockchairExplorer('');
blockchairExplorer.setChain("btc");
blockchairExplorer.getHelper().then(res=>{
  'use strict'
  console.log(JSON.stringify(res));
});
});
 **/
let blockchairExplorer = new model.blockchairExplorer('');
blockchairExplorer.setChain("btc");
blockchairExplorer.getMempoolState().then(res=>{
  console.log(JSON.stringify(res));
});