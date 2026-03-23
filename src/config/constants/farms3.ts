import contracts from './contracts'
import { Farm3Config, QuoteToken } from './types'

// NOTE: lpAddresses are Raydium AMM pool token account addresses (Solana).
// Replace placeholder values with deployed program addresses before going live.

const farms3: Farm3Config[] = [
  // SENZU LAYER

  {
    pid: 0,
    risk: 2,
    lpSymbol: 'SL1-SOL (NEW)',
    lpAddresses: {
      devnet: 'SL1SOLPoolDevnet1111111111111111111111111111',
      'mainnet-beta': 'SL1SOLPoolMainnet111111111111111111111111111',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      devnet: 'SL1TokenMintAddressDevnet1111111111111111111',
      'mainnet-beta': 'SL1TokenMintAddressMainnet111111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SOL,
    quoteTokenAdresses: contracts.wsol,
  },
  {
    pid: 1,
    risk: 2,
    lpSymbol: 'SL1-USDC (NEW)',
    lpAddresses: {
      devnet: 'SL1USDCPoolDevnet111111111111111111111111111',
      'mainnet-beta': 'SL1USDCPoolMainnet11111111111111111111111111',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      devnet: 'SL1TokenMintAddressDevnet1111111111111111111',
      'mainnet-beta': 'SL1TokenMintAddressMainnet111111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2,
    risk: 2,
    lpSymbol: 'SL1-DBALL (NEW)',
    lpAddresses: {
      devnet: 'SL1DBaLLPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'SL1DBaLLPoolMainnet111111111111111111111111',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      devnet: 'SL1TokenMintAddressDevnet1111111111111111111',
      'mainnet-beta': 'SL1TokenMintAddressMainnet111111111111111111',
    },
    quoteTokenSymbol: QuoteToken.DBALL,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 2,
    lpSymbol: 'SL1-SENZU (NEW)',
    lpAddresses: {
      devnet: 'SL1SENZUPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'SL1SENZUPoolMainnet111111111111111111111111',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      devnet: 'SL1TokenMintAddressDevnet1111111111111111111',
      'mainnet-beta': 'SL1TokenMintAddressMainnet111111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SENZU,
    quoteTokenAdresses: contracts.cake3,
  },

  // NATIVES

  {
    pid: 16,
    risk: 5,
    lpSymbol: 'SENZU-SOL (NEW)',
    lpAddresses: {
      devnet: 'SENZUSOLPool2Devnet111111111111111111111111',
      'mainnet-beta': 'SENZUSOLPool2Mainnet11111111111111111111111',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      devnet: 'SENZUTokenMintAddressDevnet111111111111111111',
      'mainnet-beta': 'SENZUTokenMintAddressMainnet1111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SOL,
    quoteTokenAdresses: contracts.wsol,
  },
  {
    pid: 15,
    risk: 5,
    lpSymbol: 'SENZU-DBALL (NEW)',
    lpAddresses: {
      devnet: 'SENZUDBaLLPoolDevnet1111111111111111111111',
      'mainnet-beta': 'SENZUDBaLLPoolMainnet111111111111111111111',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      devnet: 'SENZUTokenMintAddressDevnet111111111111111111',
      'mainnet-beta': 'SENZUTokenMintAddressMainnet1111111111111111',
    },
    quoteTokenSymbol: QuoteToken.DBALL,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 14,
    risk: 5,
    lpSymbol: 'SENZU-USDC (NEW)',
    lpAddresses: {
      devnet: 'SENZUUSDCPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'SENZUUSDCPoolMainnet111111111111111111111111',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      devnet: 'SENZUTokenMintAddressDevnet111111111111111111',
      'mainnet-beta': 'SENZUTokenMintAddressMainnet1111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 12,
    risk: 5,
    lpSymbol: 'DBALL-SOL (NEW)',
    lpAddresses: {
      devnet: 'DBaLLSOLPool3Devnet111111111111111111111111',
      'mainnet-beta': 'DBaLLSOLPool3Mainnet11111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SOL,
    quoteTokenAdresses: contracts.wsol,
  },
  {
    pid: 11,
    risk: 5,
    lpSymbol: 'DBALL-USDC (NEW)',
    lpAddresses: {
      devnet: 'DBaLLUSDCPool3Devnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDCPool3Mainnet11111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 10,
    risk: 5,
    lpSymbol: 'DBALL-USDT (NEW)',
    lpAddresses: {
      devnet: 'DBaLLUSDTPool3Devnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDTPool3Mainnet11111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },

  // NON-NATIVES

  {
    pid: 9,
    risk: 3,
    lpSymbol: 'SOL-USDC (NEW)',
    lpAddresses: {
      devnet: 'SOLUSDCPool2Devnet111111111111111111111111',
      'mainnet-beta': 'SOLUSDCPool2Mainnet11111111111111111111111',
    },
    tokenSymbol: 'SOL',
    tokenAddresses: {
      devnet: 'So11111111111111111111111111111111111111112',
      'mainnet-beta': 'So11111111111111111111111111111111111111112',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    risk: 2,
    lpSymbol: 'BTC-SOL (NEW)',
    lpAddresses: {
      devnet: 'BTCSOLPool2Devnet111111111111111111111111111',
      'mainnet-beta': 'BTCSOLPool2Mainnet11111111111111111111111111',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      devnet: 'C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6',
      'mainnet-beta': '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    },
    quoteTokenSymbol: QuoteToken.SOL,
    quoteTokenAdresses: contracts.wsol,
  },
  {
    pid: 4,
    risk: 2,
    lpSymbol: 'ETH-SOL (NEW)',
    lpAddresses: {
      devnet: 'ETHSOLPool2Devnet111111111111111111111111111',
      'mainnet-beta': 'ETHSOLPool2Mainnet11111111111111111111111111',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      devnet: 'C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6',
      'mainnet-beta': '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
    },
    quoteTokenSymbol: QuoteToken.SOL,
    quoteTokenAdresses: contracts.wsol,
  },

  // POOLS

  {
    pid: 17,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'SL1',
    lpAddresses: {
      devnet: 'SL1USDCPool2Devnet11111111111111111111111111',
      'mainnet-beta': 'SL1USDCPool2Mainnet1111111111111111111111111',
    },
    tokenSymbol: 'SL1',
    tokenAddresses: {
      devnet: 'SL1TokenMintAddressDevnet1111111111111111111',
      'mainnet-beta': 'SL1TokenMintAddressMainnet111111111111111111',
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
      devnet: 'DBaLLUSDCPool4Devnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDCPool4Mainnet11111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
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
      devnet: 'SENZUUSDCPool2Devnet1111111111111111111111111',
      'mainnet-beta': 'SENZUUSDCPool2Mainnet111111111111111111111111',
    },
    tokenSymbol: 'SENZU',
    tokenAddresses: {
      devnet: 'SENZUTokenMintAddressDevnet111111111111111111',
      'mainnet-beta': 'SENZUTokenMintAddressMainnet1111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SENZU,
    quoteTokenAdresses: contracts.cake3,
  },
]

export default farms3
