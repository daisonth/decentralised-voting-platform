'use client'
import { FC, ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const url = useMemo(() => clusterApiUrl("devnet"), [])
  const phantom = new PhantomWalletAdapter()
  const solflar = new SolflareWalletAdapter()

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={[phantom, solflar]}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider
