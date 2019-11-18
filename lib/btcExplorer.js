const config = require('../config/index');
const axios = require('axios');
const notice = require('./notice');
class btcExplorer {
  /**
   *
   * @param coin support coinlist btc|ltc|eth|bch
   */
  constructor (coin) {
    this.api = axios;
    this.api.defaults.baseURL = config.btcURL[coin.toLowerCase()];
    this.api.defaults.headers.common['Content-Type'] = "application/json";
    this.api.create();
    console.log("init api", this.api.defaults.baseURL)
  }
  /**
   * Query transaction information according to block height
   * @param block String Support mutiple params `,` split
   * @returns {Promise.<void>}
   */
  async getBlock(block){
    try {
      var response = await this.api.get("/block/"+ block)
    } catch (e) {
      throw notice.createErrorString('getBlock', e)
    }
    return response.data;
  }

  /**
   * use date get blockInfo
   * @param ymd YYYY-MM-DD
   * @returns {Promise<T>}
   */
  async getDateBlock(ymd){
    try {
      var response = await this.api.get("/block/date/"+ ymd)
    } catch (e) {
      throw notice.createErrorString('getDateBlock', e)
    }
    return response.data;
  }

  /**
   * from block get TxInfo
   * @param block block height|latest
   * @param page default 1
   * @param pagesize default 20
   * @returns {Promise<T>}
   */
  async getBlockTx(block, page, pagesize){
    page = page ? page : 1;
    pagesize = pagesize ? pagesize: 20;
    try {
      var response = await this.api.get("/block/"+ block + "/tx?page="+page+ "&pagesize="+pagesize)
    } catch (e) {
      throw notice.createErrorString('getBlockTx', e)
    }
    return response.data;
  }
  /**
   * Get transaction
   * @param verbose 1 include transaction info 2 include transaction info|output|input|amount 3 include 2 |input| input script
   * @returns {Promise.<void>}
   */
  async getTransaction(verbose){
    try {
      var response = await this.api.get('/block/latest/tx?verbose='+ verbose)
    } catch (e) {
      throw notice.createErrorString('getTransaction', e)
    }
    return response.data;
  }

  /**
   * Get unconfirmed txhash
   * @returns {Promise.<void>}
   */
  async getUntx(){
    try{
      var response = await this.api.get('/tx/unconfirmed')
    }catch(e){
      throw notice.createErrorString('getUntx', e)
    }
    return response.data;
  }

  /**
   * Get unconfirmed txInfo
   * @returns {Promise<T>}
   */
  async getUnTxinfo(){
    try{
      var response = await this.api.get('/tx/unconfirmed/summary')
    }catch(e){
      throw notice.createErrorString('getUnTxinfo', e)
    }
    return response.data;
  }

  /**
   * Get Address assets info
   * @param address support mutiple address `,` split
   * @returns {Promise<T>}
   */
  async getAddress(address){
    try {
      var response = await this.api.get('/address/'+ address)
    } catch (e) {
      throw notice.createErrorString('getAddress', e)
    }
    return response.data;
  }

  /**
   * from address get txinfo
   * @param address
   * @param page  default: 1
   * @param pagesize default: 20
   * @returns {Promise<T>}
   */
  async getAddressTx(address, page, pagesize){
    page = page ? page : 1;
    pagesize = pagesize ? pagesize : 20;
    try {
      var response = await this.api.get('/address/'+ address+"/tx?page="+page+"&pagesize="+pagesize)
    } catch (e) {
      throw notice.createErrorString('getAddressTx', e)
    }
    return response.data;
  }
  /**
   * Get unspent address list.
   * @param address
   * @returns {Promise<T>}
   */
  async getUnspent(address){
    try {
      var response = await this.api.get('/address/'+address + '/unspent')
    } catch(e) {
      throw notice.createErrorString('getUnspent', e)
    }
    return response.data;
  }

  /**
   * Get transaction info from hash
   * @param hash txid,support mutiple txid `,` split
   * @returns {Promise<T>}
   */
  async getTx(hash){
    try {
      var response = await this.api.get('/tx/'+ hash)
    } catch (e) {
      throw notice.createErrorString('getTx', e)
    }
    return response.data;
  }

  /**
   * get unconfirmed txhash
   * @returns {Promise<T>}
   */
  async getUnTx(){
    try {
      var response = await this.api.get('/tx/unconfirmed')
    } catch (e) {
      throw notice.createErrorString('getUnTx', e)
    }
    return response.data;
  }

  /**
   * get unconfirmed transaction info
   * @returns {Promise<T>}
   */
  async getUnTxInfo(){
    try {
      var response = await this.api.get('/tx/unconfirmed/summary')
    } catch (e) {
      throw notice.createErrorString('getUnTxInfo', e)
    }
    return response.data;
  }
  
}

module.exports = btcExplorer;