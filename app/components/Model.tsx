import { useState } from 'react';
export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="self-end px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Settings
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative sm:min-w-[500px] w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div>
                    <h2 className="text-3xl font-semibold">
                      Election Title
                    </h2>

                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      This is Election Description
                    </p>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="p-6 flex-auto">
                  <p className="bg-blue-100 text-center rounded-md p-[10px]"> ELECTION NOT STARTED </p>
                  <div className='flex justify-between gap-[10px]'>
                    <p className="bg-blue-50 rounded-md p-[10px] mt-[10px]"> No. of Candidates : 0</p>
                    <button className='bg-green-100 hover:bg-green-200 p-[10px] mt-[10px] rounded-md'>Add New Candidate</button>
                  </div>
                  <div className='bg-gray-100 p-6 mt-3'>
                    <p className='font-semibold pb-[10px] text-center text-[25px]'>Candidates</p>
                    <table className="table-auto w-full border-[2px] border-gray-400">
                      <thead>
                        <tr className='bg-blue-100'>
                          <th className='border-r-2 border-r-gray-400'>Name</th>
                          <th>Votes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='p-4 border-r-2 border-r-gray-400'>Candidate 1</td>
                          <td className='text-center'>10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
