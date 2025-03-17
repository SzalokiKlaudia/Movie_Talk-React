import React, { useState } from 'react'
import useMovieDataContext from '../../contexts/MovieDataContext'
import UserMovie from './UserMovie'
import ModalOpen from './ModalOpen';

export default function () {

    const { userMovies } = useMovieDataContext()
    const [isModalOpenRate, setIsModalOpenRate] = useState(false)
    const [watching_date, setWatching_date] = useState('')
    const [rating, setRating] = useState('')
    const [movieId, setMovieId] = useState(null) //itt tároljuk a usermovie id-t amit át kell adni a modalopen komp-nak
    const { patchRating, dataRating, getUserMovies,postUserAddMovie } = useMovieDataContext()
    

    


    console.log(userMovies.data)

    const handleRateToggle = (id) => { //itt kezeljük a modal komponens nyitását true, vagy false ha true active osztályt kap
        //console.log('nyitva')
        setMovieId(id)
        setIsModalOpenRate(!isModalOpenRate)
    }


  return (
    <>
    <table className='table table-hover table-bordered custom-table'>
        <thead>
            <tr className=''>
                <th scope='col'>ID</th>
                <th scope="col">Movie title</th>
                <th scope="col">Watching date</th>
                <th scope="col">Rate</th>
                <th scope="col">Options</th>
            </tr>
                  
        </thead>
        <tbody> 
            
        {userMovies.data && userMovies.data.length > 0 ? (
        userMovies.data.map((movie) => (
            <UserMovie key={movie.id} movie={movie} handleRateToggle={handleRateToggle} isModalOpenRate={isModalOpenRate} />
            ))
            ) : (
            <tr>
                <td colSpan="8">{userMovies.message}</td>
            </tr>
            )}
               
        </tbody>

    </table>

    {isModalOpenRate && (
                        <ModalOpen //átbuborékoltattam az adataokat,stateket a komponensnek h megjeleníthessem
                        isModalOpenRate={isModalOpenRate}
                        setIsModalOpenRate={setIsModalOpenRate}
                        setWatching_date ={setWatching_date}
                        rating={rating}
                        watching_date = {watching_date}
                        setRating={setRating}
                        movieId = {movieId}
                        patchRating={patchRating}
                        getUserMovies = {getUserMovies}
                        
                        />
                        )}



    </>
  )
}
