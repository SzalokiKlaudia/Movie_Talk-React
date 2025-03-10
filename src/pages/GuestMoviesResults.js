import React from 'react'
import MovieCard from '../components/guest/MovieCard'
import '../style/MovieCard.css'
import GuestAdvencedSearch from '../components/guest/GuestAdvencedSearch'
import useMovieDataContext from '../contexts/MovieDataContext'



export default function GuestMoviesResults() {
    const { foundMovies } = useMovieDataContext() //áthozzuk a filmes találatokat megjelenítésre
    //console.log(foundMovies)
    const movies = foundMovies?.data || [] //ha létezik a tömb akkor az értékét mentsük a datát, ha nem akkor csak egy üres tömb

    let message;
    const searchTitle = localStorage.getItem('searchTitle') || ''; // elmentett keresési értéket használjuk, amit meghívhatunk megjelenítsére





  return (
    <div className='container-fluid'> 
        <div className='guest-container container-xxl d-flex gap-3'>
            <section className='advenced-search col-4'>
                <GuestAdvencedSearch />

            </section>

            <section className='movie-results-container col-8'>

            {movies.length === 0 ? (
                <div className='mt-5 text-center'>
                    <p className='no-results p-0'>Nos results have found: {searchTitle}</p>
                </div>
            ) : (
                <ul className='results-movies'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </ul>
            )}

                
            
               

            </section>




        </div>
    </div>
  )
}
