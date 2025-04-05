import React from 'react'
import '../../style/Premiers.css';
import Swal from 'sweetalert2';


export default function Premier(props) {
    //console.log(props.movie)
    const handleClick =  () => {
    Swal.fire("Sorry, the film has not been added yet!")
   
    }

    let releaseDate = props.movie.release_date
    let newReleaseDate = releaseDate.replace(/-/g,'.')

  return (
    <div className="col-6 col-sm-4 col-md-4 col-lg-2 d-flex justify-content-center top-movie-users"
    onClick={handleClick}>
     
            <div className="card h-100">
                <img src={props.movie.poster_path} className="card-img-top" alt="poster"/>
                <div className="card-body p-2 d-flex flex-column">
                    <p className="card-title">{props.movie.title}</p>
                    <p className="description">{newReleaseDate}.</p>
                </div>
            </div>
    </div>
    


  )
}
