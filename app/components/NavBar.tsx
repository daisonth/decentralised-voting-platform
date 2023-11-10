import Image from "next/image"
import WalletConnector from "./WalletConnector"

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 mx-auto h-[100px] lg:h-16 px-[30px] flex justify-between items-center md:gap-20 md:space-x-4  bg-green-600 ">
      <a href="/"><p className="inline-flex font-bold text-[18px] md:text-[25px]">Decentralised <br className="block md:hidden" /> Voting Platform</p></a>
      <WalletConnector />
    </div>
  )
}
