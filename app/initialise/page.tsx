'use client'

import { useAnchorWallet, AnchorWallet } from '@solana/wallet-adapter-react';
import { Initialise } from "../components/AnchorStuff";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const wallet = useAnchorWallet();
  const [init, setInit] = useState(false);

  const handleClick = async () => {
    await Initialise(wallet as AnchorWallet).then(
      data => {
        console.log("from home: election = ", data);
        setInit(true);
        // router.replace("/dashboard");
      }
    )
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto bg-white max-w-2xl py-[100px] sm:py-48 lg:py-56">
          <div className="text-center">
            {!init ?
              <div>
                <h1 className="font-display font-bold tracking-tight text-gray-900 text-4xl px-[30px] md:text-6xl">
                  Initialise Voter ID
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Click Initialise to create new Voter ID <br />or fetch an existing Voter ID
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button onClick={handleClick} className="h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                    Initialise
                  </button>
                </div>
              </div>
              :
              <div className='flex flex-col justify-center items-center'>
                <div className="w-[90vw] md:w-[500px] flex flex-col justify-center border-b-black border-b-[3px] items-center py-[50px] ">
                  <h1 className="font-display font-bold tracking-tight text-gray-900 px-[30px] text-3xl md:text-4xl">
                    Create New Election
                  </h1>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/election">
                      <button onClick={handleClick} className="h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                        My Election
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="w-[500px] flex flex-col justify-center  items-center py-[50px] ">
                  <h1 className="font-display font-bold tracking-tight text-gray-900 px-[30px] text-3xl md:text-4xl">
                    Vote for Elections
                  </h1>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/vote">
                      <button onClick={handleClick} className="h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                        I want to Vote
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

