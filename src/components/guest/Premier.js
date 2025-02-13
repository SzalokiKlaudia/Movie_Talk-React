import React from 'react'
import '../../style/Premiers.css';


export default function Premier(props) {
    //console.log(props.movie)
  return (
    <div className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center">
     
            <div className="card h-100">
                <img src={props.movie.poster_path} className="card-img-top" alt="poster"/>
                <div className="card-body p-2 d-flex flex-column">
                    <h5 className="card-title">{props.movie.title}</h5>
                    <p className="description">{props.movie.release_date}</p>
                </div>
            </div>
    </div>
    


  )
}
