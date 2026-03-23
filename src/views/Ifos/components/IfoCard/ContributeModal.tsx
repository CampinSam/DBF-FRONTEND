import React, { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from 'dragonball-uikit'
import BalanceInput from 'components/Input/BalanceInput'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useSOLBalance } from 'hooks/useTokenBalance'

interface Props {
  currency: string
  contract: any
  currencyAddress?: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, onDismiss }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const account = publicKey?.toBase58()
  const solBalance = useSOLBalance()

  const handleContribute = async () => {
    if (!publicKey || !contract) return
    setPendingTx(true)
    try {
      const lamports = new BigNumber(value).times(LAMPORTS_PER_SOL).toNumber()
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(contract),
          lamports,
        }),
      )
      await sendTransaction(transaction, connection)
    } catch (e) {
      console.error(e)
    } finally {
      setPendingTx(false)
      onDismiss()
    }
  }

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={getFullDisplayBalance(solBalance.times(LAMPORTS_PER_SOL))}
        onSelectMax={() => setValue(solBalance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button fullWidth disabled={pendingTx} onClick={handleContribute}>
          Confirm
        </Button>
      </Flex>
      <LinkExternal
        href="https://raydium.io/swap/?inputCurrency=sol"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal>
    </Modal>
  )
}

export default ContributeModal
