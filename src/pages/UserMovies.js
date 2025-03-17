import React, { useEffect } from 'react'
import UserMoviesAside from '../components/user/UserMoviesAside'
import MoviesTable from '../components/user/MoviesTable'
import useAuthContext from '../contexts/AuthContext'
import useMovieDataContext from '../contexts/MovieDataContext'

export default function UserMovies() {

    const { getUser, user } = useAuthContext()
    const { getUserMovies } = useMovieDataContext()

        
            useEffect(() => {  
                if(user){
                getUserMovies()


                }
    
            }, [])


    console.log(user)
    
  return (
    <div className='user-movies-container container-fluid'>

        <div className='container user-movies-container'>

            <div className='row table-container'>
             
                <div className='col-md-2 custom-aside'>
                    <UserMoviesAside/>
                </div>
            
                    <div className='col-md-10 table-responsive d-flex'>

                        <MoviesTable/>

                         
                  

                    </div>
                    
            </div>




        </div>





    </div>
  )
}
