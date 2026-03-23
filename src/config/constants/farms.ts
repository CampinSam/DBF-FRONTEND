import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

// NOTE: lpAddresses are Raydium AMM pool token account addresses (Solana).
// tokenAddresses and quoteTokenAdresses are SPL token mint addresses.
// Replace placeholder values with deployed program addresses before going live.

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'DBALL-USDC LP',
    lpAddresses: {
      devnet: 'DBaLLUSDCPoolDevnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDCPoolMainnet1111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd, // USDC on Solana
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'DBALL-SOL LP',
    lpAddresses: {
      devnet: 'DBaLLSOLPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'DBaLLSOLPoolMainnet111111111111111111111111',
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
    pid: 29,
    risk: 5,
    lpSymbol: 'DBALL-SENZU LP',
    lpAddresses: {
      devnet: 'DBaLLSENZUPoolDevnet11111111111111111111111',
      'mainnet-beta': 'DBaLLSENZUPoolMainnet1111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SENZU,
    quoteTokenAdresses: contracts.cake3,
  },
  {
    pid: 30,
    risk: 5,
    lpSymbol: 'DBALL-USDT LP',
    lpAddresses: {
      devnet: 'DBaLLUSDTPoolDevnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDTPoolMainnet11111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 2,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'DBALL',
    lpAddresses: {
      devnet: 'DBaLLUSDCPoolDevnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDCPoolMainnet1111111111111111111111',
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
    pid: 19,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WSOL',
    lpAddresses: {
      devnet: 'WSOLUSDCPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'WSOLUSDCPoolMainnet111111111111111111111111',
    },
    tokenSymbol: 'WSOL',
    tokenAddresses: {
      devnet: 'So11111111111111111111111111111111111111112',
      'mainnet-beta': 'So11111111111111111111111111111111111111112',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 32,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'SENZU',
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
    pid: 33,
    risk: 5,
    lpSymbol: 'DBALL-USDC LP',
    lpAddresses: {
      devnet: 'DBaLLUSDCPool2Devnet1111111111111111111111',
      'mainnet-beta': 'DBaLLUSDCPool2Mainnet111111111111111111111',
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
    pid: 34,
    risk: 5,
    lpSymbol: 'DBALL-SOL LP',
    lpAddresses: {
      devnet: 'DBaLLSOLPool2Devnet111111111111111111111111',
      'mainnet-beta': 'DBaLLSOLPool2Mainnet11111111111111111111111',
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
    pid: 35,
    risk: 5,
    lpSymbol: 'DBALL-SENZU LP',
    lpAddresses: {
      devnet: 'DBaLLSENZUPool2Devnet1111111111111111111111',
      'mainnet-beta': 'DBaLLSENZUPool2Mainnet111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.SENZU,
    quoteTokenAdresses: contracts.cake3,
  },
  {
    pid: 36,
    risk: 5,
    lpSymbol: 'DBALL-USDT LP',
    lpAddresses: {
      devnet: 'DBaLLUSDTPool2Devnet111111111111111111111111',
      'mainnet-beta': 'DBaLLUSDTPool2Mainnet11111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 38,
    risk: 5,
    lpSymbol: 'DBALL-BTC LP',
    lpAddresses: {
      devnet: 'DBaLLBTCPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'DBaLLBTCPoolMainnet111111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.BTCB,
    quoteTokenAdresses: contracts.btcb,
  },
  {
    pid: 39,
    risk: 5,
    lpSymbol: 'DBALL-ETH LP',
    lpAddresses: {
      devnet: 'DBaLLETHPoolDevnet1111111111111111111111111',
      'mainnet-beta': 'DBaLLETHPoolMainnet111111111111111111111111',
    },
    tokenSymbol: 'DBALL',
    tokenAddresses: {
      devnet: 'DBaLLTokenMintAddressDevnet1111111111111111',
      'mainnet-beta': 'DBaLLTokenMintAddressMainnet11111111111111111',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 40,
    risk: 5,
    lpSymbol: 'SENZU-SOL LP',
    lpAddresses: {
      devnet: 'SENZUSOLPoolDevnet11111111111111111111111111',
      'mainnet-beta': 'SENZUSOLPoolMainnet1111111111111111111111111',
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
    pid: 43,
    risk: 3,
    lpSymbol: 'SOL-USDC LP',
    lpAddresses: {
      devnet: 'SOLUSDCRaydiumPoolDevnet111111111111111111',
      'mainnet-beta': '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWaLwpjyDuVNo', // Raydium SOL-USDC
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
    pid: 44,
    risk: 1,
    lpSymbol: 'USDT-USDC LP',
    lpAddresses: {
      devnet: 'USDTUSDCPoolDevnet11111111111111111111111111',
      'mainnet-beta': 'USDTUSDCPoolMainnet1111111111111111111111111',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      devnet: 'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4',
      'mainnet-beta': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 45,
    risk: 2,
    lpSymbol: 'ETH-SOL LP',
    lpAddresses: {
      devnet: 'ETHSOLPoolDevnet111111111111111111111111111',
      'mainnet-beta': 'ETHSOLPoolMainnet11111111111111111111111111',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      devnet: 'C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6',
      'mainnet-beta': '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
    },
    quoteTokenSymbol: QuoteToken.SOL,
    quoteTokenAdresses: contracts.wsol,
  },
  {
    pid: 46,
    risk: 2,
    lpSymbol: 'BTC-SOL LP',
    lpAddresses: {
      devnet: 'BTCSOLPoolDevnet111111111111111111111111111',
      'mainnet-beta': 'BTCSOLPoolMainnet11111111111111111111111111',
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
    pid: 48,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'BTC',
    lpAddresses: {
      devnet: 'BTCUSDCPoolDevnet111111111111111111111111111',
      'mainnet-beta': 'BTCUSDCPoolMainnet11111111111111111111111111',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      devnet: 'C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6',
      'mainnet-beta': '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 49,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'ETH',
    lpAddresses: {
      devnet: 'ETHUSDCPoolDevnet111111111111111111111111111',
      'mainnet-beta': 'ETHUSDCPoolMainnet11111111111111111111111111',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      devnet: 'C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6',
      'mainnet-beta': '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
