import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
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
  const { publicKey } = useWallet()
  const account = publicKey?.toBase58()
  const solBalance = useSOLBalance()
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
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await web3.eth.sendTransaction({
              from: account,
              to: contract._address,
              value: new BigNumber(value).times(new BigNumber(10).pow(18)).toString(),
            })
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </Button>
      </Flex>
      <LinkExternal
        href="https://exchange.saltswap.finance/#/add/ETH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal>
    </Modal>
  )
}

export default ContributeModal
