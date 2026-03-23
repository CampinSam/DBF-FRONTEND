import BigNumber from 'bignumber.js'
import { PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'
import { getConnection } from 'utils/solana'
import farmsConfig from 'config/constants/farms'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { getAllowance, getTokenBalance } from 'utils/erc20'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

export const fetchFarmUserAllowances = async (account: string) => {
  const masterChefAddress = getMasterChefAddress()

  const allowances = await Promise.all(
    farmsConfig.map(async (farm) => {
      const mintAddress = farm.isTokenOnly
        ? farm.tokenAddresses[CLUSTER]
        : farm.lpAddresses[CLUSTER]
      if (!mintAddress || !masterChefAddress) return '0'
      const allowance = await getAllowance(mintAddress, account, masterChefAddress)
      return new BigNumber(allowance).toJSON()
    }),
  )
  return allowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const balances = await Promise.all(
    farmsConfig.map(async (farm) => {
      const mintAddress = farm.isTokenOnly
        ? farm.tokenAddresses[CLUSTER]
        : farm.lpAddresses[CLUSTER]
      if (!mintAddress) return '0'
      const balance = await getTokenBalance(mintAddress, account)
      return new BigNumber(balance).toJSON()
    }),
  )
  return balances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const connection = getConnection()
  const masterChefPubkey = new PublicKey(getMasterChefAddress())
  const ownerPubkey = new PublicKey(account)

  const stakedBalances = await Promise.all(
    farmsConfig.map(async (farm) => {
      const lpAddress = farm.isTokenOnly
        ? farm.tokenAddresses[CLUSTER]
        : farm.lpAddresses[CLUSTER]
      if (!lpAddress) return '0'
      try {
        // On Solana, staked amounts are tracked in the MasterChef program's PDA accounts
        // This reads the user's staked LP token account managed by the program
        const lpMintPubkey = new PublicKey(lpAddress)
        const userStakeAta = await getAssociatedTokenAddress(lpMintPubkey, masterChefPubkey, true)
        const stakeAccount = await getAccount(connection, userStakeAta).catch(() => null)
        return new BigNumber(stakeAccount?.amount?.toString() || '0').toJSON()
      } catch (e) {
        return '0'
      }
    }),
  )
  return stakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  // Pending rewards are tracked in the MasterChef program's PDA accounts.
  // Until the Anchor IDL / on-chain program is deployed, return 0 as placeholder.
  return farmsConfig.map(() => new BigNumber(0).toJSON())
}
