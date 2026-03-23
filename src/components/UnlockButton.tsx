import React from 'react'
import { Button } from 'dragonball-uikit'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { setVisible } = useWalletModal()

  return (
    <Button onClick={() => setVisible(true)} {...props}>
      {TranslateString(292, 'Connect Wallet')}
    </Button>
  )
}

export default UnlockButton
