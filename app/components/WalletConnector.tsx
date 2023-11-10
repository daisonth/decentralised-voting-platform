'use client'
import { FC } from "react"
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const WalletConnector: FC = () => {
  return (
    <WalletMultiButtonDynamic className="bg-black" />
  )
}

export default WalletConnector
