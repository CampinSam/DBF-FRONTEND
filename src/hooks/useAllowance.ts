import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCake, useLottery } from './useContract'
import { getAllowance } from '../utils/erc20'

// Retrieve lottery token delegation amount (replaces lottery allowance)
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { publicKey } = useWallet()
  const lotteryProgram = useLottery()
  const cakeMint = useCake()

  useEffect(() => {
    const fetchAllowance = async () => {
      if (!publicKey || !lotteryProgram) return
      const res = await getAllowance(
        cakeMint,
        publicKey.toBase58(),
        lotteryProgram.programId.toBase58(),
      )
      setAllowance(new BigNumber(res))
    }

    if (publicKey && cakeMint) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [publicKey, cakeMint, lotteryProgram])

  return allowance
}
