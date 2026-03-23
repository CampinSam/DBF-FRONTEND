import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { farmsConfig, farms3Config } from 'config/constants'
import { fetchFarmUserEarnings } from 'state/farms/fetchFarmUser'
import { fetchFarm3UserEarnings } from 'state/farms3/fetchFarmUser3'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { publicKey } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      if (!publicKey) return
      const earnings = await fetchFarmUserEarnings(publicKey.toBase58())
      setBalance(earnings)
    }

    if (publicKey) {
      fetchAllBalances()
    }
  }, [publicKey, fastRefresh])

  return balances
}

export const useAllEarnings3 = () => {
  const [balances, setBalance] = useState([])
  const { publicKey } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      if (!publicKey) return
      const earnings = await fetchFarm3UserEarnings(publicKey.toBase58())
      setBalance(earnings)
    }

    if (publicKey) {
      fetchAllBalances()
    }
  }, [publicKey, fastRefresh])

  return balances
}

export default useAllEarnings
