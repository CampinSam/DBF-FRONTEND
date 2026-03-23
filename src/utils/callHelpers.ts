import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import {
  createApproveInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
} from '@solana/spl-token'
import BigNumber from 'bignumber.js'
import { Program, BN } from '@coral-xyz/anchor'
import { getConnection } from 'utils/solana'

const SOL_DECIMALS = 9

const toSolAmount = (amount: string, decimals = SOL_DECIMALS): BN => {
  return new BN(new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toFixed(0))
}

/**
 * Approve SPL token delegation to the farming program (replaces ERC20.approve)
 */
export const approve = async (
  mintAddress: PublicKey,
  programId: PublicKey,
  wallet: any,
  amount: BN = new BN('18446744073709551615'), // u64::MAX
): Promise<string> => {
  const connection = getConnection()
  const tokenAccount = await getAssociatedTokenAddress(mintAddress, wallet.publicKey)

  const tx = new Transaction().add(
    createApproveInstruction(tokenAccount, programId, wallet.publicKey, BigInt(amount.toString())),
  )

  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Deposit / stake LP tokens into the farming program (replaces masterChef.deposit)
 */
export const stake = async (
  farmProgram: Program,
  pid: number,
  amount: string,
  wallet: any,
  decimals = SOL_DECIMALS,
): Promise<string> => {
  const amountBN = toSolAmount(amount, decimals)
  const tx = await farmProgram.methods
    .deposit(pid, amountBN)
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Stake SOL directly (replaces smartStakeBnb)
 */
export const stakeSOL = async (
  farmProgram: Program,
  amount: string,
  wallet: any,
): Promise<string> => {
  const amountBN = toSolAmount(amount, SOL_DECIMALS)
  const tx = await farmProgram.methods
    .depositSol(amountBN)
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Smart stake for a pool (replaces smartStake)
 */
export const smartStake = async (
  poolProgram: Program,
  amount: string,
  wallet: any,
  decimals = SOL_DECIMALS,
): Promise<string> => {
  const amountBN = toSolAmount(amount, decimals)
  const tx = await poolProgram.methods
    .deposit(amountBN)
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Smart stake SOL for a pool (replaces smartStakeBnb)
 */
export const smartStakeSOL = async (
  poolProgram: Program,
  amount: string,
  wallet: any,
): Promise<string> => {
  return stakeSOL(poolProgram, amount, wallet)
}

/**
 * Withdraw / unstake LP tokens from the farming program (replaces masterChef.withdraw)
 */
export const unstake = async (
  farmProgram: Program,
  pid: number,
  amount: string,
  wallet: any,
  decimals = SOL_DECIMALS,
): Promise<string> => {
  const amountBN = toSolAmount(amount, decimals)
  const tx = await farmProgram.methods
    .withdraw(pid, amountBN)
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Unstake from a SmartChef pool (replaces smartChefUnstake / sousUnstake)
 */
export const smartChefUnstake = async (
  poolProgram: Program,
  amount: string,
  wallet: any,
  decimals = SOL_DECIMALS,
): Promise<string> => {
  const amountBN = toSolAmount(amount, decimals)
  const tx = await poolProgram.methods
    .withdraw(amountBN)
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Emergency withdraw from a pool (replaces emergencyWithdraw)
 */
export const emergencyWithdraw = async (poolProgram: Program, wallet: any): Promise<string> => {
  const tx = await poolProgram.methods
    .emergencyWithdraw()
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Harvest / claim rewards from a farm (replaces masterChef.deposit(pid, 0))
 */
export const harvest = async (farmProgram: Program, pid: number, wallet: any): Promise<string> => {
  const tx = await farmProgram.methods
    .harvest(pid)
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Harvest from a SmartChef pool (replaces smartHarvest)
 */
export const smartHarvest = async (poolProgram: Program, wallet: any): Promise<string> => {
  const tx = await poolProgram.methods
    .harvest()
    .accounts({ user: wallet.publicKey })
    .transaction()

  const connection = getConnection()
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash
  tx.feePayer = wallet.publicKey

  const signed = await wallet.signTransaction(tx)
  const txHash = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(txHash, 'confirmed')
  return txHash
}

/**
 * Harvest SOL rewards from a pool (replaces smartHarvestBnb)
 */
export const smartHarvestSOL = async (poolProgram: Program, wallet: any): Promise<string> => {
  return smartHarvest(poolProgram, wallet)
}
