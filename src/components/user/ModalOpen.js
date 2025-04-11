import React, { useState } from 'react'
import '../../style/UserMovie.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faTimes, faTimesCircle, faWindowClose, faX, faXmark } from '@fortawesome/free-solid-svg-icons'
import useMovieDataContext from '../../contexts/MovieDataContext'

export default function ModalOpen(props) {
    const {errors } = useMovieDataContext()
    
   
    const handleSubmitRate = async (event) => { //itt gyűjti össze az adatokat és küldi a backendnek
        event.preventDefault()

        const id = props.movieId
        const intRating = parseInt(props.rating)

        const data = { // összegyűjtjük opbektumba az űrlap adatait
            id: id,
            watching_date: props.watching_date,
            rating: intRating,
          
        }
        console.log(data)

        await props.patchRating(data, 'api/user/add/rating')
        props.getUserMovies()
        props.setIsModalOpenRate(false)

    }

    const handleCloseRateModalIcon = () => {
        props.setIsModalOpenRate(false)
    }

    console.log(errors.watching_date)

  return (
    <>
        {props.isModalOpenRate && (
        <div className={`fake-rate-modal ${props.isModalOpenRate ? "active" : ""}`}>
            
        <div className='rate-cont p-0'>
            <button className='close-btn ms-auto d-flex'onClick={handleCloseRateModalIcon}>
            <FontAwesomeIcon className='x-icon' icon={faX} />
            </button>
            <form className='rate-form d-flex flex-column align-items-center'  onSubmit={handleSubmitRate}>
    
                <div className='mb-3 w-100'>
                    <label htmlFor="props.watching_date" className="form-label watching-label d-block text-center">
                       Add your watching date!
                    </label>
                    <input type="date" 
                        className='form-control watching-input'
                        id='props.watching_date'
                        value={props.watching_date}
                        onChange={(e) => {
                            props.setWatching_date(e.target.value)
                        }}
                    />
                </div>
                <div>
                  {errors.watching_date && (
                    <span className="text-danger">{errors.watching_date[0]}</span>
                  )}
                </div>
                <div className='rate w-100 d-flex justify-content-center'>
                    <label className='mx-2' htmlFor="tentacles">Add your rating:</label>
    
                    <input type="number" 
                        value={props.rating}
                        onChange={(e) => {
                            props.setRating(e.target.value)
                        }}
                        id="tentacles" 
                        name="tentacles" 
                        min="1"
                        max="5" />
    
                </div>
                <div>
                  {errors.rating && (
                    <span className="text-danger">{errors.rating[0]}</span>
                  )}
                </div>
                <div className='w-100 d-flex justify-content-center mt-2'>
                    <button
                        type='submit'
                        className='rate-btn'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    
        </div>
        )}
    </>
  )
}
