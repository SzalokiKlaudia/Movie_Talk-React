
import React from 'react'

export default function UserTopMovie(props) {
  return (

    <div className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center">
     
        <div className="card h-100">
            <img src={props.movie.image_url} className="card-img-top" alt="poster"/>
            <div className="card-body p-2 d-flex flex-column">
                <h5 className="card-title">{props.movie.title}</h5>
            </div>
        </div>
    </div>
  )
}
