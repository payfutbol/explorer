module.exports = {
  btcURL: {
    btc: "https://chain.api.btc.com/v3",
    bch: "https://bch-chain.api.btc.com/v3",
    ltc: "https://ltc-chain.api.btc.com/v3"
  },
  blockIoURL: {
    baseURL: "https://block.io/api/v2"
  },
  etherscanIoURL: {
    mainnet: 'https://api.etherscan.io',
    mainnetcn: 'http://api-cn.etherscan.com',
    rinkeby: 'https://api-rinkeby.etherscan.io',
    ropsten: 'https://api-ropsten.etherscan.io',
    kovan: 'https://api-kovan.etherscan.io',
    goerli: 'https://api-goerli.etherscan.io',
    ewc: 'https://api-ewc.etherscan.com',
  },
  sochainURL: {
    baseURL: "https://sochain.com/api/v2"
  },
  blockchairURL: {
    baseURL: "https://api.blockchair.com/%s",
    chain: {
      btc: "bitcoin",
      bch: "bitcoin-cash",
      ltc: "litecoin",
      bsv: "bitcoin-sv",
      doge: "dogecoin",
      dash: "dash",
      gsr: "grostlcoin",
      xlm: "stellar",
      xrp: "ripple",
      eth: "ethereum",
      erc20: "ethereum/erc-20",
      omni: "bitcoin/omni"
    },
    btc_chain: ['btc', 'bch', 'ltc', 'bsv', 'doge', 'dash'],
    eth_chain: ['eth', 'erc20'],
    erc20_chain: ["erc20"],
    xrp_chain: ['xrp'],
    xlm_chain: ['xlm'],
    omni_chain: ['omni'],
    grs_chain: ['grs']
  }
};