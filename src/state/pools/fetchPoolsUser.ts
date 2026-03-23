import pools from 'config/constants/pools'
import { QuoteToken } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getConnection } from 'utils/solana'
import { getAllowance, getTokenBalance } from 'utils/erc20'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

// Non-SOL pools: SPL token staking
const nonSolPools = pools.filter((p) => p.stakingTokenName !== QuoteToken.SOL)
// SOL pools: native SOL staking
const solPools = pools.filter((p) => p.stakingTokenName === QuoteToken.SOL)

export const fetchPoolsAllowance = async (account: string) => {
  const allowancesMap = await Promise.all(
    nonSolPools.map(async (pool) => {
      const stakingMint = pool.stakingTokenAddress?.[CLUSTER]
      const contractAddress = pool.contractAddress[CLUSTER]
      if (!stakingMint || !contractAddress) {
        return { sousId: pool.sousId, allowance: '0' }
      }
      const allowance = await getAllowance(stakingMint, account, contractAddress)
      return { sousId: pool.sousId, allowance: new BigNumber(allowance).toJSON() }
    }),
  )
  return allowancesMap.reduce((acc, { sousId, allowance }) => ({ ...acc, [sousId]: allowance }), {})
}

export const fetchUserBalances = async (account: string) => {
  // SPL token balances
  const tokenBalances = await Promise.all(
    nonSolPools.map(async (pool) => {
      const stakingMint = pool.stakingTokenAddress?.[CLUSTER]
      if (!stakingMint) return { sousId: pool.sousId, balance: '0' }
      const balance = await getTokenBalance(stakingMint, account)
      return { sousId: pool.sousId, balance: new BigNumber(balance).toJSON() }
    }),
  )
  const tokenBalancesMap = tokenBalances.reduce(
    (acc, { sousId, balance }) => ({ ...acc, [sousId]: balance }),
    {},
  )

  // Native SOL balance
  const connection = getConnection()
  const { PublicKey } = await import('@solana/web3.js')
  const lamports = await connection.getBalance(new PublicKey(account))
  const solBalance = new BigNumber(lamports).toJSON()
  const solBalancesMap = solPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: solBalance }),
    {},
  )

  return { ...tokenBalancesMap, ...solBalancesMap }
}

export const fetchUserStakeBalances = async (account: string) => {
  // Pool stake accounts are managed by the Anchor program PDA.
  // Returns 0 until on-chain programs are deployed.
  return pools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(0).toJSON() }),
    {},
  )
}

export const fetchUserPendingRewards = async (account: string) => {
  // Pending rewards are tracked in the pool program's PDA accounts.
  // Returns 0 until on-chain programs are deployed.
  return pools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(0).toJSON() }),
    {},
  )
}
