
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../style/MovieDetails.css'
import useMovieDataContext from '../contexts/MovieDataContext'
import { myAxios } from '../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function MovieDetails() {
  

    const location = useLocation()
    //const { movie } = location.state //megkaptuk az akt film adatait
    const { getUserMovies, postUserAddMovie } = useMovieDataContext()
    const [ isModalWatchAgainOpen, setIsModalWatchAgainOpen ] = useState(false)
    const navigate = useNavigate()

 
    const movie = location.state?.movie //location.state-ből kapjuk a movie adatt

    if(!movie){
        return <div className='loading'><FontAwesomeIcon icon={faSpinner} spin size="3x"/></div>


    }

    
    console.log(movie)

    //console.log(movie.genres)
    //console.log(movie.keywords)
    //console.log(movie.id)

    const videoId = movie.trailer_url.split('v=')[1].split('&')[0]
    let releaseDate = movie.release_date
    let newReleaseDate = releaseDate.replace(/-/g,'.')
    //console.log(newReleaseDate)
    const handleClickWatching = async (event) => { //itt kezeljük a listába rakás logikát
        //event.preventDefault()
        setIsModalWatchAgainOpen(true)

        const id = movie.id
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

        navigate('/user/movies/')


    }
  return (
    <div className='movie-wrapper'>
        <div className='movie-details-container container'>
            <section className='movie-small-details'>
                <div className='movie-title d-flex justify-content-between'>
                    <div>
                        <h2 className='movie-title-text'>{movie.title}</h2>
                    </div>
                    <div className='d-block text-end'>
                    <Link>
                        <button className='watch-btn'
                        onClick={handleClickWatching}
                        >WatcList</button>
                    </Link>
                    </div>
                </div>
              
                <div className='movie-info'>
                    <div className='movie-dates'>
                        <span className='me-5 release-date'>{newReleaseDate}.</span>
                        <span className='duration-minute'>{movie.duration_minutes} minutes</span>
                    </div>
                 
                    <div className='movie-genres'>
                        <ul>
                            {movie.genres.map((genre,id) => {
                                return <li key={id}>{genre}, </li>
                            })}
                     
                        </ul>
                    </div>
                   
                </div>
            
            </section>

            <section className='movie-img-video-urls-wrapper w-100'>
                <div className='movie-img-wrapper p-0'>
                    <img className='movie-poster' 
                        src={movie.image_url} 
                        alt={movie.title} />
                    </div>
               
                <div className='movie-video-wrapper'>
                        <iframe src={`https://www.youtube.com/embed/${videoId}`}>
                        </iframe>
                </div>
            </section>

            <section className='movie-imp-details'>
                <div className='movie-description'>
                    <div className='description-wrapper d-flex pb-3'>
                         <p>{movie.description}</p>
                         <p></p>
                    </div>
                    <div className='movie-cast-url-wrapper'>
                    <span className='cast-url'>
                        <Link to={movie.cast_url}>Click to the cast</Link>
                    </span>

                </div>
                    <div className='movie-keywords-wrapper'>
                           <ul>
                           {movie.keywords.map((keyword,id) => {
                                return <li key={id}>{keyword}</li>
                            })}
                         
                           </ul>


                    </div>
                </div>
            
             
             
               


            </section>
      

        </div>



    </div>
  )
}
