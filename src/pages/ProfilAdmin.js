import React from 'react'
import useAuthContext from '../contexts/AuthContext'

export default function ProfilAdmin() {

    const {user} = useAuthContext()
    console.log(user)
    
  return (
    <main>
        <div className=''>
            
            <h3>Profil adatok</h3>
        
        
        </div>
        
    </main>
  )
}
