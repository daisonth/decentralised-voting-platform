import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WalletContextProvider from "./components/WalletContextProvider";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voting DAPP',
  description: 'Desentrilised voting platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <WalletContextProvider>
          <NavBar />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  )
}
