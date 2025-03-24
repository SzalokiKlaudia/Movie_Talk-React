import React from 'react'
import '../../style/TopMovieModal.css'

export default function TopMovieModalElement(props) {
    console.log(props.movie.genres)
  return (
     
            <div className="card-wrapper">
                <img src={props.movie.image_url} className="card-img-top" alt="poster"/>
                <div className="card-body p-2 d-flex flex-column">
                    <p className="card-title">{props.movie.title}</p>
                    <p className="description">{props.movie.release_date}</p>
                </div>
            </div>
  )
}
