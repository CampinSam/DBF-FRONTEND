import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import poolsConfig from 'config/constants/pools'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
// import CoinGecko from 'coingecko-api'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, fetchFarms3PublicDataAsync } from './actions'
import { State, Farm, Pool, Farm3 } from './types'
import { QuoteToken } from '../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

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

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 43 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm?.tokenPriceVsQuote ? new BigNumber(farm?.tokenPriceVsQuote) : ZERO
}

export const usePriceCakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 33; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

// export const usePriceEthBusd = (): BigNumber => {
//   const [ethPrice, setEthPrice] = useState(new BigNumber(1900))

//   useEffect(() => {
//     const fetchPrice = async () => {
//       const CoinGeckoClient = new CoinGecko()
//       const result = await CoinGeckoClient.coins.fetch('ethereum', {})
//       setEthPrice(new BigNumber(result.data?.market_data?.current_price?.usd))
//     }

//     fetchPrice()
//   }, [])

//   return ethPrice
// }


export const usePriceEthBusd = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xd9A0d1F5e02dE2403f68Bb71a15F8847A854b494'
      const [wbnbTokenBalanceLP, eggTokenBalanceLP] = await multicall(erc20, [
        {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!eggTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(eggTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}


export const usePriceCake2Busd = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x0Ed8E0A2D99643e1e65CCA22Ed4424090B8B7458'
      const [wbnbTokenBalanceLP, eggTokenBalanceLP] = await multicall(erc20, [
        {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!eggTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(eggTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

// export const usePriceBTCBBusd = (): BigNumber => {
//   const [btcbPrice, setEthPrice] = useState(new BigNumber(10))

//   useEffect(() => {
//     const fetchPrice = async () => {
//       const CoinGeckoClient = new CoinGecko()
//       const result = await CoinGeckoClient.coins.fetch('bitcoinbrand', {})
//       setEthPrice(new BigNumber(result.data?.market_data?.current_price?.usd))
//     }

//     fetchPrice()
//   }, [])

//   return btcbPrice
// }

export const usePriceBTCBBusd = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xb8875e207EE8096a929D543C9981C9586992eAcb' // BTCB/BNB LP
      const [wbnbTokenBalanceLP, btcbTokenBalanceLP] = await multicall(erc20, [
        {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!btcbTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(btcbTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const bnbPrice = usePriceBnbBusd()
  const senzuPrice = usePrice3CakeBusd()
  const cake2Price = usePriceCake2Busd()
  const ethPrice = usePriceEthBusd()
  const btcbPrice2 = usePriceBTCBBusd()

  

  const usdtPrice: BigNumber = useMemo(() => {
    return new BigNumber(1)
  }, [])
  const cakePrice = usePriceCakeBusd()

  const { account } = useWallet()
  const pools = usePools(account)
  const totalValue = useRef(new BigNumber(0))

  useEffect(() => {
    let farmsTotalValue = new BigNumber(0)
    for (let i = 0; i < farms.length; i++) {
      const farm = farms[i]
      if (farm.lpTotalInQuoteToken) {
        let val
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          val = bnbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.SENZU) {
          val = senzuPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE2) {
          val = cake2Price.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          val = cakePrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.USDT) {
          val = usdtPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BTCB) {
          val = btcbPrice2.times(farm.lpTotalInQuoteToken)
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
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = cakePrice.times(totalSaltStaked)
      }

      poolsTotalValue = poolsTotalValue.plus(poolValue ?? ZERO)
    }

    totalValue.current = farmsTotalValue
  }, [bnbPrice, senzuPrice, farms, pools, cakePrice, cake2Price, usdtPrice, ethPrice, btcbPrice2])

  if (!totalValue) {
    return new BigNumber(0)
  }
  return totalValue.current
}


// Prices3

export const usePrice3BnbBusd = (): BigNumber => {
  const pid = 9 // BUSD-BNB LP
  const farm = useFarm3FromPid(pid)
  return farm?.tokenPriceVsQuote ? new BigNumber(farm?.tokenPriceVsQuote) : ZERO
}

export const usePrice3CakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 1; // EGG-BUSD LP
  const farm = useFarm3FromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const useTotalValue3 = (): BigNumber => {
  const farms = useFarms3();
  const bnbPrice = usePrice3BnbBusd();
  const cakePrice = usePrice3CakeBusd();


  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val;
      if (farm.quoteTokenSymbol === QuoteToken.BNB) {
        val = (bnbPrice.times(farm.lpTotalInQuoteToken));
      }else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        val = (cakePrice.times(farm.lpTotalInQuoteToken));
      }else{
        val = (farm.lpTotalInQuoteToken);
      }
      value = value.plus(val);

    }
  }
  return value;
}