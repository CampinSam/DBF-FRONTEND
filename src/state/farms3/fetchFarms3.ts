import BigNumber from 'bignumber.js'
import { PublicKey } from '@solana/web3.js'
import { getMint, getAccount, getAssociatedTokenAddress } from '@solana/spl-token'
import { getConnection } from 'utils/solana'
import { getMasterChef3Address } from 'utils/addressHelpers'
import farms3Config from 'config/constants/farms3'
import { QuoteToken } from '../../config/constants/types'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

const fetchFarms3 = async () => {
  const connection = getConnection()
  const masterChef3Pubkey = new PublicKey(getMasterChef3Address())

  const data = await Promise.all(
    farms3Config.map(async (farm3Config) => {
      const lpAddress = farm3Config.lpAddresses[CLUSTER]
      const tokenMintAddress = farm3Config.tokenAddresses[CLUSTER]
      const quoteTokenMintAddress = farm3Config.quoteTokenAdresses[CLUSTER]

      if (!lpAddress || !tokenMintAddress || !quoteTokenMintAddress) {
        return {
          ...farm3Config,
          tokenAmount: '0',
          lpTotalInQuoteToken: '0',
          tokenPriceVsQuote: '0',
          poolWeight: 0,
          multiplier: '0X',
          depositFeeBP: 0,
          senzuPerBlock: 0,
        }
      }

      try {
        const tokenMintPubkey = new PublicKey(tokenMintAddress)
        const quoteTokenMintPubkey = new PublicKey(quoteTokenMintAddress)
        const lpPubkey = new PublicKey(lpAddress)

        const [tokenMintInfo, quoteTokenMintInfo, lpMintInfo] = await Promise.all([
          getMint(connection, tokenMintPubkey),
          getMint(connection, quoteTokenMintPubkey),
          getMint(connection, lpPubkey),
        ])

        const tokenDecimals = tokenMintInfo.decimals
        const quoteTokenDecimals = quoteTokenMintInfo.decimals

        const tokenAtaInLP = await getAssociatedTokenAddress(tokenMintPubkey, lpPubkey, true)
        const quoteTokenAtaInLP = await getAssociatedTokenAddress(quoteTokenMintPubkey, lpPubkey, true)
        const lpAtaInMC = await getAssociatedTokenAddress(lpPubkey, masterChef3Pubkey, true)

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

        if (farm3Config.isTokenOnly) {
          tokenAmount = lpTokenBalanceMC.div(new BigNumber(10).pow(tokenDecimals))
          if (farm3Config.tokenSymbol === QuoteToken.USDC && farm3Config.quoteTokenSymbol === QuoteToken.USDC) {
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

        const allocPoint = new BigNumber(100)
        const totalAllocPoint = new BigNumber(1000)
        const poolWeight = allocPoint.div(totalAllocPoint)
        const senzuPerBlock = 1

        return {
          ...farm3Config,
          tokenAmount: tokenAmount.toJSON(),
          lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
          tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
          poolWeight: poolWeight.toNumber(),
          multiplier: `${allocPoint.div(100).toString()}X`,
          depositFeeBP: 0,
          senzuPerBlock,
        }
      } catch (e) {
        console.error(`fetchFarms3 error for pid ${farm3Config.pid}:`, e)
        return {
          ...farm3Config,
          tokenAmount: '0',
          lpTotalInQuoteToken: '0',
          tokenPriceVsQuote: '0',
          poolWeight: 0,
          multiplier: '0X',
          depositFeeBP: 0,
          senzuPerBlock: 0,
        }
      }
    }),
  )
  return data
}

export default fetchFarms3
