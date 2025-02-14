

import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import Premiers from '../components/guest/Premiers'



export default function HomeUser() {

  const {user} = useAuthContext()
  const { pMovies } = useAuthContext() // Nem kell useContext-et újra meghívni

  console.log(user)

  return (
      <main>
        <div className='container mt-5'>
          <div>
            <h2 className='ms-5'> Hello {user.name} !</h2>
          </div>
            
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
