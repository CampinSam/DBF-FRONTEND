import { Connection, PublicKey, Commitment } from '@solana/web3.js'
import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
const COMMITMENT: Commitment = 'confirmed'

/**
 * Returns a Solana Connection instance using our RPC endpoint
 */
export const getConnection = (): Connection => {
  return new Connection(RPC_URL, COMMITMENT)
}

/**
 * Returns an Anchor Program instance for a given IDL and program address
 */
export const getProgram = (idl: Idl, programId: string, provider: AnchorProvider): Program => {
  return new Program(idl, new PublicKey(programId), provider)
}

/**
 * Returns a read-only AnchorProvider (no wallet needed for read operations)
 */
export const getReadOnlyProvider = (): AnchorProvider => {
  const connection = getConnection()
  // Dummy wallet for read-only operations
  const dummyWallet = {
    publicKey: PublicKey.default,
    signTransaction: async (tx) => tx,
    signAllTransactions: async (txs) => txs,
  }
  return new AnchorProvider(connection, dummyWallet as any, { commitment: COMMITMENT })
}
