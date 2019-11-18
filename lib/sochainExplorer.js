const config = require('../config/index');
const notice = require('./notice');
const request = require("../config/api");

class sochainExplorer {
  /**
   *
   * @param coin support coinlist btc|ltc|eth|bch
   */
  constructor (coin) {
    this.api = request(config.sochainURL.baseURL);
    if(!coin){
      throw notice.createErrorString("constructor","symbol not found");
    }
    this.symbol = coin.toUpperCase();
    console.log("init api", this.api.defaults.baseURL)
  }

  /**
   *
   * @param address support bitcoin litecoin dogecoin
   * @param confirm minmum confirmations
   * @returns {Promise.<void>}
   */
  async getAddressBalance(address, confirm){
    try {
      var response = await this.api.get(`/get_address_balance/${this.symbol}/${address}/${confirm}`)
    } catch (e) {
      throw notice.createErrorString('getAddressBalance', e)
    }
    return response.data;
  }

  /**
   *
   * @param address support dogecoin bitcoin litecoin
   * @returns {Promise.<void>}
   */
  async getAddressReceived(address){
    try {
      var response = await this.api.get(`/get_address_received/${this.symbol}/${address}`)
    } catch (e) {
      throw notice.createErrorString('getAddressReceived', e)
    }
    return response.data;
  }

  /**
   *
   * @param address support bitcoin litecoin dogecoin
   * @param txid  after txid
   * @returns {Promise.<void>}
   */
  async getUnspentTx(address, txid){
    try {
      var response = await this.api.get(`/get_tx_unspent/${this.symbol}/${address}/${txid}`)
    } catch (e) {
      throw notice.createErrorString('getUnspentTx', e)
    }
    return response.data;
  }

  /**
   *
   * @param address support bitcoin litecoin dogecoin
   * @param txid
   * @returns {Promise.<void>}
   */
  async getTxReceived(address, txid){
    try {
      var response = await this.api.get(`/get_tx_received/${this.symbol}/${address}/${txid}`)
    } catch (e) {
      throw notice.createErrorString('getTxReceived', e)
    }
    return response.data;
  }

  /**
   *
   * @param address support bitcoin litecoin doge
   * @param txid
   * @returns {Promise.<void>}
   */
  async getTxSpent(address, txid){
    try {
      var response = await this.api.get(`/get_tx_spent/${this.symbol}/${address}/${txid}`)
    } catch (e) {
      throw notice.createErrorString('getTxSpent', e)
    }
    return response.data;
  }

  /**
   * verify address valid
   * @param address support bitcoin Dash  ZEC(zcash) DOGE litecoin btctest dashtest zectest dogetest ltctest
   * @returns {Promise.<void>}
   */
  async isAddressValid(address){
    try {
      var response = await this.api.get(`/is_address_valid/${this.symbol}/${address}`)
    } catch (e) {
      throw notice.createErrorString('isAddressValid', e)
    }
    return response.data;
  }

  /**
   *
   * @param address support all coin
   * @returns {Promise.<void>}  latest 50 transaction
   */
  async getAddressTx(address){
    try {
      var response = await this.api.get(`/getAddressTx/${this.symbol}/${address}`)
    } catch (e) {
      throw notice.createErrorString('getBlock', e)
    }
    return response.data;
  }

  /**
   *
   * @param txid  transaction id
   * @param outputNo input No
   * @returns {Promise.<void>}
   */
  async getTxOutput(txid, outputNo){
    try {
      var response = await this.api.get(`/get_tx_outputs/${this.symbol}/${txid}/${outputNo}`)
    } catch (e) {
      throw notice.createErrorString('getTxOutput', e)
    }
    return response.data;
  }

  /**
   *
   * @param txid
   * @returns {Promise.<void>}
   */
  async getTx(txid){
    try {
      var response = await this.api.get(`/get_tx/${this.symbol}/${txid}`)
    } catch (e) {
      throw notice.createErrorString('getTx', e)
    }
    return response.data;
  }

  /**
   *
   * @param txid
   * @returns {Promise.<void>}
   */
  async isTxConfirmed(txid){
    try {
      var response = await this.api.get(`/is_tx_confirmed/${this.symbol}/${txid}`)
    } catch (e) {
      throw notice.createErrorString('isTxConfirmed', e)
    }
    return response.data;
  }

  /**
   *
   * @param txid
   * @param outputNo
   * @returns {Promise.<void>}
   */
  async isTxSpent(txid, outputNo){
    try {
      var response = await this.api.get(`/is_tx_spent/${this.symbol}/${txid}/${outputNo}`)
    } catch (e) {
      throw notice.createErrorString('isTxSpent', e)
    }
    return response.data;
  }

  /**
   *
   * @param txid
   * @returns {Promise.<void>}
   */
  async getTxData(txid){
    try {
      var response = await this.api.get(`/tx/${this.symbol}/${txid}`)
    } catch (e) {
      throw notice.createErrorString('getTxData', e)
    }
    return response.data;
  }

  /**
   *
   * @param blockNo
   * @returns {Promise.<void>}
   */
  async getBlockHash(blockNo){
    try {
      var response = await this.api.get(`/get_blockhash/${this.symbol}/${blockNo}`)
    } catch (e) {
      throw notice.createErrorString('getBlockHash', e)
    }
    return response.data;
  }

  /**
   *
   * @param hashOrNo
   * @returns {Promise.<void>}
   */
  async getBlock(hashOrNo){
    try {
      var response = await this.api.get(`/get_block/${this.symbol}/${hashOrNo}`)
    } catch (e) {
      throw notice.createErrorString('getBlock', e)
    }
    return response.data;
  }

  /**
   *
   * @param hashOrNo
   * @returns {Promise.<void>}
   */
  async block(hashOrNo){
    try {
      var response = await this.api.get(`/block/${this.symbol}/${hashOrNo}`)
    } catch (e) {
      throw notice.createErrorString('block', e)
    }
    return response.data;
  }

  /**
   *
   * @param currency  come from coinbase bitstamp gemini bittrex bitfinex coinspot
   * @returns {Promise.<void>}
   */
  async getPrice(currency){
    try {
      var response = await this.api.get(`/block/${this.symbol}/${currency}`)
    } catch (e) {
      throw notice.createErrorString('getPrice', e)
    }
    return response.data;
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async getInfo(){
    try {
      var response = await this.api.get(`/block/${this.symbol}`)
    } catch (e) {
      throw notice.createErrorString('getInfo', e)
    }
    return response.data;
  }

  /**
   *
   * @param address get sochain short address
   * @returns {Promise.<void>}
   */
  async getShort(address){
    try {
      var response = await this.api.get(`/block/${this.symbol}/${address}`)
    } catch (e) {
      throw notice.createErrorString('getShort', e)
    }
    return response.data;
  }

  /**
   *
   * @param tx_hex  sign hex
   * @returns {Promise.<void>}
   */
  async sendTx(tx_hex){
    try {
      var response = await this.api.post(`/send_tx/${this.symbol}`, {tx_hex: tx_hex})
    } catch (e) {
      throw notice.createErrorString('sendTx', e)
    }
    return response.data;
  }
  
}

module.exports = sochainExplorer;