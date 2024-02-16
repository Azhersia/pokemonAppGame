export type Pokemon = {
  id: number,
  name: string,
  base_experience: number,
  sprites: {
    front_default: string
  }
}

export default function GetPokemon({ data }: { data: Pokemon }) {
  if (!data.name) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <>

      <div className='flex flex-col h-screen w-full justify-center items-center '>
        <div className="flex flex-col items-center bg-slate-300 p-10">

          <div>
            <div className='flex'>
              <h3 className='p-2.5 text-2xl'>Name:</h3>
              <h2 className='p-2 text-3xl'>{data.name}</h2>
            </div>
            <div className='flex'>
              <h3 className='p-2.5 text-2xl'>Base xp:</h3>
              <h2 className='p-2 text-3xl'>{data.base_experience}</h2>
            </div>
            <div className='flex'>
              <h3 className='p-2.5 text-2xl'>Id:</h3>
              <h2 className='p-2 text-3xl'>{data.id}</h2>
            </div>
          </div>
          <h6 className='text-xs mt-10'>Click a pokeball to catch!</h6>
          <img className='h-40 ' src={data.sprites.front_default} alt="pokemon image" />
        </div>
      </div>
    </>

  )
}
