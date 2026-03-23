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
    try {
      const txHash = await harvest(masterChefProgram, farmPid, wallet)
      dispatch(fetchFarmUserDataAsync(wallet.publicKey.toBase58()))
      return txHash
    } catch (e) {
      if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
        console.warn('Harvest transaction rejected by user')
      } else {
        console.error('Harvest transaction failed:', e)
      }
      return null
    }
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

    return Promise.allSettled(harvestPromises).then((results) => {
      results.forEach((result, i) => {
        if (result.status === 'rejected') {
          console.error(`Harvest failed for pid ${farmPids[i]}:`, result.reason)
        }
      })
      return results
    })
  }, [wallet, farmPids, masterChefProgram])

  return { onReward: handleHarvest }
}

export const useHarvest3 = (farmPid: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const masterChef3Program = useMasterchef3()

  const handleHarvest = useCallback(async () => {
    try {
      const txHash = await harvest(masterChef3Program, farmPid, wallet)
      dispatch(fetchFarm3UserDataAsync(wallet.publicKey.toBase58()))
      return txHash
    } catch (e) {
      if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
        console.warn('Harvest3 transaction rejected by user')
      } else {
        console.error('Harvest3 transaction failed:', e)
      }
      return null
    }
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

    return Promise.allSettled(harvestPromises).then((results) => {
      results.forEach((result, i) => {
        if (result.status === 'rejected') {
          console.error(`Harvest3 failed for pid ${farmPids[i]}:`, result.reason)
        }
      })
      return results
    })
  }, [wallet, farmPids, masterChef3Program])

  return { onReward: handleHarvest }
}

export const useSmartChefHarvest = (sousId: number, isUsingSOL = false) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const smartChefProgram = useSmartChef(sousId)

  const handleHarvest = useCallback(async () => {
    try {
      const harvestFn = isUsingSOL ? smartHarvestSOL : smartHarvest
      await harvestFn(smartChefProgram, wallet)
      dispatch(updateUserPendingReward(sousId, wallet.publicKey.toBase58()))
      dispatch(updateUserBalance(sousId, wallet.publicKey.toBase58()))
    } catch (e) {
      if (e instanceof Error && e.message.toLowerCase().includes('user rejected')) {
        console.warn('SmartChef harvest rejected by user')
      } else {
        console.error('SmartChef harvest failed:', e)
      }
    }
  }, [wallet, dispatch, isUsingSOL, smartChefProgram, sousId])

  return { onReward: handleHarvest }
}
