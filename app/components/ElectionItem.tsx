import Modal from '../components/Model';

export default function ElectionItem(props: any) {
  const election = props.election.account;
  console.log(election);
  return (
    <div className="flex items-center justify-between p-[30px] w-full bg-blue-100 rounded-md">
      <div className='flex'>
        <div className='text-gray-500 font-bold h-full w-[50px]'>1)</div>
        <div className='text-blue-800 font-bold h-full pr-[30px]'>{election.title} </div>
        <div className='text-gray-500 text-[19px] font-bold h-full'>{election.description}</div>
      </div>
      <Modal />
    </div>
  )
}

      // <button className="self-end px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0">
      //   Settings
      // </button>

