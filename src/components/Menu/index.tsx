import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'dragonball-uikit'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd, usePriceCake2Busd } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { publicKey, disconnect } = useSolanaWallet()
  const account = publicKey?.toBase58()
  const { setVisible } = useWalletModal()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const cakePrice2Usd = usePriceCake2Busd()

  return (
    <UikitMenu
      account={account}
      login={() => setVisible(true)}
      logout={disconnect}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      cakePrice2Usd={cakePrice2Usd.toNumber()}
      links={config}
      priceLink="https://solscan.io/token/DBaLLTokenMintAddressMainnet11111111111111111"
      priceLink2="https://solscan.io/token/SENZUTokenMintAddressMainnet1111111111111111"
      {...props}
    />
  )
}

export default Menu
