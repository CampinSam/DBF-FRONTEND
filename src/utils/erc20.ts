// Solana SPL token helpers (replaces ERC20 helpers)
import { PublicKey } from '@solana/web3.js'
import { getAccount, getAssociatedTokenAddress, getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getConnection } from 'utils/solana'

/**
 * Get SPL token balance for a user wallet (replaces getTokenBalance)
 */
export const getTokenBalance = async (
  mintAddress: string,
  userAddress: string,
): Promise<string> => {
  try {
    const connection = getConnection()
    const mint = new PublicKey(mintAddress)
    const owner = new PublicKey(userAddress)
    const ata = await getAssociatedTokenAddress(mint, owner)
    const account = await getAccount(connection, ata)
    return account.amount.toString()
  } catch (e) {
    return '0'
  }
}

/**
 * Get SPL token delegation amount (replaces ERC20 allowance)
 * On Solana, token approvals work via delegate amount on the token account
 */
export const getAllowance = async (
  mintAddress: string,
  ownerAddress: string,
  delegateAddress: string,
): Promise<string> => {
  try {
    const connection = getConnection()
    const mint = new PublicKey(mintAddress)
    const owner = new PublicKey(ownerAddress)
    const ata = await getAssociatedTokenAddress(mint, owner)
    const account = await getAccount(connection, ata)
    if (account.delegate && account.delegate.toBase58() === delegateAddress) {
      return account.delegatedAmount.toString()
    }
    return '0'
  } catch (e) {
    return '0'
  }
}

/**
 * Get SPL token total supply (replaces totalSupply)
 */
export const getTokenTotalSupply = async (mintAddress: string): Promise<string> => {
  try {
    const connection = getConnection()
    const mintInfo = await getMint(connection, new PublicKey(mintAddress))
    return mintInfo.supply.toString()
  } catch (e) {
    return '0'
  }
}

/**
 * Get SPL token decimals
 */
export const getTokenDecimals = async (mintAddress: string): Promise<number> => {
  try {
    const connection = getConnection()
    const mintInfo = await getMint(connection, new PublicKey(mintAddress))
    return mintInfo.decimals
  } catch (e) {
    return 9
  }
}
