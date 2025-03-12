import React from 'react'
import MovieCard from '../components/guest/MovieCard'
import '../style/MovieCard.css'
import GuestAdvencedSearch from '../components/guest/GuestAdvencedSearch'
import useMovieDataContext from '../contexts/MovieDataContext'
import '../style/GuestMovieResults.css'



export default function GuestMoviesResults() {
    const { foundMovies } = useMovieDataContext() //áthozzuk a keresésnél a filmes találatokat megjelenítésre 
    console.log(foundMovies)



  return (
    <div className='container-fluid'> 
        <div className='guest-container container-xxl d-flex gap-3'>
            <section className='advenced-search col-4'>
                <GuestAdvencedSearch />

            </section>

            <section className='movie-results-container col-8'>

                <ul className='results-movies'>
                    {foundMovies.length === 0 && 
                    <p>No results have been found</p>}
                    {foundMovies.map((movie) => {
                        return <MovieCard movie={movie} key={movie.id}/>
                    })}
                   
                  
                </ul>
       
            </section>




        </div>
    </div>
  )
}
