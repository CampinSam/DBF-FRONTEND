import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { farmsConfig, farms3Config } from 'config/constants'
import { FarmConfig, Farm3Config } from 'config/constants/types'
import { fetchFarmUserEarnings } from 'state/farms/fetchFarmUser'
import { fetchFarm3UserEarnings } from 'state/farms3/fetchFarmUser3'
import useRefresh from './useRefresh'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

export interface Farm3WithBalance extends Farm3Config {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { publicKey } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) return
      const earnings = await fetchFarmUserEarnings(publicKey.toBase58())
      const results = farmsConfig.map((farm, index) => ({
        ...farm,
        balance: new BigNumber(earnings[index] || 0),
      }))
      setFarmsWithBalances(results)
    }

    if (publicKey) {
      fetchBalances()
    }
  }, [publicKey, fastRefresh])

  return farmsWithBalances
}

export const useFarms3WithBalance = () => {
  const [farms3WithBalances, setFarms3WithBalances] = useState<Farm3WithBalance[]>([])
  const { publicKey } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) return
      const earnings = await fetchFarm3UserEarnings(publicKey.toBase58())
      const results = farms3Config.map((farm, index) => ({
        ...farm,
        balance: new BigNumber(earnings[index] || 0),
      }))
      setFarms3WithBalances(results)
    }

    if (publicKey) {
      fetchBalances()
    }
  }, [publicKey, fastRefresh])

  return farms3WithBalances
}

export default useFarmsWithBalance
