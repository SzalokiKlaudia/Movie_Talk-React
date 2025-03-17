import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../style/MovieCard.css'
import useMovieDataContext from '../../contexts/MovieDataContext'

export default function MovieCard(props) { //filmes találatok példányosítása soronként


  const navigate = useNavigate()

  const handleClick = () => {
    //át navigálunk másik url-be és átadjuk a film id-ját az útvonalnak
    navigate(`/movie/${props.movie.id}/details`, { state: { movie: props.movie } })
      //a film adatait a state objektumban küldjük át, dinamikus az id az urlben!!

  }

  //onsole.log(props.movie.genres)
  //console.log(props.movie.keywords)
  let releaseDate = props.movie.release_date
  let newReleaseDate = releaseDate.replace(/-/g,'.')


  return (
    <li className='d-flex custom-list-border'
      onClick={handleClick}>
            <div className='movie-image-wrapper mb-2'>
                <img src={props.movie.image_url} 
                alt={props.movie.title}
                className='movie-img'
                
                />
            </div>
                <div className="movie-datas mb-2 d-flex flex-column justify-content-center ms-3">
                    <h5 className="card-title mb-3">{props.movie.id}. {props.movie.title}</h5>
                    <p className="card-release-date">{newReleaseDate}</p>
               
                </div>
    </li>
  )
}
