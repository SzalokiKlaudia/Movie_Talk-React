
import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginRegisterNav() {
  return (
    <header className="navbar navbar-dark bg-dark p-2">

        <nav className="container-fluid d-flex">

        <div>
            <Link className="navbar-brand" to="/" id="logo">
                Movie Track
            </Link>
            
        </div>
        </nav>
    </header>


  )
}
