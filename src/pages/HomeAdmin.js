
import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import Premiers from '../components/guest/Premiers'

export default function HomeAdmin() {

    const {user} = useAuthContext()
    const { pMovies } = useAuthContext() // Nem kell useContext-et újra meghívni
    
    console.log(user)
  
  return (
   

    <main>
      <div>
        hello...
      </div>
          <div className='container'>
        
            <section className='section1'>
            <h3 className='title'>
              Premier filmek
            </h3>
           
          
            {pMovies ? <Premiers premiers={pMovies} /> : "No premiers found"}
    
    
            </section>
            <h3 className='title'>
              Népszerű filmek
            </h3>
            <section className='section2'>
          
    
            </section>
    
            <section className='section3'>
    
            </section>
          </div>
        </main>
    
  )
}
