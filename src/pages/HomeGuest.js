

import React, { useContext } from 'react'
import Premiers from '../components/guest/Premiers'
import '../style/Premiers.css';
import UsersTopMovies from '../components/guest/UsersTopMovies';
import TopUsers from '../components/guest/TopUsers';
import useMovieDataContext from '../contexts/MovieDataContext';


export default function HomeGuest() {

//meghívódik a Context-ből az apiData, és a kategoriaData, hogfy megtudjuk jeleníteni  a termékeket, és a kategóriákat a komponenseken keresztül
const { pMovies, usersTopMovies,topUsers } = useMovieDataContext() // Nem kell useContext-et újra meghívni
  //console.log(usersTopMovies)


  return (
    <main>
      <div className='container'>
    
        <section className='section1'>
          <h3 className='title'>
            Premier movies
          </h3>
       
        {pMovies ? <Premiers premiers={pMovies} /> : "No premiers found"}

        </section>
       
        <section className='section2'>
          <h3 className='title'>
            Top rated movies by users
          </h3>

        {usersTopMovies ? <UsersTopMovies usersTopMovies={usersTopMovies} /> : "No movies found"}
      
        </section>

        <section className='section3'>
          <h3 className='title'>
            Top users
          </h3>

          {topUsers ? <TopUsers users={topUsers} /> : "Could not find any data"}

        </section>
      </div>
    </main>
  )
}

