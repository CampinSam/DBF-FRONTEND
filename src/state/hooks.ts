import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, fetchFarms3PublicDataAsync } from './actions'
import { State, Farm, Pool, Farm3 } from './types'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
    dispatch(fetchFarms3PublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Farms3

export const useFarms3 = (): Farm3[] => {
  const farms3 = useSelector((state: State) => state.farms3.data)
  return farms3
}

export const useFarm3FromPid = (pid): Farm3 => {
  const farm3 = useSelector((state: State) => state.farms3.data.find((f) => f.pid === pid))
  return farm3
}

export const useFarm3FromSymbol = (lpSymbol: string): Farm3 => {
  const farm3 = useSelector((state: State) => state.farms3.data.find((f) => f.lpSymbol === lpSymbol))
  return farm3
}

export const useFarm3User = (pid) => {
  const farm3 = useFarm3FromPid(pid)

  return {
    allowance: farm3.userData ? new BigNumber(farm3.userData.allowance) : new BigNumber(0),
    tokenBalance: farm3.userData ? new BigNumber(farm3.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm3.userData ? new BigNumber(farm3.userData.stakedBalance) : new BigNumber(0),
    earnings: farm3.userData ? new BigNumber(farm3.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account: string): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return useSelector((state: State) => state.pools.data)
}

export const usePoolFromPid = (sousId: number): Pool =>
  useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))

// Prices
// SOL price derived from SOL-USDC LP farm (pid 43)

export const usePriceSolUsdc = (): BigNumber => {
  const pid = 43 // SOL-USDC LP
  const farm = useFarmFromPid(pid)
  return farm?.tokenPriceVsQuote ? new BigNumber(farm?.tokenPriceVsQuote) : ZERO
}

// Keep usePriceBnbBusd as alias for backwards compatibility with views
export const usePriceBnbBusd = usePriceSolUsdc

export const usePriceCakeBusd = (): BigNumber => {
  const pid = 33 // DBALL-USDC LP
  const farm = useFarmFromPid(pid)
  return farm?.tokenPriceVsQuote ? new BigNumber(farm?.tokenPriceVsQuote) : ZERO
}

export const usePriceEthBusd = (): BigNumber => {
  const pid = 45 // ETH-SOL LP
  const solPrice = usePriceSolUsdc()
  const farm = useFarmFromPid(pid)
  return farm?.tokenPriceVsQuote ? solPrice.times(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceCake2Busd = (): BigNumber => {
  // Placeholder - no PancakeSwap CAKE equivalent on Solana
  return ZERO
}

export const usePriceBTCBBusd = (): BigNumber => {
  const pid = 46 // BTC-SOL LP
  const solPrice = usePriceSolUsdc()
  const farm = useFarmFromPid(pid)
  return farm?.tokenPriceVsQuote ? solPrice.times(farm.tokenPriceVsQuote) : ZERO
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const solPrice = usePriceSolUsdc()
  const senzuPrice = usePrice3CakeBusd()
  const ethPrice = usePriceEthBusd()
  const btcbPrice = usePriceBTCBBusd()

  const usdtPrice: BigNumber = useMemo(() => new BigNumber(1), [])
  const cakePrice = usePriceCakeBusd()

  const { publicKey } = useWallet()
  const account = publicKey?.toBase58()
  const pools = usePools(account)
  const totalValue = useRef(new BigNumber(0))

  useEffect(() => {
    let farmsTotalValue = new BigNumber(0)
    for (let i = 0; i < farms.length; i++) {
      const farm = farms[i]
      if (farm.lpTotalInQuoteToken) {
        let val
        if (farm.quoteTokenSymbol === QuoteToken.SOL) {
          val = solPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.SENZU) {
          val = senzuPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          val = cakePrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.USDT) {
          val = usdtPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BTCB) {
          val = btcbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          val = ethPrice.times(farm.lpTotalInQuoteToken)
        } else {
          val = farm.lpTotalInQuoteToken
        }
        farmsTotalValue = farmsTotalValue.plus(val)
      }
    }

    let poolsTotalValue = new BigNumber(0)
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      let poolValue: BigNumber
      if (pool.stakingTokenName === QuoteToken.DBALL) {
        const totalStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(9))
        poolValue = cakePrice.times(totalStaked)
      }
      poolsTotalValue = poolsTotalValue.plus(poolValue ?? ZERO)
    }

    totalValue.current = farmsTotalValue.plus(poolsTotalValue)
  }, [solPrice, senzuPrice, farms, pools, cakePrice, usdtPrice, ethPrice, btcbPrice])

  if (!totalValue) {
    return new BigNumber(0)
  }
  return totalValue.current
}

// Prices3 (Layer farms)

export const usePrice3SolUsdc = (): BigNumber => {
  const pid = 9 // SOL-USDC LP in farms3
  const farm = useFarm3FromPid(pid)
  return farm?.tokenPriceVsQuote ? new BigNumber(farm?.tokenPriceVsQuote) : ZERO
}

// Keep BNB alias for backwards compat
export const usePrice3BnbBusd = usePrice3SolUsdc

export const usePrice3CakeBusd = (): BigNumber => {
  const pid = 1 // SL1-USDC LP in farms3
  const farm = useFarm3FromPid(pid)
  return farm?.tokenPriceVsQuote ? new BigNumber(farm?.tokenPriceVsQuote) : ZERO
}

export const useTotalValue3 = (): BigNumber => {
  const farms = useFarms3()
  const solPrice = usePrice3SolUsdc()
  const cakePrice = usePrice3CakeBusd()

  let value = new BigNumber(0)
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val
      if (farm.quoteTokenSymbol === QuoteToken.SOL) {
        val = solPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        val = cakePrice.times(farm.lpTotalInQuoteToken)
      } else {
        val = farm.lpTotalInQuoteToken
      }
      value = value.plus(val)
    }
  }
  return value
}
