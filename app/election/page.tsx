'use client'

import { useAnchorWallet, AnchorWallet } from '@solana/wallet-adapter-react';
import { getAllUserElections, getElectionCount } from "../components/AnchorStuff";
import NewElection from '../components/NewElection';
import { useEffect, useState } from 'react';
import ElectionItem from '../components/ElectionItem';

export default function Home() {
  const wallet = useAnchorWallet();
  const [show, setShow] = useState(false);
  const [electionCount, setElectionCount] = useState(0);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElectionCount = async () => {
      await getElectionCount(wallet as AnchorWallet).then(
        data => {
          setElectionCount(data);
        }
      )
    }
    fetchElectionCount();
  }, [])

  useEffect(() => {
    const fetchAllUserElection = async () => {
      await getAllUserElections(wallet as AnchorWallet).then((data: any) => {
        setElections(data);
      });
      console.log("elections :", elections);
    }
    if (electionCount > 0) {
      console.log("election count :", electionCount);
      fetchAllUserElection();
    }
  }, [electionCount]);


  return (
    <>
      <div className='h-[100px] lg:px-[100px] flex items-center justify-between'>
        <h2 className='text-black px-[30px] font-bold text-[18px] lg:text-2xl'>Number of <br className="lg:hidden" /> Elections Created : {electionCount}</h2>
        <button onClick={() => setShow(!show)} className="mx-[30px] h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
          {!show ? "New Election" : "Cancel"}
        </button>
      </div>
      {show ?
        <NewElection setShow={setShow} electionCount={electionCount} setElectionCount={setElectionCount} />
        : ""
      }
      <div className='w-full flex flex-col text-black text-[22px] gap-[20px] px-[100px] py-[50px]'>
        {elections.map((election, idx) => {
          return <ElectionItem election={election} key={idx} />
        })}
      </div>
    </>
  )
}
