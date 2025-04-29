
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../style/MovieCard.css'
import useAuthContext from '../../contexts/AuthContext'

export default function UserTopMovie(props) {
  const {user} = useAuthContext()

  //console.log(user)
  const navigate = useNavigate()


  const handleClick = () => {
    console.log(props.movie)
    if(!user || user.is_admin == 0){
      navigate(`/movie/${props.movie.movie_id}/details`, { state: { movie: props.movie } })
    }
    

  }
  return (

    <div className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center top-movie-users"
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
