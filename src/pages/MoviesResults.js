import React from 'react'
import MovieCard from '../components/guest/MovieCard'
import '../style/MovieCard.css'
import AdvancedSearch from '../components/guest/AdvancedSearch'
import useMovieDataContext from '../contexts/MovieDataContext'
import '../style/GuestMovieResults.css'



export default function MoviesResults() {
    const { foundMovies} = useMovieDataContext() //áthozzuk a keresésnél a filmes találatokat megjelenítésre 
    //console.log(foundMovies)


  return (
    <div className='container-fluid'> 
        <div className='guest-container container-xxl d-flex gap-3'>
            <section className='advenced-search col-4'>
                <AdvancedSearch />

            </section>

            <section className='movie-results-container col-8'>

                <ul className='results-movies'>
                    {(!foundMovies || foundMovies.length === 0) && 
                    <p className='result-text'>No results have been found</p>}
                    {Array.isArray(foundMovies) &&  foundMovies.length > 0 && //azért h ne érezékelje az undefined tömböt Array.isArray
                        foundMovies.map((movie) => {
                        return <MovieCard movie={movie} key={movie.id}/>
                    })}
                   
                  
                </ul>
       
            </section>




        </div>
    </div>
  )
}
