
import React from 'react'
import  '../../style/Footer.css';

export default function GuestFooter() {
  return (
    <div className='footer bg-dark h-25'> 
     <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
            <img src="/images/tmdb.svg" alt="TMDb Logo" className="logo-footer"/>
        </a>

    </div>
  )
}
