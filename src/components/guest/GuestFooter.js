
import React from 'react'
import  '../../style/Footer.css';

export default function GuestFooter() {
  const defaultLogo = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
  return (
    <div className='footer bg-dark h-20'> 
     <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
            <img src={defaultLogo} alt="TMDb Logo" className="logo-footer"/>
        </a>

    </div>
  )
}
