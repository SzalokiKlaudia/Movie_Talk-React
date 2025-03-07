import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/MovieCard.css'

export default function MovieCard(props) {
  return (
    <li className='d-flex custom-list-border'>
        <Link className='d-flex w-100 text-decoration-none text-dark'>
            <div className='movie-image-wrapper mb-2'>
                <img src={props.movie.image_url} 
                alt={props.movie.title}
                className='movie-img'
                
                />
            </div>
                <div className="movie-datas mb-2 d-flex flex-column justify-content-center ms-3">
                    <h5 className="card-title mb-3">{props.movie.id}. {props.movie.title}</h5>
                    <p className="card-release-date">{props.movie.release_date}</p>

               
                </div>


        </Link>
    
    </li>
  )
}
