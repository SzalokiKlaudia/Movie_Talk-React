import React, { useEffect, useRef } from 'react'
import '../../style/TopMovieModal.css'
import TopMovieModalElement from './TopMovieModalElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function TopMovieModal(props) {

    console.log(props.topMovies)
    console.log(props.genres)
    console.log(props.isModalOpen)
    const movies = props.topMovies


 

  return (
    <div className='top-movies-wrapper'>
        
        <button className='close-btn ms-auto d-flex'onClick={props.handleToggle}>
            <FontAwesomeIcon className='x-icon' icon={faX} />
        </button>
        <div>
            <h3 className='text-center'>Your Top 5 movies</h3>
        </div>
        <div className='top-movie-cards-wrapper'>
        {movies.map((movie) => {
                
            return  <TopMovieModalElement movie={movie} key={movie.movie_id}/>
        })}
        </div>
    </div>
  )
}
