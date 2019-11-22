const axios = require('axios');
const config = require('../config/index');
const notice = require('./notice');
class etherscanIoExplorer{
  /**
   *
   * @param networkId mainnt | mainnetcn | rinkeby | rposten | kovan | goerli | ewc
   * @param apikey
   */
  constructor (networkId, apikey) {
    this.api = axios;
    this.api.defaults.baseURL = config.etherscanIoURL[networkId.toLowerCase()];
    this.api.defaults.headers.common['Content-Type'] = "application/json";
    this.api.create();
    console.log("init api", this.api.defaults.baseURL);
    this.apikey = apikey ? apikey : "YourApiKeyToken";
  }

  /**
   * Get Ether Balance for a single Address
   * @param address single address
   * @returns {Promise.<void>}
   */
  async getAccountBalance(address){
    try {
      var response = await this.api.get("/api?module=account&action=balance&address="+ address + "&tag=latest&apikey="+ this.apikey)
    } catch (e) {
      throw notice.createErrorString('getAccountBalance', e)
    }
    return response.data;
  }

  async getTokenBalance(address, tokenname, contract){
    try{
      var response = await this.api.get("/api?module=account&action=tokenbalance&address="+address+"&tokenname="+tokenname+"&contractaddress="+contract+"&tag=latest&apikey"+ this.apikey)
    }catch(e){
      throw notice.createErrorString('getTokenBalance', e)
    }
    return response.data;
  }

  async getAccountBalanceByContract(address, contract){
    try {
      var response = await this.api.get("/api?module=account&action=balance&address="+ address + "&contract="+ contract +"&tag=latest&apikey="+ this.apikey)
    } catch (e) {
      throw notice.createErrorString('getAccountBalance', e)
    }
    return response.data;
  }
  /**
   * Get Ether Balance for multiple Addresses in a single call
   * @param addresses support address `,` split
   * @returns {Promise.<void>} Separate addresses by comma, up to a maxium of 20 accounts in a single batch
   */
  async getAccountMutipleBalance(addresses){
    try {
      var response = await this.api.get("/api?module=account&action=balancemulti&address="+ addresses +"&tag=latest&apikey="+ this.apikey)
    } catch (e) {
      throw notice.createErrorString('getAccountMutipleBalance', e)
    }
    return response.data;
  }

  /**
   * Get a list of 'Normal' Transactions By Address
   * @param address
   * @param start startBlock default 0
   * @param end default 999999
   * @param sort asc|desc
   * @param page page number
   * @param offset max records to return
   * @returns {Promise.<void>} (Returned 'isError' values: 0=No Error, 1=Got Error) (Returns up to a maximum of the last 10000 transactions only)
   */
    async getAccountTxlist(address, start=0, end=999999, sort='asc', page=1, offset=10){
    try {
      var response = await this.api.get("/api?module=account&action=txlist&address="+address +"&startblock="+ start +"&endblock="+ end +"&page="+page+"&offset="+offset+"&sort="+ sort +"&apikey="+this.apikey)
    } catch (e) {
      throw notice.createErrorString('getAccountTxlist', e)
    }
    return response.data;
  }

  /**
   * Get a list of 'Internal' Transactions by Address
   * @param address single address
   * @param start startblock default 0
   * @param end endblock default 999999
   * @param page page number default:1
   * @param offset max records to return default:10
   * @param sort asc|desc
   * @returns {Promise.<void>}
   */
  async getTxlistInternal(address,start=0, end=999999, page=1, offset=10, sort='asc'){
    try {
      var response = await this.api.get("/api?module=account&action=txlistinternal&address="+address+"&startblock="+start+"&endblock="+end+"&page="+page+"&offset="+offset+"&sort="+sort+"&apikey=YourApiKeyToken"+ this.apikey)
    } catch (e) {
      throw notice.createErrorString('getTxlistInternal', e)
    }
    return response.data;
  }

  /**
   * Get "Internal Transactions" by Transaction Hash
   * @param hash  TXID
   * @returns {Promise.<void>}
   */
  async getTxlistInternalByHash(hash){
    try{
      var response = await this.api.get("/api?module=account&action=txlistinternal&txhash="+hash+"&apikey="+this.apikey)
    }catch(e){
      throw notice.createErrorString('getTxlistInternalByHash', e)
    }
    return response.data;
  }

  /**
   * Get a list of "ERC20 - Token Transfer Events" by Address
   * @param contract Token contract address
   * @param page  default 1
   * @param offset default 100
   * @param sort asc|desc
   * @returns {Promise.<void>}
   */
  async getTokenTx(contract, page=1,offset=100, sort='asc'){
    try{
      var response = await this.api.get('/api?module=account&action=tokentx&contractaddress='+contract+'&page='+page+'&offset='+offset+'&sort='+sort+'&apikey='+this.apikey)
    }catch(e){
      throw notice.createErrorString('getTokenTx', e)
    }
    return response.data;
  }

  /**
   * (To get transfer events for a specific token contract, include the contractaddress paramter)
   * @param contract  Token contract address
   * @param address Token internal address
   * @param page default 1
   * @param offset default 100
   * @param sort asc|desc
   * @returns {Promise.<void>}
   */
  async getTokenTxByAddress(contract, address, page=1, offset=100, sort='asc'){
    try {
      var response = await this.api.get("/api?module=account&action=tokentx&contractaddress="+contract+"&address="+address+"&page="+page+"&offset="+offset+"&sort="+sort+"&apikey="+this.apikey)
    } catch (e) {
      throw notice.createErrorString('getTokenTxByAddress', e)
    }
    return response.data;
  }

  /**
   * Get list of Blocks Mined by Address
   * @param address
   * @param page  default: 1
   * @param offset default: 20
   * @returns {Promise<T>}
   */
  async getMinedBlocks(address, page=0, offset=100){
    page = page ? page : 1;
    pagesize = pagesize ? pagesize : 20;
    try {
      var response = await this.api.get("/api?module=account&action=getminedblocks&address="+address+"&page="+page+"&offset="+offset+"&blocktype=blocks&apikey="+this.apikey)
    } catch (e) {
      throw notice.createErrorString('getMinedBlocks', e)
    }
    return response.data;
  }

  /**
   * Check Contract Execution Status (if there was an error during contract execution)
   * @param hash
   * @returns {Promise.<void>}
   */
  async getStatus(hash){
    try {
      var response = await this.api.get("/api?module=transaction&action=getstatus&txhash="+ hash +"&apikey="+this.apikey)
    } catch(e) {
      throw notice.createErrorString('getStatus', e)
    }
    return response.data;
  }

  /**
   * Check Transaction Receipt Status (Only applicable for Post Byzantium fork transactions)
   * @param hash
   * @returns {Promise.<void>}
   */
  async getTxReceiptStatus(hash){
    try {
      var response = await this.api.get("/api?module=transaction&action=gettxreceiptstatus&txhash="+hash+"&apikey="+this.apikey)
    } catch (e) {
      throw notice.createErrorString('getTxReceiptStatus', e)
    }
    return response.data;
  }

  /**
   * Get Block And Uncle Rewards by BlockNo
   * @param height
   * @returns {Promise.<void>}
   */
  async getBlockReward(height){
    try {
      var response = await this.api.get('/api?module=block&action=getblockreward&blockno='+height+'&apikey='+this.apikey)
    } catch (e) {
      throw notice.createErrorString('getBlockReward', e)
    }
    return response.data;
  }

  /**
   * Get Event Logs from block number 379224 to 'latest' Block, where log address = 0x33990122638b9132ca29c723bdf037f1a891a70c and topic[0] = 0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545
   * @param fromBlock from Block
   * @param toBlock latest|123 targetBlock
   * @param address addresses
   * @param topic0
   * @returns {Promise.<void>}
   */
  async getLogs(fromBlock, toBlock, address, topic0){
    try {
      var response = await this.api.get("/api?module=logs&action=getLogs&fromBlock="+fromBlock+"&toBlock="+toBlock+"&address="+address+"&topic0="+topic0+"&apikey="+this.apikey)
    } catch (e) {
      throw notice.createErrorString('getLogs', e)
    }
    return response.data;
  }

  /**
   * Get Total Supply of Ether
   * @returns {Promise.<void>}
   */
  async getSupply(){
    try{
      var response = await this.api.get("/api?module=stats&action=ethsupply&apikey="+this.apikey)
    }catch (e) {
      throw notice.createErrorString("getSupply", e)
    }
  }
  /**
   * Get ETHER Last Price
   * @returns {Promise.<void>}
   */
  async getEthPrice(){
    try{
      var response = await this.api.get("/api?module=stats&action=ethprice&apikey="+this.apikey)
    }catch (e) {
      throw notice.createErrorString("getEthPrice", e)
    }
  }

  /**
   * Get Ethereum Nodes Size
   * @param begin 2019-02-01
   * @param end 2019-02-28
   * @param sort asc
   * @returns {Promise.<void>}
   */
  async gteChainSize(begin, end, sort){
    try{
      var response = await this.api.get("/api?module=stats&action=chainsize&startdate="+begin+"&enddate="+end+"&clienttype=geth&syncmode=default&sort="+sort+"&apikey="+this.apikey)
    }catch (e) {
      throw notice.createErrorString("gteChainSize", e)
    }
  }

}

module.exports = etherscanIoExplorer;