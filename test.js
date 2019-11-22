const model = require('./index');
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
  });
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
let blockchairExplorer = new model.blockchairExplorer('');
blockchairExplorer.setChain("btc");
let cmd = process.argv[2] ? process.argv[2] : 'getHelper';
let params = process.argv[3] ? process.argv[3] : "";
eval(`blockchairExplorer.${cmd}('${params}')`).then(res=>{
  console.log(JSON.stringify(res));
});

let blockchairExplorer = new model.blockchairExplorer('');
let chain =  process.argv[2] ? process.argv[2] : 'btc';
blockchairExplorer.setChain(chain);
let cmd = process.argv[3] ? process.argv[3] : 'getHelper';
let params = process.argv[4] ? process.argv[4] : "";
eval(`blockchairExplorer.${cmd}('${params}')`).then(res=>{
  console.log(JSON.stringify(res));
});
**/

// let blockcypherExplorer = new model.blockcypherExplorer('');
// let chain =  process.argv[2] ? process.argv[2] : 'btc';
// blockcypherExplorer.setChain(chain, "main");
// let cmd = process.argv[3] ? process.argv[3] : 'getHelper';
// let params = process.argv[4] ? process.argv[4] : "";
// eval(`blockcypherExplorer.${cmd}('${params}')`).then(res=>{
//   console.log(JSON.stringify(res));
// });


let sochainExplorer = new model.sochainExplorer('btc');
sochainExplorer.getInfo().then(res=>{
  console.log(res, "getInfo");
});