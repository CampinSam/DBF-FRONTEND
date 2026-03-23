import React, { useMemo } from 'react'
import { ModalProvider } from 'dragonball-uikit'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'

// Import Solana wallet adapter default styles
import '@solana/wallet-adapter-react-ui/styles.css'

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  )

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <LanguageContextProvider>
          <ConnectionProvider endpoint={rpcUrl}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <BlockContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </BlockContextProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </LanguageContextProvider>
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
