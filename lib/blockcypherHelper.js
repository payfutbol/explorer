const blockcypherHelper = {

  output(cmd){
    let json;
    if(!cmd){
      json = {
        Cmdlist:[
          'setChain',
          "getBlock",
          "getBalance",
          "getAddress",
          "getAddressFull",
          "getTx",
          "getTxs"
        ]
      };
    }else {
      json = require("./helper/bc_" + cmd + ".json");
    }
    return {
      cmd: `${cmd}`,
      data: json
    }
  }
}
module.exports = blockcypherHelper;