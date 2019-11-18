const config = require('../config/index');
const axios = require('axios');
const notice = require('./notice');
const helper = require("./blockchairHelper");
const sprintf = require('sprintf');

/**
 * Support crypto currency BTC ETH BSV ripple dash steller bitcoincash dogecoin litecoin groestlicoin omni
 */
class blockchairExplorer{
  constructor (apikey) {
    this.api = axios;
    this.api.defaults.baseURL = config.blockchairURL.baseURL;
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
   * Setting chain
   * @param symbol
   */
  setChain(symbol) {
    if(!symbol){
      throw notice.createErrorString("setChain", "You must be support  symbol, It's can't be null");
    }
    this.symbol = symbol.toLowerCase();
    this.api.defaults.baseURL = sprintf(config.blockchairURL.baseURL, config.blockchairURL.chain[symbol.toLowerCase()]);
  }

  /**
   *
   * @param state 0 Full chain 1 this symbol
   * @returns {Promise.<void>}
   */
  async getStats(state){
    let url = this.api.defaults.baseURL;
    if(!state) {
      this.api.defaults.baseURL = sprintf(config.blockchairURL.baseURL, "");
    }else{
      if(config.blockchairURL.erc20_chain.includes(this.symbol)){
        throw notice.createErrorString("getStats", "This chain need use getErc20Stats function");
      }
    }
    try{
      var response = await this.api.get("/stats"+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getStats", e)
    }
    this.api.defaults.baseURL = url;
    return response.data;
  }

  /**
   *
   * @param hashOrHeight  support hash
   * @returns {Promise.<void>}
   */
  async getBlockRelated(hashOrHeight){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getBlockRelated", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/dashboards/block/"+hashOrHeight+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getBlockRelated", e)
    }
    return response.data;
  }

  /**
   *
   * @param hashOrHeight
   * @returns {Promise.<void>}
   */
  async getBlocksRelated(hashOrHeight){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getBlocksRelated", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/dashboards/blocks/"+hashOrHeight+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getBlockRelated", e)
    }
    return response.data;
  }

  /**
   *
   * @param hashOrHeight
   * @returns {Promise.<void>}
   */
  async getRawBlock(hashOrHeight){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getRawBlock", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/raw/block/"+hashOrHeight+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getRawBlock", e)
    }
    return response.data;
  }

  /**
   *
   * @param query Support SQL search method
   * @returns {Promise.<void>}
   */
  async getBlocksFroSql(query){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getBlocksFroSql", "The function does not support this chain");
    }
    query = typeof query==="string" ? query : encodeURIComponent(JSON.stringify(query));
    try{
      var response = await this.api.get('/blocks?'+ query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getBlocksFroSql", e)
    }
    return responsee.data;
  }

  /**
   *
   * @param heightOrHash
   * @returns {Promise.<void>}
   */
  async getRawLedger(heightOrHash){
    if(!config.blockchairURL.xrp_chain.includes(this.symbol) && !config.blockchairURL.xlm_chain.includes(this.symbol)){
      throw notice.createErrorString("getRawLedger", "The function does not support this chain");
    }

    if(typeof heightOrHash==="string" && !xlm_chain.includes(this.symbol)){
      throw notice.createErrorString("getRawLedger", "The function does not support this chain. Just support Height");
    }
    if(!heightOrHash){
      throw notice.createEerrorString("getRawLedger", "you must be support block height or Block hash");
    }
    try{
      var response = await this.api.get('/raw/ledger/'+ heightOrHash+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getRawLedger", e)
    }
    return responsee.data;
  }

  /**
   *
   * @param hash
   * @returns {Promise.<void>}
   */
  async getTransaction(hash){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getTransaction", "The function does not support this chain");
    }
    if(!hash){
      throw notice.createErrorString("getTransaction", "you must be support hash");
    }
    try{
      var response = await this.api.get('/dashboards/transaction/'+ hash+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getTransaction", e)
    }
    return responsee.data;
  }

  /**
   *
   * @param hash  support patch hash
   * @returns {Promise.<void>}
   */
  async getTransactions(hash){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getTransactions", "The function does not support this chain");
    }
    if(!hash){
      throw notice.createErrorString("getTransactions", "you must be support hash");
    }
    hash = typeof hash==="object" ? hash.split(',') : hash;
    try{
      var response = await this.api.get('/dashboards/transactions/'+ hash+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getTransactions", e)
    }
    return responsee.data;
  }

  /**
   *
   * @param hash
   * @returns {Promise.<void>}
   */
  async getRawTransaction(hash){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getTransactions", "The function does not support this chain");
    }
    if(!hash){
      throw notice.createErrorString("getTransactions", "you must be support hash");
    }
    try{
      var response = await this.api.get('/dashboards/transactions/'+ hash+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getTransactions", e)
    }
    return responsee.data;
  }

  /**
   *
   * @param data
   * @returns {Promise.<void>}
   */
  async postPushTransaction(data){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getTransactions", "The function does not support this chain");
    }
    if(!data){
      throw notice.createErrorString("postPushTransaction", "you must be support data ");
    }
    try{
      var response = await this.api.post("/push/transaction"+(this.apikey ? "?key="+ this.apikey : ''), {data: data});
    }catch(e){
      throw notice.createErrorString("postPushTransaction", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getTransactionForSql(query){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getTransactionForSql", "The function does not support this chain");
    }
    if(!query){
      throw notice.createErrorString("getTransactionForSql", "Please support search params");
    }
    query = typeof query==="string" ? query : encodeURIComponent(JSON.stringify(query));
    try{
      var response = await this.api.get("/transactions?"+ query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getTransactionForSql", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getMempoolTransactions(query){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getMempoolTransactions", "The function does not support this chain");
    }
    if(!query){
      throw notice.createErrorString("getMempoolTransactions", "Please support search params");
    }
    query = typeof query==="string" ? query : encodeURIComponent(JSON.stringify(query));
    try{
      var response = await this.api.get("/mempool/transactions?"+ query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getMempoolTransactions", e)
    }
    return response.data;
  }

  /**
   *
   * @param address
   * @returns {Promise.<void>}
   */
  async getAddress(address){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getAddress", "The function does not support this chain");
    }
    if(!address){
      throw notice.createErrorString("getAddress", "you must be support address");
    }
    try{
      var response = await this.api.get("/dashboards/address/"+address+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getAddress", e)
    }
  }

  /**
   *
   * @param address
   * @returns {Promise.<void>}
   */
  async getAddresses(address){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getAddresses", "The function does not support this chain");
    }
    if(!address){
      throw notice.createErrorString("getAddresses", "you must be support address list");
    }
    address = typeof address ==="object" ? address.split(",") : address;
    try{
      var response = await this.api.get("/dashboards/address/"+address+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getAddresses", e)
    }
    return response.data;
  }

  /**
   *
   * @param extendedkey
   * @returns {Promise.<void>}
   */
  async getXput(extendedkey){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getXput", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/dashboards/xpub/"+extendedkey+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getXput", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getAddressForSql(query){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getAddressForSql", "The function does not support this chain");
    }
    if(!query){
      throw notice.createErrorString("getAddressForSql", "you must be supoort query condition");
    }
    query = typeof query =="object" ? encodeURIComponent(JSON.stringify(query)) : query;
    try{
      var response = await this.api.get("/addresses?"+ query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getAddressForSql", e)
    }
    return response.data;
  }

  /**
   *
   * @param address
   * @returns {Promise.<void>}
   */
  async getRawAccount(address){
    if(!config.blockchairURL.xrp_chain.includes(this.symbol) && !config.blockchairURL.xlm_chain.includes(this.symbol)){
      throw notice.createErrorString("getRawAccount", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/raw/account/"+address+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getRawAccount", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getOutputs(query){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getOutputs", "The function does not support this chain");
    }
    query = typeof query === "object" ? encodeURIComponent(JSON.Stringify(query)) : query;
    try{
      var response = await this.api.get("/outputs?"+query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getOutputs", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getMempoolOutputs(query){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getMempoolOutputs", "The function does not support this chain");
    }
    query = typeof query === "object" ? encodeURIComponent(JSON.Stringify(query)) : query;
    try{
      var response = await this.api.get("/mempool/outputs?"+query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getMempoolOutputs", e)
    }
    return response.data;
  }

  /**
   *
   * @param hash
   * @returns {Promise.<void>}
   */
  async getUncle(hash){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getUncle", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/dashboards/uncle/"+hash+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getUncle", e)
    }
    return response.data;
  }

  /**
   *
   * @param hash
   * @returns {Promise.<void>}
   */
  async getUncles(hash){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getUncles", "The function does not support this chain");
    }
    hash = typeof hash === "object" ? encodeURIComponent(JSON.Stringify(hash)) : hash;
    try{
      var response = await this.api.get("/dashboards/uncles/"+hash+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getUncles", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getEthUncles(query){
    if(!config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getEthUncles", "The function does not support this chain");
    }
    query = typeof query === "object" ? encodeURIComponent(JSON.Stringify(query)) : query;
    try{
      var response = await this.api.get("/uncles?"+query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getEthUncles", e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getCalls(query){
    if(!config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getCalls", "The function does not support this chain");
    }
    query = typeof query === "object" ? encodeURIComponent(JSON.Stringify(query)) : query;
    try{
      var response = await this.api.get("/calls?"+query+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getCalls", e)
    }
    return response.data;
  }

  /**
   *
   * @param prorerty_id
   * @returns {Promise.<void>}
   */
  async getProperty(prorerty_id){
    if(!config.blockchairURL.omni_chain.includes(this.symbol)){
      throw notice.createErrorString("getProperty", "The function does not support this chain");
    }
    try{
      var response = await this.api.get("/dashboards/property/"+prorerty_id+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getProperty", e)
    }
    return response.data;
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async getPropertyList(query){
    if(!config.blockchairURL.omni_chain.includes(this.symbol)){
      throw notice.createErrorString("getProperty", "The function does not support this chain");
    }
    query = typeof query ==="object" ? encodeURIComponent(JSON.stringify(query)) : query
    try{
      var response = await this.api.get("/omni/properties?"+query+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getProperty", e)
    }
    return response.data;
  }

  /**
   *
   * @param contract
   * @returns {Promise.<void>}
   */
  async getErc20Stats(contract){
    if(!config.blockchairURL.erc20_chain.includes(this.symbol)){
      throw notice.createErrorString("getErc20Stats", "This chain just support erc20");
    }
    try{
      var response = await this.api.get("/"+ contract +"/stats"+ (this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getErc20Stats", e)
    }
    return response.data;
  }

  /**
   *
   * @param contract
   * @param address
   * @returns {Promise.<void>}
   */
  async getErc20Address(contract, address){
    if(!config.blockchairURL.erc20_chain.includes(this.symbol)){
      throw notice.createErrorString("getErc20Address", "This chain just support erc20");
    }
    try{
      var response = await this.api.get(`/${contract}/dashboards/address/${address}`+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString('getErc20Address', e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getErc20Token(query){
    if(!config.blockchairURL.erc20_chain.includes(this.symbol)){
      throw notice.createErrorString("getErc20Token", "This chain just support erc20");
    }
    query = typeof query === "object" ? encodeURIComponent(JSON.Stringify(query)) : query;
    try{
      var response = await this.api.get(`/tokens?${query}`+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString('getErc20Token', e)
    }
    return response.data;
  }

  /**
   *
   * @param query
   * @returns {Promise.<void>}
   */
  async getErc20Transactions(query){
    if(!config.blockchairURL.erc20_chain.includes(this.symbol)){
      throw notice.createErrorString("getErc20Transactions", "This chain just support erc20");
    }
    query = typeof query === "object" ? encodeURIComponent(JSON.Stringify(query)) : query;
    try{
      var response = await this.api.get(`/transactions?${query}`+(this.apikey ? "&key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString('getErc20Transactions', e)
    }
    return response.data;
  }

  /**
   *
   * @param blockId
   * @returns {Promise.<void>}
   */
  async getBlockChangeState(blockId){
    if(!config.blockchairURL.btc_chain.includes(this.symbol) && !config.blockchairURL.eth_chain.includes(this.symbol)){
      throw notice.createErrorString("getBlockChangeState", "This function does not support this chain");
    }
    try{
      var response = await this.api.get("/state/changes/block/"+ blockId+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getBlockChangeState", e)
    }
    return response.data;
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async getMempoolState(){
    if(!config.blockchairURL.btc_chain.includes(this.symbol)){
      throw notice.createErrorString("getMempoolState", "This chain just support mempool");
    }
    try{
      var response = await this.api.get("/state/changes/mempool"+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getMempoolState", e)
    }
    return response.data;
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async getNode(){
    let url = this.api.defaults.baseURL;
    this.api.defaults.baseURL = sprintf(config.blockchairURL.baseURL, "")
    try{
      var response = await this.api.get("/nodes"+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getNode", e)
    }
    this.api.defaults.baseURL = url;
    return response.data;
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async getNodes(){
    try{
      var response = await this.api.get("/nodes"+(this.apikey ? "?key="+ this.apikey : ''));
    }catch(e){
      throw notice.createErrorString("getNodes", e)
    }
    return response.data;
  }

  /**
   *
   * @returns {Promise.<void>}
   */
  async getPremiumStats(){
    let url = this.api.defaults.baseURL;
    this.api.defaults.baseURL = helper.sprints(config.blockchairURL.baseURL, "");
    try{
      var response = await this.api.get("/premium?key="+this.apikey)
    }catch(e){
      throw notice.createErrorString("getNodes", e)
    }
    this.api.defaults.baseURL = url;
    return response.data;
  }
}

module.exports = blockchairExplorer;