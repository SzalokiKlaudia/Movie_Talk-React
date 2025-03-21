import React from 'react'
import '../../style/TopMovieModal.css'
import TopMovieModalElem from './TopMovieModalElem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function TopMovieModal(props) {

    console.log(props.topMovies)
    console.log(props.genres)
    console.log(props.isModalOpen)
    const movies = props.topMovies
  return (
    <div className='top-movies-wrapper'>
        <div>
            <h3>Top 5 moves</h3>
        </div>
        <button className='close-btn ms-auto d-flex'onClick={props.handleToggle}>
            <FontAwesomeIcon className='x-icon' icon={faX} />
        </button>
        {movies.map((movie) => {
                
            return  <TopMovieModalElem movie={movie} key={movie.movie_id}/>
        })}
    </div>
  )
}
