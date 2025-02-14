
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../contexts/AuthContext'
import '../style/Registration.css'



export default function Registration() {

  //beállítjuk az állapotukat
  const [ user_name, setUserName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ password_confirmation, setPasswordConfirmation ] = useState("")
  const [ name, setName ] = useState("")
  const [ gender, setGender ] = useState("")
  const [ birth_year, setBirthYear ] = useState("")


  const handleGenderChange = (event) => { // a gender kiválasztás kezelése
    setGender(event.target.value)
  }

  const navigate = useNavigate()//hook segítségével msá oldalra navigálhatsz

  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => { // az oldal újratöltését akadályozza meg
    e.preventDefault()

  const adat = { // összegyűjtjük opbektumba az űrlap adatait
      user_name: user_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      name: name,
      gender: gender,
      birth_year: birth_year,
    }

    console.log(adat)

    loginReg(adat, "/register")//átadjuk az objektumot és az űtvonalat, hogy postolja az adatokat
  } 





  return (
    <main className='main'>
      <div className=" m-auto container" style={{ maxWidth: "400px" }}>
        <h1 className="text-center">Movie Track</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
            </label>
            <input
              type="text"
              value={user_name}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="form-control"
              id="user_name"
              placeholder="Username"
              name="user_name"
            />
            <div>
              {errors.user_name && (
                <span className="text-danger">{errors.user_name[0]}</span>
              )}
            </div>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="email"
              placeholder="email"
              name="email"
            />
            <div>
              {errors.email && (
                <span className="text-danger">{errors.email[0]}</span>
              )}
            </div>
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

          <div className="mb-3 mt-3">
            <label htmlFor="pwd2" className="form-label">
              
            </label>
            <input
              type="password"
              value={password_confirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
              className="form-control"
              id="pwd2"
              placeholder="password confirmation"
              name="pwd2"
            />
            <div>
              {errors.password_confirmation && (
                <span className="text-danger">
                  {errors.password_confirmation[0]}
                </span>
              )}
            </div>
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control"
              id="pwd2"
              placeholder="Name"
              name="name"
            />
            <div>
              {errors.name && (
                <span className="text-danger">
                  {errors.name[0]}
                </span>
              )}
            </div>
          </div>

          <div className='mb-3 mt-3'>{/*gender beállítása */}
            <label htmlFor="gender" className="form-label">
              
            </label>
            <select class="form-select" aria-label="gender" value={gender}
              onChange={handleGenderChange}>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
            <div>
              {errors.gender && (
                <span className="text-danger">
                  {errors.gender[0]}
                </span>
              )}
            </div>
          </div>

          <div className='mb-3 mt-3'>
            <label htmlFor="birth_year"></label>
            <input
              type="number"
              id="birth_year"
              className="form-control"
              min="1900" 
              max={new Date().getFullYear()}
              value={birth_year} 
              onChange={(e) => setBirthYear(e.target.value)} 
              placeholder="Enter your birth year"
            />
            <div>
              {errors.birth_year && (
                <span className="text-danger">
                  {errors.birth_year[0]}
                </span>
              )}
            </div>
          </div>

          <div className='mb-3 mt-5'>
            <button type="submit" className="btn btn-primary w-100 reg-btn">
              Join now
            </button>
          </div>
          <div className='d-flex justify-content-center'>
            <p>
              Are you a member?
                <Link className="nav-link text-info text-center" to="/login">
                    Login
              </Link>
            </p>
            </div>

        </form>
      </div>
    </main>
  )
}
