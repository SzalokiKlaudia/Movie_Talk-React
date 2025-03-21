import React from 'react'

export default function TopMovieModalElem(props) {
    console.log(props.movie.genres)
  return (
    <div className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center">
     
            <div className="card h-100">
                <img src={props.movie.image_url} className="card-img-top" alt="poster"/>
                <div className="card-body p-2 d-flex flex-column">
                    <p className="card-title">{props.movie.title}</p>
                    <p className="description">{props.movie.release_date}</p>
                </div>
            </div>
    </div>
  )
}
