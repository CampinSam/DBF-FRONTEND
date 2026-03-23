import React, { useState } from 'react'
import { useModal, Text } from 'dragonball-uikit'
import { useWallet } from '@solana/wallet-adapter-react'
import BigNumber from 'bignumber.js'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: string
  status: IfoStatus
  raisingAmount: BigNumber
  softCapReached: boolean
  finalized: boolean
}

const IfoCardContribute: React.FC<Props> = ({
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  softCapReached,
  finalized,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const contributions = new BigNumber(0)
  const claimedTokens = new BigNumber(0)
  const refundedTokens = new BigNumber(0)
  const tokensPerBnb = new BigNumber(0)

  const { publicKey } = useWallet()
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  const isFinished = status === 'finished' || finalized
  const percentOfUserContribution = contributions.div(raisingAmount).times(100)

  const userClaimed = isFinished && claimedTokens.isGreaterThan(0)
  const userRefunded = isFinished && refundedTokens.isGreaterThan(0)
  const claimableTokens = getBalanceNumber(contributions) * getBalanceNumber(tokensPerBnb)

  const getButtonLabel = () => {
    if (!isFinished) return 'Contribute'
    if (softCapReached) return 'Claim'
    return 'Refund'
  }

  const getLabel = () => {
    if (!isFinished) return `Your contribution (${currency})`
    if (softCapReached) return 'Your tokens to claim'
    return 'Your tokens to refund'
  }

  const getButtonValue = () => {
    if (!isFinished) return getBalanceNumber(contributions, 18).toFixed(4)
    if (softCapReached) return userClaimed ? 'Claimed' : claimableTokens.toFixed(4)
    return userRefunded ? 'Refunded' : claimableTokens.toFixed(4)
  }

  const getButtonHint = () => {
    if (!isFinished) return `${percentOfUserContribution.toFixed(5)}% of total`
    if (softCapReached) return `You'll be refunded any excess tokens when you claim`
    return `You'll be refunded all your contributions`
  }

  const handleOnClick = () => {
    if (!isFinished) return onPresentContributeModal
    return undefined
  }

  return (
    <>
      <LabelButton
        disabled={pendingTx || userClaimed || userRefunded}
        buttonLabel={getButtonLabel()}
        label={getLabel()}
        value={getButtonValue()}
        onClick={handleOnClick()}
      />
      <Text fontSize="14px" color="textSubtle">
        {getButtonHint()}
      </Text>
    </>
  )
}

export default IfoCardContribute
