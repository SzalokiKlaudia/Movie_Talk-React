

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../contexts/AuthContext'
import '../style/LoginRegistration.css'



export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { loginReg, errors } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();


    const adat = { //obj gyűjtuk az adatokat
      email: email,
      password: password,
    }


    loginReg(adat, "/login")
  }
  
  return (
        <main className='main'>
          <div className="p-0 login-cont">
          <h1 className="text-center custom-brand">Movie Track</h1>
        <div className='p-3'>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
              </label>
              <input
                type="email"
             
                // value beállítása a state értékére
                value={email}
                // state értékének módosítása ha változik a beviteli mező tartalma
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control log-input"
                id="email"
                placeholder="email"
                name="email"
                required
              />
            </div>
            <div>
              {errors.email && (
                <span className="text-danger">{errors.email[0]}</span>
              )}
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="pwd" className="form-label">
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control log-input"
                id="pwd"
                placeholder="password"
                name="pwd"
                required
              />
              <div>
                {errors.password && (
                  <span className="text-danger">{errors.password[0]}</span>
                )}
              </div>
            </div>

            <div className="text-center mb-3 mt-5">
              <button type="submit" className="log-reg-btn">
                Login
              </button>
            </div>
          
          </form>
        
        </div>
        <div className='d-flex justify-content-center mt-5 custom-info'>
            <p className='text-log-reg'>
              New to Movie Tack?
                <Link className="nav-link text-info text-center" to="/register">
                  Join now
                </Link>
              </p>
              </div>
          </div>
        </main>
        )
}
