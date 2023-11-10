'use client'

import { MouseEventHandler, useCallback } from "react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const modalState = useWalletModal()
  const { publicKey, wallet, connect } = useWallet()

  if (publicKey) {
    console.log(publicKey.toString());
    router.push(`/${publicKey.toString()}`)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return
      }
      if (!wallet) {
        modalState.setVisible(true)
      } else {
        connect().catch(() => { })
      }
    },
    [wallet, connect, modalState]
  )

  return (
    <>
      <div className="h-screen bg-white">
        <div className="mx-auto bg-white max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="font-display font-bold tracking-tight text-gray-900 text-4xl px-[30px] md:text-6xl">
              Welcome To <br /> Decentralised Voting Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect your Solana wallet
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button onClick={handleClick} className="h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                Connect wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
