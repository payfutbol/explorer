const btcExplorer = require('./btcExplorer');
const blockIoExplorer = require('./blockIoExplorer');
const etherscanIoExplorer = require('./etherscanIoExplorer');
const sochainExplorer = require('./sochainExplorer');
const blockchairExplorer = require('./blockchairExplorer');
const blockcypherExplorer = require("./blockcypherExplorer");
module.exports= {
  btcExplorer:btcExplorer,
  blockIoExplorer:blockIoExplorer,
  etherscanIoExplorer:etherscanIoExplorer,
  sochainExplorer: sochainExplorer,
  blockchairExplorer: blockchairExplorer,
  blockcypherExplorer:blockcypherExplorer
};