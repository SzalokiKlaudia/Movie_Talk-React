import React, { useEffect, useState } from 'react'
import '../../style/UserMovies.css'

export default function UserMoviesAside(props) {

    //const { userMovies, getUserMovies } = useMovieDataContext()
    const [isClicked, setIsClicked] = useState('')//state a kattintásra, active osztályt kap, és all , rated, unrated állapototot gombok szerint

    useEffect(() => {
        console.log("isClicked state is:", isClicked)
    }, [isClicked])

    const movies = props.userMovies
    console.log(props.userMovies)


    if(!movies){
        return null
    }


    const handleclickRated = () => {
    
        props.setFilteredMovies(movies.filter((movie => movie.rating !== null)))//szűrjük az értékelt filmeket
        setIsClicked('rated')
    
    }

    
    const handleclickUnRated = () => {
    
        props.setFilteredMovies(movies.filter((movie => movie.rating === null)))//szűrjük az értékeletleneket
        setIsClicked('unrated')

    }

    const handleClickAllMovies = () => {

        props.setFilteredMovies(movies)//csak visszaadjuk a user összes filmjét
        setIsClicked('all')
    }

  return (
    <>
      <div className={`movie-btn text-center ${isClicked == 'all' ? 'active' : ''}`}
            id='filtered1'
            onClick={handleClickAllMovies}
        >
            <span>All movies</span>
                
        </div>
        <div className= {`movie-btn text-center ${isClicked == 'rated' ? 'active' : ''}`}
            id='filtered2'
            onClick={handleclickRated}
        >
            <span>Rated movies</span>
                
        </div>
        <div className={`movie-btn text-center ${isClicked == 'unrated' ? 'active' : ''}`}
            id='filtered3'
            onClick={handleclickUnRated}
        >
            <span>Unrated movies</span>
              
        </div>


    </>
  )
}
