import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, fetchFarm3UserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, stakeSOL, smartStake, smartStakeSOL } from 'utils/callHelpers'
import { useMasterchef, useMasterchef3, useSmartChef } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChefProgram = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stake(masterChefProgram, pid, amount, wallet)
        dispatch(fetchFarmUserDataAsync(wallet.publicKey.toBase58()))
        console.info(txHash)
      } catch (e) {
        if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
          console.warn('Stake transaction rejected by user')
        } else {
          console.error('Stake transaction failed:', e)
        }
      }
    },
    [wallet, dispatch, masterChefProgram, pid],
  )

  return { onStake: handleStake }
}

export const useStake3 = (pid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChef3Program = useMasterchef3()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stake(masterChef3Program, pid, amount, wallet)
        dispatch(fetchFarm3UserDataAsync(wallet.publicKey.toBase58()))
        console.info(txHash)
      } catch (e) {
        if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
          console.warn('Stake3 transaction rejected by user')
        } else {
          console.error('Stake3 transaction failed:', e)
        }
      }
    },
    [wallet, dispatch, masterChef3Program, pid],
  )

  return { onStake: handleStake }
}

export const useSmartStake = (sousId: number, isUsingSOL = false) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const smartChefProgram = useSmartChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const stakeFn = isUsingSOL ? smartStakeSOL : smartStake
        await stakeFn(smartChefProgram, amount, wallet)
        dispatch(updateUserStakedBalance(String(sousId), wallet.publicKey.toBase58()))
        dispatch(updateUserBalance(String(sousId), wallet.publicKey.toBase58()))
      } catch (e) {
        if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
          console.warn('SmartStake transaction rejected by user')
        } else {
          console.error('SmartStake transaction failed:', e)
        }
      }
    },
    [wallet, dispatch, isUsingSOL, smartChefProgram, sousId],
  )

  return { onStake: handleStake }
}

export default useStake
