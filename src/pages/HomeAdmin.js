
import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import Premiers from '../components/guest/Premiers'
import UsersTopMovies from '../components/guest/UsersTopMovies'
import TopUsers from '../components/guest/TopUsers'

export default function HomeAdmin() {

    const {user} = useAuthContext()
    const { pMovies, usersTopMovies, topUsers } = useAuthContext() // Nem kell useContext-et újra meghívni
    
    console.log(user)
  
  return (
   

    <main>
        <div className='container pt-5'>
          <div>
            <h2 className='ms-5'> Hello {user.name} !</h2>
          </div>
            
          <section className='section1'>
            <h3 className='title'>
                  Premier filmek
            </h3>

            {pMovies ? <Premiers premiers={pMovies} /> : "No premiers found"}
        
          </section>
          
          <section className='section2'>
             <h3 className='title'>
                Felhasználók Top filmei
            </h3>
                        
            {usersTopMovies ? <UsersTopMovies usersTopMovies={usersTopMovies} /> : "No movies found"}
              
          </section>
        
          <section className='section3'>
             <h3 className='title'>
              Legaktívabb tagjaink
            </h3>
                        
            {topUsers ? <TopUsers users={topUsers} /> : "Could not find any data"}
        
          </section>
          
        </div>
      </main>
    
  )
}
