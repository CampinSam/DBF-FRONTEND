import { useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, fetchFarm3UserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { smartHarvest, smartHarvestSOL, harvest } from 'utils/callHelpers'
import { useMasterchef, useMasterchef3, useSmartChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChefProgram = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefProgram, farmPid, wallet)
    dispatch(fetchFarmUserDataAsync(wallet.publicKey.toBase58()))
    return txHash
  }, [wallet, dispatch, farmPid, masterChefProgram])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const wallet = useWallet()
  const masterChefProgram = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefProgram, pid, wallet)]
    }, [])

    return Promise.all(harvestPromises)
  }, [wallet, farmPids, masterChefProgram])

  return { onReward: handleHarvest }
}

export const useHarvest3 = (farmPid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChef3Program = useMasterchef3()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChef3Program, farmPid, wallet)
    dispatch(fetchFarm3UserDataAsync(wallet.publicKey.toBase58()))
    return txHash
  }, [wallet, dispatch, farmPid, masterChef3Program])

  return { onReward: handleHarvest }
}

export const useAllHarvest3 = (farmPids: number[]) => {
  const wallet = useWallet()
  const masterChef3Program = useMasterchef3()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChef3Program, pid, wallet)]
    }, [])

    return Promise.all(harvestPromises)
  }, [wallet, farmPids, masterChef3Program])

  return { onReward: handleHarvest }
}

export const useSmartChefHarvest = (sousId, isUsingSOL = false) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const smartChefProgram = useSmartChef(sousId)

  const handleHarvest = useCallback(async () => {
    const harvestFn = isUsingSOL ? smartHarvestSOL : smartHarvest
    await harvestFn(smartChefProgram, wallet)
    dispatch(updateUserPendingReward(sousId, wallet.publicKey.toBase58()))
    dispatch(updateUserBalance(sousId, wallet.publicKey.toBase58()))
  }, [wallet, dispatch, isUsingSOL, smartChefProgram, sousId])

  return { onReward: handleHarvest }
}
