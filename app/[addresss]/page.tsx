import getidl from "./components/AnchorStuff";

export default async function Home() {

  const idl = await getidl();
  const v = idl.metadata.address;
  console.log(idl);

  return (
    <>
      <div className="h-screen bg-white">
        <div className="mx-auto bg-white max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="font-display font-bold tracking-tight text-gray-900 text-4xl px-[30px] md:text-6xl">
              Initialise Voter ID
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Click Initialise to create Voter ID
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="h-[50px] px-[20px] rounded-md bg-green-600 font-bold">
                Initialise
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

