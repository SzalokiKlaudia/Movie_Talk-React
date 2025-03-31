import React from 'react'
import '../../style/TopMovieModal.css'
import { Navigate, useNavigate } from 'react-router-dom'

export default function TopMovieModalElement(props) {
    console.log(props.movie)
    const navigate = useNavigate()

    const handleClick = () => {
        console.log(props.movie)
        navigate(`/movie/${props.movie.movie_id}/details`, { state: { movie: props.movie } })
    
      }
  return (
     
            <div className="card-wrapper" onClick={handleClick}>
                <img src={props.movie.image_url} className="card-img-top" alt="poster"/>
                <div className="card-body p-2 d-flex flex-column">
                    <p className="card-title">{props.movie.title}</p>
                    <p className="description">{props.movie.release_date}</p>
                </div>
            </div>
  )
}
