import BigNumber from 'bignumber.js'
import { PublicKey } from '@solana/web3.js'
import { getMint, getAccount, getAssociatedTokenAddress } from '@solana/spl-token'
import { getConnection } from 'utils/solana'
import { getMasterChefAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

const fetchFarms = async () => {
  const connection = getConnection()
  const masterChefPubkey = new PublicKey(getMasterChefAddress())

  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAddress = farmConfig.lpAddresses[CLUSTER]
      const tokenMintAddress = farmConfig.tokenAddresses[CLUSTER]
      const quoteTokenMintAddress = farmConfig.quoteTokenAdresses[CLUSTER]

      if (!lpAddress || !tokenMintAddress || !quoteTokenMintAddress) {
        return {
          ...farmConfig,
          tokenAmount: '0',
          lpTotalInQuoteToken: '0',
          tokenPriceVsQuote: '0',
          poolWeight: 0,
          multiplier: '0X',
          depositFeeBP: 0,
          dballPerBlock: 0,
        }
      }

      try {
        const tokenMintPubkey = new PublicKey(tokenMintAddress)
        const quoteTokenMintPubkey = new PublicKey(quoteTokenMintAddress)
        const lpPubkey = new PublicKey(lpAddress)

        // Get token info (decimals, supply)
        const [tokenMintInfo, quoteTokenMintInfo, lpMintInfo] = await Promise.all([
          getMint(connection, tokenMintPubkey),
          getMint(connection, quoteTokenMintPubkey),
          getMint(connection, lpPubkey),
        ])

        const tokenDecimals = tokenMintInfo.decimals
        const quoteTokenDecimals = quoteTokenMintInfo.decimals

        // Get token balances inside the LP pool
        const tokenAtaInLP = await getAssociatedTokenAddress(tokenMintPubkey, lpPubkey, true)
        const quoteTokenAtaInLP = await getAssociatedTokenAddress(quoteTokenMintPubkey, lpPubkey, true)
        // LP tokens staked in MasterChef
        const lpAtaInMC = await getAssociatedTokenAddress(lpPubkey, masterChefPubkey, true)

        const [tokenBalanceLPAccount, quoteTokenBalanceLPAccount, lpBalanceMCAccount] = await Promise.all([
          getAccount(connection, tokenAtaInLP).catch(() => null),
          getAccount(connection, quoteTokenAtaInLP).catch(() => null),
          getAccount(connection, lpAtaInMC).catch(() => null),
        ])

        const tokenBalanceLP = new BigNumber(tokenBalanceLPAccount?.amount?.toString() || '0')
        const quoteTokenBalanceLP = new BigNumber(quoteTokenBalanceLPAccount?.amount?.toString() || '0')
        const lpTokenBalanceMC = new BigNumber(lpBalanceMCAccount?.amount?.toString() || '0')
        const lpTotalSupply = new BigNumber(lpMintInfo.supply.toString())

        let tokenAmount: BigNumber
        let lpTotalInQuoteToken: BigNumber
        let tokenPriceVsQuote: BigNumber

        if (farmConfig.isTokenOnly) {
          tokenAmount = lpTokenBalanceMC.div(new BigNumber(10).pow(tokenDecimals))
          if (farmConfig.tokenSymbol === QuoteToken.USDC && farmConfig.quoteTokenSymbol === QuoteToken.USDC) {
            tokenPriceVsQuote = new BigNumber(1)
          } else {
            tokenPriceVsQuote = quoteTokenBalanceLP.gt(0) && tokenBalanceLP.gt(0)
              ? quoteTokenBalanceLP.div(tokenBalanceLP)
              : new BigNumber(1)
          }
          lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote)
        } else {
          const lpTokenRatio = lpTotalSupply.gt(0) ? lpTokenBalanceMC.div(lpTotalSupply) : new BigNumber(0)

          lpTotalInQuoteToken = quoteTokenBalanceLP
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(new BigNumber(2))
            .times(lpTokenRatio)

          tokenAmount = tokenBalanceLP.div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
          const quoteTokenAmount = quoteTokenBalanceLP.div(new BigNumber(10).pow(quoteTokenDecimals)).times(lpTokenRatio)

          tokenPriceVsQuote = tokenAmount.gt(0)
            ? quoteTokenAmount.div(tokenAmount)
            : quoteTokenBalanceLP.gt(0) && tokenBalanceLP.gt(0)
            ? quoteTokenBalanceLP.div(tokenBalanceLP)
            : new BigNumber(1)
        }

        // Pool weight info from MasterChef program (placeholder values until on-chain data available)
        const allocPoint = new BigNumber(100)
        const totalAllocPoint = new BigNumber(1000)
        const poolWeight = allocPoint.div(totalAllocPoint)
        const dballPerBlock = 1 // tokens per slot - update from on-chain data

        return {
          ...farmConfig,
          tokenAmount: tokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
          tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
          poolWeight: poolWeight.toNumber(),
          multiplier: `${allocPoint.div(100).toString()}X`,
          depositFeeBP: 0,
          dballPerBlock,
        }
      } catch (e) {
        console.error(`fetchFarms error for pid ${farmConfig.pid}:`, e)
        return {
          ...farmConfig,
          tokenAmount: '0',
          lpTotalInQuoteToken: '0',
          tokenPriceVsQuote: '0',
          poolWeight: 0,
          multiplier: '0X',
          depositFeeBP: 0,
          dballPerBlock: 0,
        }
      }
    }),
  )
  return data
}

export default fetchFarms
