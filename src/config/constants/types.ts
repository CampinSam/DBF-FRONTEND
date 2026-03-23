export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: Address
  name: string
  token: string
  maxContribution: string
  minContribution: string
  subTitle?: string
  description?: string
  saleAmount: string
  raiseAmount: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
}

export enum QuoteToken {
  'SOL' = 'SOL',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'USDC' = 'USDC',
  'TWT' = 'TWT',
  'USDT' = 'USDT',
  'CAKE2' = 'CAKE2',
  'SENZU' = 'SENZU',
  'DBALL' = 'DBALL',
  'BTCB' = 'BTCB',
  'ETH' = 'ETH',
  'SL1' = 'SL1',
  // Keep BUSD as alias for USDC for backwards-compat with farm configs
  'BUSD' = 'USDC',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'SOLANA' = 'Solana', // Pools using native SOL behave differently than pools using a token
}

// Solana cluster-keyed address map
export interface Address {
  devnet?: string
  'mainnet-beta': string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  risk: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface Farm3Config {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isTokenOnly?: boolean
  isCommunity?: boolean
  risk: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: Address
  contractAddress: Address
  rewardTokenAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  burnFee: number
}

export type Nft = {
  name: string
  description: string
  originalImage: string
  previewImage: string
  blurImage: string
  sortOrder: number
  bunnyId: number
}
