import BigNumber from 'bignumber.js'
import { PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token'
import { getConnection } from 'utils/solana'
import farms3Config from 'config/constants/farms3'
import { getMasterChef3Address } from 'utils/addressHelpers'
import { getAllowance, getTokenBalance } from 'utils/erc20'

const CLUSTER = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

export const fetchFarm3UserAllowances = async (account: string) => {
  const masterChef3Address = getMasterChef3Address()

  const allowances = await Promise.all(
    farms3Config.map(async (farm) => {
      const mintAddress = farm.isTokenOnly
        ? farm.tokenAddresses[CLUSTER]
        : farm.lpAddresses[CLUSTER]
      if (!mintAddress || !masterChef3Address) return '0'
      const allowance = await getAllowance(mintAddress, account, masterChef3Address)
      return new BigNumber(allowance).toJSON()
    }),
  )
  return allowances
}

export const fetchFarm3UserTokenBalances = async (account: string) => {
  const balances = await Promise.all(
    farms3Config.map(async (farm) => {
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

export const fetchFarm3UserStakedBalances = async (account: string) => {
  const connection = getConnection()
  const masterChef3Pubkey = new PublicKey(getMasterChef3Address())

  const stakedBalances = await Promise.all(
    farms3Config.map(async (farm) => {
      const lpAddress = farm.isTokenOnly
        ? farm.tokenAddresses[CLUSTER]
        : farm.lpAddresses[CLUSTER]
      if (!lpAddress) return '0'
      try {
        const lpMintPubkey = new PublicKey(lpAddress)
        const userStakeAta = await getAssociatedTokenAddress(lpMintPubkey, masterChef3Pubkey, true)
        const stakeAccount = await getAccount(connection, userStakeAta).catch(() => null)
        return new BigNumber(stakeAccount?.amount?.toString() || '0').toJSON()
      } catch (e) {
        return '0'
      }
    }),
  )
  return stakedBalances
}

export const fetchFarm3UserEarnings = async (account: string) => {
  // Pending SENZU rewards tracked in MasterChef3 program PDA accounts.
  // Returns 0 until on-chain program is deployed.
  return farms3Config.map(() => new BigNumber(0).toJSON())
}
