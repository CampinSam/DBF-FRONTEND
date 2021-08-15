import contracts from './contracts'
import { Farm3Config, QuoteToken } from './types'

const farms3: Farm3Config[] = [
  // SENZU LAYER
  
  {
    pid: 0,
    risk: 2,
    lpSymbol: 'SL1-BNB (NEW)',
    lpAddresses: {
      97: '',
      56: '0x82Cead752C68F4E99Fb9Be9Bb0c48c17b4057FCB',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    risk: 2,
    lpSymbol: 'SL1-BUSD (NEW)',
    lpAddresses: {
      97: '',
      56: '0x5455eE889414c9FF8B8A8C4BE7cB8eb60cAC48cD',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    risk: 2,
    lpSymbol: 'SL1-DBALL (NEW)',
    lpAddresses: {
      97: '',
      56: '0xF4BbDaB2A538AdE9B0Af2F0a6edfd419DfF848DC',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.DBALL,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 2,
    lpSymbol: 'SL1-SENZU (NEW)',
    lpAddresses: {
      97: '',
      56: '0x373c0C0305F575d57502E71079a8F09B88Ac66ed',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.SENZU,
    quoteTokenAdresses: contracts.senzu,
  },
  
  // NATIVES

  {
    pid: 16,
    risk: 5,
    lpSymbol: 'SENZU-BNB (NEW)',
    lpAddresses: {
      97: '',
      56: '0xe2e7c19931189541E2bDA6DaC3c0e366017Cf5Fd',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xcba1813ede683333020cedea7c3b63fbac28e78e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 15,
    risk: 5,
    lpSymbol: 'SENZU-DBALL (NEW)',
    lpAddresses: {
      97: '',
      56: '0x1134D78dd9D900D99CFA561aeb2A46942533053c',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xcba1813ede683333020cedea7c3b63fbac28e78e',
    },
    quoteTokenSymbol: QuoteToken.DBALL,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 14,
    risk: 5,
    lpSymbol: 'SENZU-BUSD (NEW)',
    lpAddresses: {
      97: '',
      56: '0x231fe692d06c11cEa5b94711Ce47e5D49e06FcD7',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xcba1813ede683333020cedea7c3b63fbac28e78e',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 13,
    risk: 5,
    lpSymbol: 'DBALL-CAKE (NEW)',
    lpAddresses: {
      97: '',
      56: '0x4BE6C5bEC743c36C5C405f9E8505fa9946148497',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 12,
    risk: 5,
    lpSymbol: 'DBALL-BNB (NEW)',
    lpAddresses: {
      97: '',
      56: '0xFe086591948040B399C737cACeebeea43E16E30F',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 11,
    risk: 5,
    lpSymbol: 'DBALL-BUSD (NEW)',
    lpAddresses: {
      97: '',
      56: '0x00703C1b4522e9827e9Ea6e7FBC7822018811Beb',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 10,
    risk: 5,
    lpSymbol: 'DBALL-USDT (NEW)',
    lpAddresses: {
      97: '',
      56: '0x9a465fEc82D4c11aa948B80d26dC00B04c0E030C',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  
  // NON-NATIVES
  
  {
    pid: 9,
    risk: 3,
    lpSymbol: 'BNB-BUSD (NEW)',
    lpAddresses: {
      97: '',
      56: '0x6A932d0F54F09675ab019c23deA3428DB95C9b75',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 6,
    risk: 4,
    lpSymbol: 'CAKE-BNB (NEW)',
    lpAddresses: {
      97: '',
      56: '0xa9fd691B4742D349f4f0d7ed51892EbE88dE9636',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 5,
    risk: 2,
    lpSymbol: 'BTCB-BNB (NEW)',
    lpAddresses: {
      97: '',
      56: '0x349a497f5882c237D9f1EBe6AD585B999670B13d',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 4,
    risk: 2,
    lpSymbol: 'ETH-BNB (NEW)',
    lpAddresses: {
      97: '',
      56: '0x4Cc427C6964217A6B9d8BbA294806E03DB49e36C',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  
  // POOLS

  {
    pid: 17,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'SL1',
    lpAddresses: {
      97: '',
      56: '0xaC6DD1cf504A273583DEBd38e139736B210E3158', // VIKING-BUSD LP
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      97: '',
      56: '0xd89745A21C3EB87CfbC0C0e6EB6a30974cAdbD90',
    },
    quoteTokenSymbol: QuoteToken.SL1,
    quoteTokenAdresses: contracts.sl1,
  },
  {
    pid: 20,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'DBALL',
    lpAddresses: {
      97: '',
      56: '0xaC6DD1cf504A273583DEBd38e139736B210E3158', // VIKING-BUSD LP
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 19,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'SENZU',
    lpAddresses: {
      97: '',
      56: '0xaC6DD1cf504A273583DEBd38e139736B210E3158', // VIKING-BUSD LP
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xcBA1813Ede683333020cedea7C3b63FbaC28e78e',
    },
    quoteTokenSymbol: QuoteToken.SENZU,
    quoteTokenAdresses: contracts.senzu,
  },
  {
    pid: 18,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0xaC6DD1cf504A273583DEBd38e139736B210E3158', // VIKING-BUSD LP
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
  },
  
  // OLD-ONES
  /*
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'SENZU-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xcb8e10cd31ebb2633425cd4f579221ad126da040',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  */
  /*
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'SENZU-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xc6d0aebc95b7cfee7c0212cf5a1d0e00e9209fa4',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  */
  /*
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'DBALL-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x55d06D963CDc4405E204FB1585b45b5E8e353719',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  */
  /*
  {
    pid: 4,
    risk: 5,
    lpSymbol: 'DBALL-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x3330Bde1FfB5E358FCadfA266f98c95D7D5DC9B9',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceB2f5e9C7F2D3BCd12A7560D73c56f3396af3F9',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  */
  /*
  {
    pid: 7,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  */
  /*
  {
    pid: 6,
    risk: 2,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  */
  /*
  {
    pid: 8,
    risk: 4,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  */
  /*
  {
    pid: 2,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'SENZU',
    lpAddresses: {
      97: '',
      56: '0xcb8e10cd31ebb2633425cd4f579221ad126da040', // VIKING-BUSD LP
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      97: '',
      56: '0xd89745a21c3eb87cfbc0c0e6eb6a30974cadbd90',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  */
  /*
  {
    pid: 5,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'DBALL',
    lpAddresses: {
      97: '',
      56: '0x55d06d963cdc4405e204fb1585b45b5e8e353719', // VIKING-BUSD LP
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      97: '',
      56: '0xceb2f5e9c7f2d3bcd12a7560d73c56f3396af3f9',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  */
]

export default farms3