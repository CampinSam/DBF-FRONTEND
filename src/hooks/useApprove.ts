import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useDispatch } from 'react-redux'
import { updateUserAllowance, fetchFarmUserDataAsync, fetchFarm3UserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useMasterchef, useMasterchef3, useCake, useLottery, useSmartChef } from './useContract'

// Approve a Farm's LP token for the MasterChef program
export const useApprove = (mintAddress: string) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChefAddress = useMasterchef()?.programId

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(
        new PublicKey(mintAddress),
        masterChefAddress,
        wallet,
      )
      dispatch(fetchFarmUserDataAsync(wallet.publicKey.toBase58()))
      return tx
    } catch (e) {
      return false
    }
  }, [wallet, dispatch, mintAddress, masterChefAddress])

  return { onApprove: handleApprove }
}

// Approve a Farm3 LP token for the MasterChef3 program
export const useApprove3 = (mintAddress: string) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChef3Address = useMasterchef3()?.programId

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(
        new PublicKey(mintAddress),
        masterChef3Address,
        wallet,
      )
      dispatch(fetchFarm3UserDataAsync(wallet.publicKey.toBase58()))
      return tx
    } catch (e) {
      return false
    }
  }, [wallet, dispatch, mintAddress, masterChef3Address])

  return { onApprove: handleApprove }
}

// Approve a Pool's staking token for the SmartChef program
export const useSousApprove = (mintAddress: string, sousId: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const smartChefProgram = useSmartChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(
        new PublicKey(mintAddress),
        smartChefProgram?.programId,
        wallet,
      )
      dispatch(updateUserAllowance(String(sousId), wallet.publicKey.toBase58()))
      return tx
    } catch (e) {
      return false
    }
  }, [wallet, dispatch, mintAddress, smartChefProgram, sousId])

  return { onApprove: handleApprove }
}

// Approve DBALL for the lottery program
export const useLotteryApprove = () => {
  const wallet = useWallet()
  const cakeMint = useCake()
  const lotteryProgram = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(
        new PublicKey(cakeMint),
        lotteryProgram?.programId,
        wallet,
      )
      return tx
    } catch (e) {
      return false
    }
  }, [wallet, cakeMint, lotteryProgram])

  return { onApprove: handleApprove }
}
