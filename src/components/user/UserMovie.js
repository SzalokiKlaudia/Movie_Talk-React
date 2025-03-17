import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import useMovieDataContext from '../../contexts/MovieDataContext'
import '../../style/UserMovie.css'
import ModalOpen from './ModalOpen'

export default function UserMovie(props) {

    const { patchRating, dataRating, getUserMovies,postUserAddMovie } = useMovieDataContext()
    const [ isModalOpenRate, setIsModalOpenRate ] = useState(false)
    const [ isModalWatchAgainOpen, setIsModalWatchAgainOpen ] = useState(false)


    //console.log(props.movie)

    const actionButton = () => { //a gombok létrehozása attól függően milyen a filmek rétékelésének állapota
        if(props.movie.rating === null){
            return <button className='rate-btn' onClick={() => props.handleRateToggle(props.movie.id)} 
                    aria-expanded={props.isModalOpenRate ? "true" : "false"}> Rate!</button>
        }else{
            return <button className='watch-again-btn' onClick={handleClickWatching} 
                    aria-expanded={isModalWatchAgainOpen ? "true" : "false"}>Watch again!</button>
        }

    }

 

    
    const handleClickWatching = async (event) => { //itt kezeljük az újra listába rakás logikát
        event.preventDefault()
        setIsModalWatchAgainOpen(true)

        const id = props.movie.movie_id
        console.log(id)
        const data = { // összegyűjtjük opbektumba az űrlap adatait
            movie_id: id,
          
        }
        console.log(data)

        try {
            await postUserAddMovie(data, 'api/user/add-movies')
    
            getUserMovies()
        } catch (error) {
            console.error('Error adding movie:', error)
        }
       
        setIsModalWatchAgainOpen(false)

    }
 
  return (
    <>


    <tr>
 
      <td>{props.movie.id}</td>
      <td>{props.movie.title}</td>
      <td>{props.movie.watching_date}</td>
      <td>{props.movie.rating}</td>
      <td>
        {actionButton()}
      </td>
   
  
    </tr>


      

 

    </>


  )
}
