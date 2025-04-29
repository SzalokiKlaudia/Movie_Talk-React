
import React from 'react'
import  '../../style/Footer.css';

export default function GuestFooter() {
  const defaultLogo = 'http://localhost:3000/images/tmdb.svg'
  return (
    <div className='footer bg-dark h-20'> 
     <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
            <img src={defaultLogo} alt="TMDb Logo" className="logo-footer"/>
        </a>

    </div>
  )
}
