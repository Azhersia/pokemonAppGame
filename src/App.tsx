import { useState, useEffect } from "react";
import GetPokemon from "./components/GetPokemon";
import type { Pokemon } from "./components/GetPokemon";

function App() {
  const random = Math.floor(Math.random() * 1017)

  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon)
  const [catchStatus, setCatchStatus] = useState("")
  async function fetchPokemon() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + random);
    const data = await res.json();

    setPokemon(data);
  }
  useEffect(() => {
    fetchPokemon()
  }, [])

  function tryCatchNormal(exp: number) {
    const catchChance = Math.random()
    const pokeCaught = -0.00109 * exp + 0.54909
    if (catchChance <= pokeCaught) {
      setCatchStatus("Pokemon caught")
      saveCaughtPokemon(pokemon)
      console.log(catchChance, pokeCaught + " Pokemon caught")
    } else {
      setCatchStatus("Pokemon escaped")
      console.log(catchChance, pokeCaught + " Pokemon escaped")
    }
  }
  function tryCatchGreat(exp: number) {
    const catchChance = Math.random()
    const pokeCaught = -0.00109 * exp + 0.54909 + 0.4
    if (catchChance <= pokeCaught) {
      setCatchStatus("Pokemon caught")
      saveCaughtPokemon(pokemon)
      console.log(catchChance, pokeCaught + "Pokemon caught")
    } else {
      setCatchStatus("Pokemon escaped")
      console.log(catchChance, pokeCaught + "Pokemon escaped")
    }
  }
  function tryCatchUltra(exp: number) {
    const catchChance = Math.random()
    const pokeCaught = -0.00109 * exp + 0.54909 + 0.5
    if (catchChance <= pokeCaught) {
      setCatchStatus("Pokemon caught!")
      saveCaughtPokemon(pokemon)
      console.log(catchChance, pokeCaught + "Pokemon caught!")
    } else {
      setCatchStatus("Pokemon escaped")
      console.log(catchChance, pokeCaught + "Pokemon escaped")
    }
  }

  const saveCaughtPokemon = async (pokemon: Pokemon) => {
    console.log(pokemon)
    try {
      const response = await fetch('http://localhost:3000/api/pokemon', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: pokemon.name,
          base_experience: pokemon.base_experience,
          sprite: pokemon.sprites.front_default,


        }),
      });


      if (response.ok) {
        console.log('Pokemon saved successfully.');
      } else {
        console.error('Failed to save Pokemon. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error while saving Pokemon:', error);
    }
  };


  return (

    <>
      <div className="flex w-fulll h-screen justify-center ">
        <h1 className="text-3xl absolute top-40 left-[770px]">{catchStatus}</h1>

        <div className="">
          <GetPokemon data={pokemon} />
        </div>

        <div className="flex justify-center flex-col" >
          <div className="flex ml-10 bg-slate-400 h-50 p-5 mr-2">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col justify-center gap-2 bg-slate-500 rounded h-40 p-1">
                <img onClick={() => { tryCatchNormal(pokemon.base_experience) }} className=" h-10 hover:cursor-pointer" src="src\img\pokeball.webp" />
                <img onClick={() => { tryCatchGreat(pokemon.base_experience) }} className=" h-10 hover:cursor-pointer" src="src\img\greatball.webp" />
                <img onClick={() => { tryCatchUltra(pokemon.base_experience) }} className=" h-10 hover:cursor-pointer" src="src\img\ultraball.webp" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
