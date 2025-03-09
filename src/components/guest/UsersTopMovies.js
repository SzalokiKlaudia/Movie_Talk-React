
import React from 'react'
import UserTopMovie from './UserTopMovie'

export default function UsersTopMovies(props) {
    console.log(props.UsersTopMovies)
  return (
    <>
         <div className='row custom-row'>
         {props.usersTopMovies.map((data, id) => {
           
              return  <UserTopMovie movie={data} key={id}/>
           })}
           </div>
   
   
    </>
  )
}
