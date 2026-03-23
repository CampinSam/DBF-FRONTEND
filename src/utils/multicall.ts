import { PublicKey, AccountInfo } from '@solana/web3.js'
import { getConnection } from 'utils/solana'

export interface SolanaCall {
  pubkey: string | PublicKey
}

/**
 * Fetches multiple Solana accounts in a single RPC call (replaces EVM multicall)
 */
export const getMultipleAccounts = async (
  pubkeys: Array<string | PublicKey>,
): Promise<Array<AccountInfo<Buffer> | null>> => {
  const connection = getConnection()
  const publicKeys = pubkeys.map((pk) => (typeof pk === 'string' ? new PublicKey(pk) : pk))
  const result = await connection.getMultipleAccountsInfo(publicKeys)
  return result
}

/**
 * Fetches multiple parsed token accounts in a single RPC call
 */
export const getMultipleParsedAccounts = async (pubkeys: Array<string | PublicKey>) => {
  const connection = getConnection()
  const publicKeys = pubkeys.map((pk) => (typeof pk === 'string' ? new PublicKey(pk) : pk))
  const result = await connection.getMultipleParsedAccounts(publicKeys)
  return result.value
}

export default getMultipleAccounts
