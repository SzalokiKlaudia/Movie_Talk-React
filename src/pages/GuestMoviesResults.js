import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import MovieCard from '../components/guest/MovieCard'
import '../style/MovieCard.css'
import GuestAdvencedSearch from '../components/guest/GuestAdvencedSearch'



export default function GuestMoviesResults() {
    const { foundMovies } = useAuthContext() //áthozzuk a filmes találatokat megjelenítésre
    //console.log(foundMovies)
    const movies = foundMovies?.data || [] //ha létezik a tömb akkor az értékét mentsük a datát, ha nem akkor csak egy üres tömb
    
    const searchTitle = localStorage.getItem('searchTitle') || ''; // elmentett keresési értéket használjuk



  return (
    <div className='container-fluid'> 
        <div className='guest-container container-xxl d-flex gap-3'>
            <section className='advenced-search col-4'>
                <GuestAdvencedSearch />

            </section>

            <section className='movie-results-container col-8'>
                <ul className='results-movies'>

                    {movies.map((movie) => {
                        return  <MovieCard  movie = {movie} key = {movie.id}/>

                    })}
                  

                </ul>

            </section>




        </div>
    </div>
  )
}
