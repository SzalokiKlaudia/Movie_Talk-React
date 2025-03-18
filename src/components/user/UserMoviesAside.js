import React, { useState } from 'react'
import '../../style/UserMovies.css'

export default function UserMoviesAside(props) {

    //const { userMovies, getUserMovies } = useMovieDataContext()
    

    const movies = props.userMovies
    console.log(props.userMovies)


    if(!movies){
        return null
    }


    const handleclickRated = () => {
    
        props.setFilteredMovies(movies.filter((movie => movie.rating !== null)))
    
    }

    
    const handleclickUnRated = () => {
    
        props.setFilteredMovies(movies.filter((movie => movie.rating === null)))
              
    }

    const handleClickAllMovies = () => {

        props.setFilteredMovies(movies)

    }

  return (
    <>
      <div className='options text-center'
            id='filtered1'
            onClick={handleClickAllMovies}
        >
            <span>All movies</span>
                
        </div>
        <div className='options text-center'
            id='filtered1'
            onClick={handleclickRated}
        >
            <span>Rated movies</span>
                
        </div>
        <div className='options text-center'
            id='filtered2'
            onClick={handleclickUnRated}
        >
            <span>Unrated movies</span>
              
        </div>


    </>
  )
}
