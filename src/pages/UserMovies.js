import React, { useEffect, useState } from 'react'
import UserMoviesAside from '../components/user/UserMoviesAside'
import MoviesTable from '../components/user/MoviesTable'
import useAuthContext from '../contexts/AuthContext'
import useMovieDataContext from '../contexts/MovieDataContext'
import '../style/UserMovies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default function UserMovies() {

    const { getUserMovies, userMovies, setUserMovies } = useMovieDataContext()
    const { user } = useAuthContext()
    const [ filteredMovies, setFilteredMovies ] = useState([])//ide settelünk szűrt filmeket az asideból a gyerek végzi a logikát, átadjuk az aside-nak, tablenak megjelenítésre
    const [loading, setLoading] = useState(true) //kell a loading az előző userek adatai miatt, h frissen töltődjenek be


    useEffect(() => {
        if (user) {
            setUserMovies([]) //régi adatok töröl
            setFilteredMovies([])// szürteket is
            setLoading(true)//jelezzük h az adatok betöltődnek
            
            //segít megvárni a választ, tehát így az új adatoknak van idejük betöltődni
            getUserMovies().then(() => {//a then megvárja h megérkezzen a promiset mert ez egy aszinkron fgv
                setLoading(false) 
            })
        }
    },[user])
 

    useEffect(() => { 
        if(userMovies){//ha vannak filmek
            setFilteredMovies(userMovies)//frissítjük a szűrt adatokat h mindig a legfirssebb legyen
        }else{
            setFilteredMovies([])
        }
    
    }, [userMovies])//enélkül nem frissíti az új filmekkel a usermovies-t ha hozzáteszek 1-et

    
    if(loading){
        return <div className='loading'><FontAwesomeIcon icon={faSpinner} spin size="3x"/></div>


    }


    //console.log(userMovies)
    //console.log(filteredMovies)

    
  return (
    <div className='user-movies-container container'>

            <div className='row user-movie-table-container mt-2'>
             
                <div className='col-md-3 custom-aside user-aside'>
                    <UserMoviesAside userMovies={userMovies} setFilteredMovies ={setFilteredMovies}/> {/*itt történik a szűrési logika gombok szerint*/}
                </div>
            
                <div className='col-md-9 table-responsive user-table'>
                    
                    <MoviesTable userMovies={filteredMovies}/> {/*itt jeleníti meg a szűrt találatokat*/}

                </div>
                    
            </div>

    </div>
  )
}
