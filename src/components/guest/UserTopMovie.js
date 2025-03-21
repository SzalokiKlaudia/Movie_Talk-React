
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserTopMovie(props) {
  const navigate = useNavigate()


  const handleClick = () => {
    navigate(`/movie/${props.movie.id}/details`, { state: { movie: props.movie } })

  }
  return (

    <div className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center"
    onClick={handleClick}>
     
        <div className="card h-100">
            <img src={props.movie.image_url} className="card-img-top" alt="poster"/>
            <div className="card-body p-2 d-flex flex-column">
                <p className="card-title">{props.movie.title}</p>
            </div>
        </div>
    </div>
  )
}
