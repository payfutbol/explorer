## currencytx by explorer

![Pay futbol](http://pay.futbol/static/img/logo.8bd463c.png)  

_Multiple third-party channel currencies are consolidated to allow simultaneous query of multiple currencies_

[Github repository: https://github.com/payfutbol/explorer.git](https://github.com/payfutbol/explorer.git)  

> Pay futbol blockchain explorer search tools
>> Current support [https://etherscan.io](http://etherscan.io) [https://block.io](https://block.io) [https://btc.com](https://btc.com)

### INSTALL 
```vuejs
npm install payfutbol-currencytx --save
```

### Run Code

```vuejs
import explorer from "payfutbol-currencytx";
    let btcExplorer = new explorer.btcExplorer('btc');
    
    btcExplorer.getUnTx().then(res=>{
      console.log(res);
    });
    
    let blockIoExplorer = new explorer.blockIoExplorer('Your Api KEY');
    
    blockIoExplorer.getBalance().then(res=>{
      console.log(res);
    });
    
    let etherscanIoExplorer = new explorer.etherscanIoExplorer('mainnetcn');
    etherscanIoExplorer.getSupply().then(res=>{
      'use strict'
      console.log(res);
    });
``` 

### Object initialize 
>    We need different parameters when initializing each channel, so let's give a brief introduction.

**btcExplorer** from **BTC.com**

This object requires that you initialize the supplied parameter as currency type. It includes **BTC**, **LTC**, **BCH** and **ETH**.

1. **BTC**
2. **ETH**
3. **BCH**
4. **LTC**

**blockIoExplorer** from **Block.io**
  
This object requires you to initialize the supplied parameter as **api-key**.
  
**etherscanIoExplorer** from **etherscan.io**
  
This object requires that you provide two parameters for initialization, namely **network type** and **API-KEY**.
  
 network type | desc 
 -| - 
 mainnetcn | CN mainnet 
 mainnet | Common mainnet 
 rinkeby | Rinkeby 
 ropsten | Ropsten 
 kovan | Kovan 
 goerli | Goerli 
 ewc | Ewc 
 
### donation
* **BCH** bitcoincash:qz3k9dn67zym50rnrwecp3swr8ylepzlxqfavmh7qt
* **BTC** L4BBBpJ2y1UdmZbZxDcPsa8vkszoCPX14qnz3nGwCwTWVHqrk6Rp
* **ETH** 0x09e8f14701c10346d1e2b327d255057aa9bf5ee43acd5d99d867b8d17c3024b8
* **LTC** T71wW1tuGXcfnEKmmpYzqfZWWVdcmmis6AUzLcjYgQhmoyd1z1oR
* **DOGE** QPJqjK7eK5GB1mXykmJAtkpDF9nucaL3u7X8ueX5ci41G1vte7gs
