import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  fetchFarm3UserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, smartChefUnstake } from 'utils/callHelpers'
import { useMasterchef, useMasterchef3, useSmartChef } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChefProgram = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstake(masterChefProgram, pid, amount, wallet)
        dispatch(fetchFarmUserDataAsync(wallet.publicKey.toBase58()))
        console.info(txHash)
      } catch (e) {
        if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
          console.warn('Unstake transaction rejected by user')
        } else {
          console.error('Unstake transaction failed:', e)
        }
      }
    },
    [wallet, dispatch, masterChefProgram, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useUnstake3 = (pid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChef3Program = useMasterchef3()

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstake(masterChef3Program, pid, amount, wallet)
        dispatch(fetchFarm3UserDataAsync(wallet.publicKey.toBase58()))
        console.info(txHash)
      } catch (e) {
        if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
          console.warn('Unstake3 transaction rejected by user')
        } else {
          console.error('Unstake3 transaction failed:', e)
        }
      }
    },
    [wallet, dispatch, masterChef3Program, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useSmartUnstake = (sousId: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const smartChefProgram = useSmartChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        await smartChefUnstake(smartChefProgram, amount, wallet)
        dispatch(updateUserStakedBalance(String(sousId), wallet.publicKey.toBase58()))
        dispatch(updateUserBalance(String(sousId), wallet.publicKey.toBase58()))
        dispatch(updateUserPendingReward(String(sousId), wallet.publicKey.toBase58()))
      } catch (e) {
        if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
          console.warn('SmartUnstake transaction rejected by user')
        } else {
          console.error('SmartUnstake transaction failed:', e)
        }
      }
    },
    [wallet, dispatch, smartChefProgram, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
