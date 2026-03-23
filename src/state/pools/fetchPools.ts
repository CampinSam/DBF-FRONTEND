import poolsConfig from 'config/constants/pools'
import { getTokenBalance } from 'utils/erc20'
import BigNumber from 'bignumber.js'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

export const fetchPoolsSlotLimits = async () => {
  // On Solana, pools use slot numbers instead of block numbers.
  // Until the on-chain pool programs are deployed, return placeholder values.
  return poolsConfig.map((poolConfig) => ({
    sousId: poolConfig.sousId,
    startBlock: new BigNumber(0).toJSON(),  // startSlot
    endBlock: new BigNumber(9999999).toJSON(), // endSlot
  }))
}

export const fetchPoolsTotalStaking = async () => {
  const totals = await Promise.all(
    poolsConfig.map(async (pool) => {
      const stakingTokenMint = pool.stakingTokenAddress?.[CLUSTER]
      const contractAddress = pool.contractAddress[CLUSTER]
      if (!stakingTokenMint || !contractAddress) {
        return { sousId: pool.sousId, totalStaked: new BigNumber(0).toJSON() }
      }
      // Get the staking vault's token balance (LP/token held by the pool contract)
      const totalStaked = await getTokenBalance(stakingTokenMint, contractAddress)
      return {
        sousId: pool.sousId,
        totalStaked: new BigNumber(totalStaked).toJSON(),
      }
    }),
  )
  return totals
}
