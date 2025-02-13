

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../contexts/AuthContext'


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { loginReg, errors } = useAuthContext()

  const handleSubmit = async (e) => {//őt még nemr aktam a formra
    e.preventDefault();


    const adat = { //obj gyűjtuk az adatokat
      email: email,
      password: password,
    }

    console.log(adat)

    loginReg(adat, "/login")
  }
  
  return (
          <div className="m-auto" style={{ maxWidth: "400px" }}>
          <h1 className="text-center">Movie Track</h1>
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
                className="form-control"
                id="email"
                placeholder="email"
                name="email"
              />
            </div>
            <div>
              {errors.email && (
                <span className="text-danger">{errors.email[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="pwd"
                placeholder="password"
                name="pwd"
              />
              <div>
                {errors.password && (
                  <span className="text-danger">{errors.password[0]}</span>
                )}
              </div>
            </div>

            <div className=" text-center">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              <p>
              New to Movie Tack?
                <Link className="nav-link text-info" to="/register">
                  Join now
                </Link>
              </p>
            </div>
          </form>
          </div>
        )
}
