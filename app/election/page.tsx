'use client'

import { useAnchorWallet, AnchorWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Initialise, CreateElection } from "../components/AnchorStuff";
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

export default function Home() {
  const wallet = useAnchorWallet();
  let eletion_count = 0;

  const fetchElectionCount = async () => {
    await Initialise(wallet as AnchorWallet).then(
      data => {
        console.log("from home: Election = ", data);
        eletion_count = data;
      }
    )
  }
  fetchElectionCount();

  const CreateNewElection = async () => {
    await CreateElection(wallet as AnchorWallet, eletion_count).then(
      data => {
        console.log("from home: Election = ", data);
        // eletion_count = data;

        // router.replace("/dashboard");
      }
    )
  }


  return (
    <>
      <div className='h-[100px] px-[100px] flex items-center justify-between'>
        <h2 className='text-black px-[30px] font-bold text-2xl'>Number of Elections Created : {eletion_count}</h2>
        <Link href="/vote">
          <button onClick={CreateNewElection} className="mx-[30px] h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
            New Election
          </button>
        </Link>
      </div>
      <div className="mx-auto bg-white max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
        </div>
      </div>
    </>
  )
}

