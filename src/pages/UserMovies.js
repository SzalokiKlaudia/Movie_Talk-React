import React, { useEffect, useState } from 'react'
import UserMoviesAside from '../components/user/UserMoviesAside'
import MoviesTable from '../components/user/MoviesTable'
import useAuthContext from '../contexts/AuthContext'
import useMovieDataContext from '../contexts/MovieDataContext'
import '../style/UserMovies.css'
export default function UserMovies() {

    const { getUserMovies, userMovies, setUserMovies } = useMovieDataContext()
    const { user } = useAuthContext()
    const [ filteredMovies, setFilteredMovies ] = useState([])//ide settelünk szűrt filmeket az asideból a gyerek végzi a logikát, átadjuk az aside-nak, tablenak megjelenítésre


    useEffect(() => {  //h megkapja midnen user a saját filmjeit és ne legyen keveredés
        if(user){
            getUserMovies()
        }

    }, [user])

 
    console.log(userMovies)

    
    useEffect(() => { 
        if(userMovies){//ha vannak filmek
            setFilteredMovies(userMovies)//frissítjük a szűrt adatokat h mindig a legfirssebb legyen
        }else{
            setFilteredMovies([])
        }
    
    }, [userMovies])//enélkül nem frissíti az új filmekkel a usermovies-t ha hozzáteszek 1-et

    console.log(userMovies)
    console.log(filteredMovies)

    
  return (
    <div className='user-movies-container container'>

            <div className='row user-movie-table-container mt-2'>
             
                <div className='col-md-3 custom-aside user-aside'>
                    <UserMoviesAside userMovies={userMovies} setFilteredMovies ={setFilteredMovies}/>
                </div>
            
                <div className='col-md-9 table-responsive user-table'>

                    <MoviesTable userMovies={filteredMovies}/>

                </div>
                    
            </div>

    </div>
  )
}
