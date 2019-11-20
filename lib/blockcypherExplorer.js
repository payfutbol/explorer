const config = require('../config/index');
const axios = require('axios');
const notice = require('./notice');
const helper = require("./blockcypherHelper");
const sprintf = require('sprintf');

/**
 * Support crypto currency BTC ETH BSV ripple dash steller bitcoincash dogecoin litecoin groestlicoin omni
 */
class blockcypherExplorer{
  constructor (apikey) {
    this.api = axios;
    this.api.defaults.baseURL = config.blockcypherURL.baseURL;
    this.api.defaults.headers.common['Content-Type'] = "application/json";
    this.api.create();
    this.symbol = "";
    // console.log("init api", this.api.defaults.baseURL)
    this.apikey = apikey;
  }

  /**
   * Get Support help content
   * @param cmd
   * @returns {Object}
   */
  async getHelper(cmd) {
    if(!cmd){
      cmd = '';
    }
    return await helper.output(cmd);
  }

  /**
   *
   * @param symbol
   * @param network
   */
  setChain(symbol, network) {
    if(!symbol){
      throw notice.createErrorString("setChain", "You must be support  symbol, It's can't be null");
    }
    this.symbol = symbol.toLowerCase();
    this.api.defaults.baseURL = sprintf(config.blockcypherURL.baseURL, symbol.toLowerCase(), network);
  }

  /**
   *
   * @param hashOrHeight
   * @returns {Promise.<void>}
   */
  async getBlock(hashOrHeight){
    if(!hashOrHeight){
      throw notice.createErrorString("getBlock", "You must be support hash or height. It's can't be null");
    }
    try{
      var response = await this.api.get("/blocks/"+ hashOrHeight+`?token=${this.apikey}`);
    }catch(e){
      throw notice.createErrorString("getBlock", e)
    }
    return response.data;
  }

  /**
   *
   * @param addr
   * @param omnimode
   * @returns {Promise.<{status: number, msg: string}>}
   */
  async getBalance(addr, omnimode){
    if(!addr){
      throw notice.createErrorString("You need support address");
    }
    omnimode = omnimode ? omnimode : false;
    try{
      var response = await this.api.get("/addrs/"+addr+"/balance?token="+this.apikey+"*omitWalletAddresses="+omnimode);
    }catch(e){
      throw notice.createErrorString("getBalance", e);
    }
    return response.data;
  }

  /**
   *
   * @param addr
   * @param flag
   * @returns {Promise.<void>}
   */
  async getAddress(addr, flag){
    if(!addr){
      throw notice.createErrorString("getAddress", "You need support address");
    }
    addr = typeof addr ==="object" ? addr.join(",") : addr;
    if(!flag){
      flag = {
        unspentOnly: false,//include UTXO
        includeScript: false,//include input and outputs
        includeConfidence: false,//unconfirmations abort
        before: 0, //before blockheight
        after: 0,//after blockheight
        limit: 200,//TxRefs limit min 200 max 2000
        confirmations: 5,//callback number txrefs
        confidence: 99,
        omitWalletAddresses: false //omnimode
      };
    }

    let json = "";
    for(var i in flag){
      json+= `${i}=${flag[i]}&`;
    }
    json = json.substr(0, json.length-1);
    try{
      var response = await this.api.get("/addrs/"+addr+ +`?token=${this.apikey}`+"&"+ json);
    }catch(e){
      console.log(e);
      throw notice.createErrorString('getAddress', e);
    }
    return response.data;
  }


  /**
   *
   * @param addr
   * @param flag
   * @returns {Promise.<void>}
   */
  async getAddressFull(addr, flag){
    if(!addr){
      throw notice.createErrorString("getAddressFull", "You need support address");
    }
    addr = typeof addr ==="object" ? addr.join(",") : addr;
    if(!flag){
      flag = {
        unspentOnly: false,//include UTXO
        includeScript: false,//include input and outputs
        includeConfidence: false,//unconfirmations abort
        before: 0, //before blockheight
        after: 0,//after blockheight
        limit: 200,//TxRefs limit min 200 max 2000
        confirmations: 5,//callback number txrefs
        confidence: 99,
        omitWalletAddresses: false //omnimode
      };
    }
    let json = "";
    for(var i in flag){
      json+= `${i}=${flag[i]}&`;
    }
    json = json.substr(0, json.length-1);
    try{
      var response = await this.api.get("/addrs/"+addr+ "/full"+`?token=${this.apikey}&`+ json);
    }catch(e){
      console.log(e);
      throw notice.createErrorString('getAddressFull', e);
    }
    return response.data;
  }

  /**
   *
   * @param hash
   * @param flag
   * @returns {Promise.<void>}
   */
  async getTx(hash, flag){
    if(!hash){
      throw notice.createErrorString("getTx", "You need support hash");
    }
    if(!flag){
      flag = {
        limit: 20,
        instart: 0,//input tx index
        outstart: 0,//output tx index
        includeHex: false,
        includeCondfidence: false
      };
    }
    let json = "";
    for(var i in flag){
      json+= `${i}=${flag[i]}&`;
    }
    json = json.substr(0, json.length-1);

    try{
      var response = await this.api.get("/txs/"+hash+`?token=${this.apikey}&`+ json);
    }catch(e){
      console.log(e);
      throw notice.createErrorString("getTx", e);
    }
    return response.data;
  }

  /**
   * unconfirmations txs list
   * @returns {Promise.<void>}
   */
  async getTxs(){
    try{
      var response = await this.api.get("/txs"+`?token=${this.apikey}`);
    }catch(e){
      throw notice.createErrorString('getTxs', e)
    }
    return response.data;
  }

}

module.exports = blockcypherExplorer;