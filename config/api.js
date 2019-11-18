const request = require('request');
class api{
  constructor(baseURL){
    this.baseURL = baseURL;
  }



  /**
   * get - perform GET request
   *
   * @param  {String} url the URL to GET
   * @return {Promise}    resolves with result data
   */
  get(url){
    return new Promise((resolve,reject) => {
      var options = {
        uri: this.baseURL+url,
        method: 'GET'
      };
      request(options, (err,res,body) => {
        if (err) return reject(err);
        if (res.statusCode == 200) {
          resolve(JSON.parse(body).data);
        } else {
          reject(new Error(body));
        }
      })
    });
  }

  /**
   * post - description
   *
   * @param  {String} url  the URL to POST
   * @param  {Object} data the JSON data to POST
   * @return {Promise}     resolves with result data
   */
  post (url, data) {
    return new Promise((resolve,reject) => {
      var options = {
        uri: this.baseURL+ url,
        method: 'POST',
        json: data
      };
      request(options, (err,res,body) => {
        if (err) return reject(err);
        if (res.statusCode == 200) {
          resolve(body.data);
        } else {
          console.log(body);
          reject(new Error(body));
        }
      })
    });
  }
}
module.exports = api;