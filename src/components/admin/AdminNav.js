import { faBars, faSearch, faChevronDown, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from "../../contexts/AuthContext";
import '../../style/AdminNav.css'

export default function AdminNav() {

      const {user, logOut} = useAuthContext()//meghívtuk 
      const [searchOpen, setSearchOpen] = useState(false) // Állapot a kereső nyitásához
      const [titleOpen, setTitleOpen] = useState(false) // A Title lenyitása
      const [menuOpen, setMenuOpen] = useState(false) //hamburger menühöz kell beállítani a state-jéz klikkre
      const [isOpen, setIsOpen] = useState(false) // Lenyíló menü állapota

      const navigate = useNavigate() // Navigációhoz szükséges hook


      const toggleMenuProfil = () => setIsOpen(!isOpen); // Menü lenyitása

      const toggleMenu = () => { //
        setMenuOpen(!menuOpen)
      }

      const handleLogout = async () => {
        await logOut() // Kijelentkeztet
        navigate("/") // Átirányít a főoldalra (vendég kezdőoldal)
      }

      console.log(user)
    

  return (

    <header className="navbar navbar-dark bg-dark navbar-expand-lg h-navbar p-3">
    {/*desktop nézet*/}
    <nav className="container-xxl flex-lg-nowrap custom-navbar">

      <div>
        <Link className="navbar-brand" to="/" id="logo">
            Movie Track
        </Link>
        
      </div>

      
             {/* Hamburger menü gomb (csak mobil nézetben látható) */}
             <button
        className="navbar-toggler d-block d-lg-none"
        type="button"
        onClick={toggleMenu}
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

   


      <form
        className={`d-none d-lg-block justify-content-center w-50 mx-3 ${searchOpen ? "search-open" : ""}`}
        role="search">
        <div className="input-group">
          {/* Title dropdown */}
          
            <button
              id="btn-title"
              className="btn btn-light dropdown-toggle"
              type="button"
              aria-expanded={titleOpen ? "true" : "false"}
              onClick={() => setTitleOpen(!titleOpen)}
            >
              Title
            </button>
            {titleOpen && (
              <ul className="dropdown-menu show">
                <li>
                  <Link className="dropdown-item" to="/advanced-search">
                    Advanced Search
                  </Link>
                </li>
              </ul>
            )}
          

          {/* Kereső input */}
          <input
            className="form-control flex-grow-1"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />

          {/* Kereső ikon */}
          <button id="search" className="btn btn-light" type="button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>


      {/* itt kezdődik a profil menüje */}
      <ul className="navbar-nav flex-row gap-3 d-none d-lg-flex">
        <li className="nav-item position-relative">
            {/* Felhasználói menü */}
          <div className="d-flex align-items-center gap-2 bg-dark text-white py-2 px-4 rounded-pill custom"
             onClick={toggleMenuProfil}>
             
              <FontAwesomeIcon icon={faUserCircle} />  {/* felhasználó kör ikonja */}
               
              <span className="fw-semibold">{user.user_name}</span>  {/* felh neve */}

                {/* nyíl, ami kattintásra lenyitja a menüt */}
              <FontAwesomeIcon icon={faChevronDown} className={`fs-5 ${isOpen ? "rotated" : ""}`} />
            </div>

          {/* lenyíló profil menü */}
          {isOpen && (
            <ul className="position-absolute top-100 end-0 w-100 shadow-lg rounded py-2 z-50 custom-bg mt-2">
                <li className="list-unstyled">
                    <Link to="/user" className="d-block px-4 py-2 text-white text-decoration-none hover">
                        Profil
                    </Link>
                </li>

                <li className="list-unstyled">
                    <Link to="/admin/users" className="d-block px-4 py-2 text-white text-decoration-none hover">
                        Users
                    </Link>
                </li>

                <li className="list-unstyled">
                    <button onClick={handleLogout} className="w-100 text-start px-4 py-2 text-white border-0 bg-transparent hover">
                        Log out
                    </button>
                </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>



       {/*mobil nézet, csak mobil kijelzőn aktiválódik ha a hamburgerre katt active osztályt kap*/}
       <div className={`mobile-menu d-lg-none ${menuOpen ? "active" : ""}`}>

          <ul className="navbar-nav flex-column align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" id="nav-log">Profil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" id="nav-reg" to="/admin/users">Users</Link>
            </li>
            <li className="nav-item">
            <button onClick={handleLogout} className="w-100 text-start px-4 py-2 text-white border-0 bg-transparent hover">
                        Log out
                    </button>
            </li>
          </ul>
                {/* KERESŐ FORM (MOBIL) */}
          <form className="mobile-search" role="search">
            <div className="input-group">
              <button id="btn-title" className="btn btn-light dropdown-toggle" type="button"
              aria-expanded={titleOpen ? "true" : "false"}
              onClick={() => setTitleOpen(!titleOpen)}
            >
                Title
              </button>
              {titleOpen && (
                    <ul className="dropdown-menu show w-100">
                      <li>
                        <Link className="dropdown-item" to="/advanced-search">
                          Advanced Search
                        </Link>
                      </li>
                    </ul>
                  )}
              <input
                className="form-control flex-grow-1"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button id="search" className="btn btn-light" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>

        </div>

  </header>
  )
}
