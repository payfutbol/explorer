## currencytx by explorer

![Pay futbol](https://user-images.githubusercontent.com/56773766/68991717-97a03200-089c-11ea-9165-c726c58f8179.png)  

_Multiple third-party channel currencies are consolidated to allow simultaneous query of multiple currencies_

[Github repository: https://github.com/payfutbol/explorer.git](https://github.com/payfutbol/explorer.git)  

> Pay futbol blockchain explorer search tools

logo | id | name | ver | doc | certified
-| -| -| -| -| -|
[<img alt="block.io" src="https://user-images.githubusercontent.com/56773766/68992021-8d803280-08a0-11ea-866f-84c2a07f9f80.png" width="114" height="49" align="center" />](https://block.io) |  block.io | [block.io](https://block.io) | 2 | [Api](https://block.io/api/) | [![payfutbol Certified](https://img.shields.io/badge/payfutbol-certified-green.svg)](https://github.com/payfutbol/explorer/wiki/Certification)
[<img alt="btc.com" src="https://user-images.githubusercontent.com/56773766/68991746-f9609c00-089c-11ea-8560-350f075d8521.png" width=114 height=49 align=center>](https://btc.com) | btc.com | [btc.com](https://btc.com) | 3 | [Api](https://btc.com/api-doc) | [![payfutbol Certified](https://img.shields.io/badge/payfutbol-certified-green.svg)](https://github.com/payfutbol/explorer/wiki/Certification)
[<img src="https://user-images.githubusercontent.com/56773766/68991693-74758280-089c-11ea-8eee-4cfe35313e2e.png" alt="SoChain" width=114 height=49 align=center />](https://sochain.com) | SoChain | [SoChain](https://sochain.com) | 2 | [Api](https://sochain.com/api#introduction) | [![payfutbol Certified](https://img.shields.io/badge/payfutbol-certified-green.svg)](https://github.com/payfutbol/explorer/wiki/Certification)
[<img src="https://user-images.githubusercontent.com/56773766/68992098-b7862480-08a1-11ea-8026-d124a598a74c.png" alt="Etherscan" width=114 height=49 align=center />](https://etherscan.io/) | Etherscan | [Etherscan](https://etherscan.io/) | * | [Api](https://etherscan.io/apis) | [![payfutbol Certified](https://img.shields.io/badge/payfutbol-certified-green.svg)](https://github.com/payfutbol/explorer/wiki/Certification)


### INSTALL 
```vuejs
npm install payfutbol-currencytx
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
    let sochainExplorer = new explorer.sochainExplorer('btc');
    sochainExplorer.getInfo().then(res=>{
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
 
**sochainExplorer** from **sochain.com**

This object requires that you initialize the supplied parameter as currency networks type. It includes **BTC**,**LTC**, **DOGE**, **DASH**,**ZEC**, **BTCTEST**,**DASHTEST**,**ZECTEST**,**DOGETEST**,**LTCTEST**

Blockchain(Network) | Acronym | Info
-| -| -
Bitcoin | **BTC** |The main Bitcoin network. Currency has value.
Dash | **DASH** | The main Dash network. Currency has value.
Zcash | **ZEC** | The main Zcash network. Currency has value.
Dogecoin | **DOGE** | The main Dogecoin network. Currency has value.
Litecoin | **LTC** | The main Litecoin network. Currency has value.
Bitcoin (Test Net) | **BTCTEST** | The Bitcoin test network. Currency has no value.
Dash (Test Net) | **DASHTEST** | The Dash test network. Currency has no value.
Zcash (Test Net) | **ZECTEST** | The Zcash test network. Currency has no value.
Dogecoin (Test Net) | **DOGETEST** | The Dogecoin test network. Currency has no value.
Litecoin (Test Net) | **LTCTEST** | The Litecoin test network. Currency has no value.

### Update remark
```markdown
1. add a blockchain api(**sochain.com**)
2. update initialize params check
3. update donation address.
```
### donation
* **BCH** bitcoincash:qqm65p0mvuutegqene9g9ya3v6rv7vxra5278v95gm
* **BTC** 12rX8FQLop9jJtUKWJm3USXJ9q64NJAoNr
* **ETH** 0x41a2caf1bc82c022327a949a5b1867d42a0e786c
* **LTC** LcrUgfLYYAD7JY7WMk4Y7wuineTRvLsUz4
* **DOGE** DKk4cx6bCoRTArbhbNbvtjKMcP4Pv2gSo9
