import React from 'react'
import Premier from './Premier'
import '../../style/Premiers.css';


export default function Premiers(props) {
  //console.log(props.premiers)
  return (
    <>
      <div className='row custom-row'>
      {props.premiers.map((movie) => {
        
           return  <Premier movie={movie} key={movie.id}/>
        })}
        </div>


    </>
  )
}
