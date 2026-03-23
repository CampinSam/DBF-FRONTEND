import { useEffect, useState, useMemo } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor'
import {
  getMasterChefAddress,
  getMasterChef3Address,
  getCakeAddress,
  getCake3Address,
  getLotteryAddress,
  getLotteryTicketAddress,
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import masterChefIdl from 'config/abi/masterchef.json'
import masterChef3Idl from 'config/abi/masterchef3.json'
import sousChefIdl from 'config/abi/sousChef.json'
import lotteryIdl from 'config/abi/lottery.json'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

/**
 * Base hook: creates an Anchor Program instance for a given IDL and program ID
 */
const useProgram = (idl: Idl, programId: string): Program | null => {
  const { connection } = useConnection()
  const wallet = useWallet()

  return useMemo(() => {
    if (!wallet.publicKey) return null
    const provider = new AnchorProvider(connection, wallet as any, { commitment: 'confirmed' })
    return new Program(idl, new PublicKey(programId), provider)
  }, [connection, wallet, idl, programId])
}

/**
 * Helper hooks to get specific Anchor programs
 */

export const useMasterchef = (): Program | null => {
  return useProgram(masterChefIdl as Idl, getMasterChefAddress())
}

export const useMasterchef3 = (): Program | null => {
  return useProgram(masterChef3Idl as Idl, getMasterChef3Address())
}

export const useSmartChef = (sousId: number): Program | null => {
  const config = poolsConfig.find((pool) => pool.sousId === sousId)
  const programId = config?.contractAddress[CLUSTER]
  return useProgram(sousChefIdl as Idl, programId || '')
}

export const useLottery = (): Program | null => {
  return useProgram(lotteryIdl as Idl, getLotteryAddress())
}

export const useCake = () => {
  return getCakeAddress()
}

export const useCake3 = () => {
  return getCake3Address()
}

export default useProgram
