import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { getTokenBalance, getTokenTotalSupply } from 'utils/erc20'
import { getCakeAddress, getCake3Address } from 'utils/addressHelpers'
import { getConnection } from 'utils/solana'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import useRefresh from './useRefresh'

const useTokenBalance = (mintAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { publicKey } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return
      const res = await getTokenBalance(mintAddress, publicKey.toBase58())
      setBalance(new BigNumber(res))
    }

    if (publicKey) {
      fetchBalance()
    }
  }, [publicKey, mintAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getTokenTotalSupply(getCakeAddress())
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (_mintAddress: string) => {
  // On Solana, tokens are burned by sending to a burn address or using the burn instruction.
  // This returns 0 as a placeholder until the Solana burn address / tracking is configured.
  const [balance] = useState(new BigNumber(0))
  return balance
}

export const useTotalSupply3 = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getTokenTotalSupply(getCake3Address())
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance3 = (_mintAddress: string) => {
  // Placeholder - see useBurnedBalance
  const [balance] = useState(new BigNumber(0))
  return balance
}

export const useSOLBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { publicKey } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return
      const connection = getConnection()
      const lamports = await connection.getBalance(publicKey)
      setBalance(new BigNumber(lamports).div(LAMPORTS_PER_SOL))
    }

    if (publicKey) {
      fetchBalance()
    }
  }, [publicKey, fastRefresh])

  return balance
}

export default useTokenBalance
