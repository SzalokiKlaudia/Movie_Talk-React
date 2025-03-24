import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import useMovieDataContext from '../../contexts/MovieDataContext'
import '../../style/UserMovie.css'
import ModalOpen from './ModalOpen'

export default function UserMovie(props) {

    const { getUserMovies,postUserAddMovie } = useMovieDataContext()
    const [ isModalWatchAgainOpen, setIsModalWatchAgainOpen ] = useState(false)


    console.log(props.movie)

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

    const defWatchDate = () => {
      let nulldate = null

      if (props.movie.watching_date === nulldate){
        return <p>Date is not provided</p>
      }else{
        const text = props.movie.watching_date
        const data = new Date(text)
        const formattedText = data.toISOString().split("T")[0].replace(/-/g, ". ")
        return formattedText + '.'
      }
    }

    


    const defRate = () => {
      let nullRating = null

      if(props.movie.rating === null){
        return nullRating = 0
      }else{
        return props.movie.rating 
      }

    }

   
 
  return (
    <>


    <tr>
 
      <td>{props.movie.id}.</td>
      <td>{props.movie.title}</td>
      <td>{defWatchDate()}</td>
      <td>{defRate()}/5</td>
      <td>
        {actionButton()}
      </td>
   
  
    </tr>


      

 

    </>


  )
}
