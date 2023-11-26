import { useAnchorWallet, AnchorWallet } from '@solana/wallet-adapter-react';
import { CreateElection } from "./AnchorStuff";
import React, { useState } from 'react';

export interface Props {
  electionCount: number,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  setElectionCount: React.Dispatch<React.SetStateAction<number>>,
}

export default function NewElection(props: Props) {
  const wallet = useAnchorWallet();
  const [title, setTitile] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const CreateNewElection = async () => {
    setLoading(true);
    console.log("calling create Election with\n title: ", title, "\n description: ", description, "\n election count: ", props.electionCount);
    await CreateElection(wallet as AnchorWallet, props.electionCount, title, description).then(
      data => {
        console.log("from home: Election = ", data);
        setLoading(false);
        props.setShow(false);
        props.setElectionCount(data);
      }
    );
  };

  return (
    <>
      <div className="bg-gray-200 flex justify-center items-center rounded-xl mx-auto max-w-2xl py-[50px]">
        <div className="w-fit">
          <h2 className="text-center font-bold text-gray-700 text-[30px] pb-[40px]">Create New Election</h2>
          <div className='flex flex-col items-center'>
            <label htmlFor="title" className='pb-[30px] text-black flex flex-col'>Enter Election Title :
              <input name="title" type="text" value={title} onChange={(e) => setTitile(e.target.value)} className='w-[400px] mt-[10px] p-[10px] rounded-md' placeholder='Title' />
            </label>

            <label htmlFor="Description" className='pb-[30px] text-black flex flex-col'>Description :
              <input name="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='mt-[10px] w-[400px] p-[10px] rounded-md' placeholder="Description" />
            </label>

            {!loading ?
              <button onClick={CreateNewElection} className="mx-[30px] w-fit h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                Create Election
              </button>
              :
              <button onClick={CreateNewElection} className="flex justify-around items-center gap-[10px] mx-[30px] w-fit h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                Processing

                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            }

          </div>
        </div>
      </div>
    </>
  );

}

