const btcExplorer = require('./btcExplorer');
const blockIoExplorer = require('./blockIoExplorer');
const etherscanIoExplorer = require('./etherscanIoExplorer');
let model = {
  btcExplorer,
  blockIoExplorer,
  etherscanIoExplorer
};
module.exports= model;