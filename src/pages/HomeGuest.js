

import React, { useContext } from 'react'
import useAuthContext from '../contexts/AuthContext'
import Premiers from '../components/guest/Premiers'
import '../style/Premiers.css';


export default function HomeGuest() {

//meghívódik a Context-ből az apiData, és a kategoriaData, hogfy megtudjuk jeleníteni  a termékeket, és a kategóriákat a komponenseken keresztül
const { pMovies } = useAuthContext() // Nem kell useContext-et újra meghívni


  return (
    <main>
      <div className='container'>
    
        <section className='section1'>
        <h3 className='title'>
          Premier filmek
        </h3>
       
      
        {pMovies ? <Premiers premiers={pMovies} /> : "No premiers found"}


        </section>
        <h3 className='title'>
          Népszerű filmek
        </h3>
        <section className='section2'>
      

        </section>

        <section className='section3'>

        </section>
      </div>
    </main>
  )
}

