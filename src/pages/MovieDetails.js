
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../style/MovieDetails.css'
import useMovieDataContext from '../contexts/MovieDataContext'

export default function MovieDetails() {
    const location = useLocation()
    const { movie } = location.state
    //const [  movieDetails, getMovieKeywordsAndGenres, setMovieDetails] = useMovieDataContext()
    //console.log(movie)

    const videoId = movie.trailer_url.split('v=')[1].split('&')[0]
    let releaseDate = movie.release_date
    let newReleaseDate = releaseDate.replace(/-/g,'.')
    //console.log(newReleaseDate)
    


  return (
    <div className='movie-wrapper'>
        <div className='movie-details-container container'>
            <section className='movie-small-details'>
                <div className='movie-title'>
                    <h2 className='movie-title-text'>{movie.title}</h2>
                </div>
                <div className='movie-info'>
                    <span className='me-5 release-date'>{newReleaseDate}.</span>
                    <span className='duration-minute'>{movie.duration_minutes} minutes</span>
                    <span className='movie-genres'></span>
                </div>
            </section>

            <section className='movie-img-video-urls-wrapper m-0 row'>
                <div className='movie-img-wrapper col-md-4 text-start p-0'>
                    <img className='movie-poster' 
                        src={movie.image_url} 
                        alt={movie.title} />
                </div>
                <div className='movie-video-wrapper col-md-8 text-end p-0'>
                    <div className='ratio ratio-16x9'>
                        <iframe src={`https://www.youtube.com/embed/${videoId}`} >
                        </iframe>
                    </div>
                </div>
            </section>

            <section className='movie-imp-details'>
                <div className='movie-description'>
                    <div className='description-wrapper'>
                         <p>{movie.description}</p>
                    </div>
                    <div className='movie-keywords-wrapper'>
                        <div className='keywords'>

                        </div>

                    </div>
                </div>
                <div className='movie-cast-url-wrapper'>
                    <span className='cast-url'>
                        <Link to={movie.cast_url}>Click to the cast</Link>
                    </span>

                </div>
               


            </section>

        </div>



    </div>
  )
}
