
import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginRegisterNav() {
  return (
    <header className="navbar navbar-dark bg-dark navbar-expand-lg h-navbar p-3">

        <nav className="container-xxl flex-lg-nowrap custom-navbar">

        <div>
            <Link className="navbar-brand" to="/" id="logo">
                Movie Track
            </Link>
            
        </div>
        </nav>
    </header>


  )
}
