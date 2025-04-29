import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../../contexts/AuthContext'
import { faBars, faSearch, faChevronDown, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../style/AdminNav.css'
import useFileContext from '../../contexts/FileContext';

export default function AdminNoSearchNav() {

  const {user, logOut} = useAuthContext()//meghívtuk 
  const navigate = useNavigate() // Navigációhoz szükséges hook
  const { profilPicture } = useFileContext()
  

  const [isOpen, setIsOpen] = useState(false) // Lenyíló menü állapota
  const toggleMenuProfil = () => {
    setIsOpen(!isOpen) // Menü lenyitása
  }

  const [menuOpen, setMenuOpen] = useState(false) //hamburger menühöz kell beállítani a state-jéz klikkre
  const toggleMenu = () => { 
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    await logOut() // Kijelentkeztet
    navigate("/") // Átirányít a főoldalra (vendég kezdőoldal)
  }

  const defaultProfilePicture = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  const baseUrl = (process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API_URL)
  const imageUrl = baseUrl + `${profilPicture}`

  //console.log(user)


  return (
    <header className="navbar navbar-dark bg-dark p-3">
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
        aria-expanded={menuOpen ? "true" : "false"}> 
        <span className="navbar-toggler-icon">
        </span>
        </button>

      <form
        className={`d-none d-lg-block justify-content-center w-50 mx-3`}
        role="search">
       
      </form>

      {/* itt kezdődik a profil menüje */}
      <ul className="navbar-nav flex-row gap-3 d-none d-lg-flex">
        <li className="nav-item position-relative">
            {/* Felhasználói menü */}
          <div className="d-flex align-items-center gap-2 bg-dark text-white py-2 px-4 rounded-pill custom"
            aria-expanded={isOpen ? "true" : "false"} //itt látjuk h a menü nyitva van-e vagy sem, a isOpen értékét ami false alapban

             onClick={toggleMenuProfil}>
             
             <div className='avatar'>
                <img src={imageUrl || defaultProfilePicture}/>  {/* felhasználó kör ikonja */}
              </div>
               
              <span className="fw-semibold">{user.user_name}</span>  {/* felh neve */}

                {/* nyíl, ami kattintásra lenyitja a menüt */}
              <FontAwesomeIcon icon={faChevronDown} className={`fs-5 ${isOpen ? "rotated" : ""}`} />
            </div>

          {/* ha true értéket kap bekerül a DOM-ba */}
          {isOpen && (
            <ul className="position-absolute top-100 end-0 w-100 shadow-lg rounded py-2 z-50 custom-bg mt-2 p-0">
                <li className="list-unstyled">
                    <Link to="/user" className="d-block px-4 py-2 text-white text-decoration-none hover"
                     onClick={() => setIsOpen(false)}> {/*ő segít bezárni dinamikusan a lenyíló menüt */}
                        Profil
                    </Link>
                </li>

                <li className="list-unstyled">
                    <Link to="/admin/users" className="d-block px-4 py-2 text-white text-decoration-none hover"
                     onClick={() => setIsOpen(false)}>
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

       {/*mobil nézet, csak mobil kijelzőn aktiválódik ha a hamburgerre katt active osztályt kap és block element elsz*/}
       <div className={`mobile-menu d-lg-none ${menuOpen ? "active" : ""}`}>

          <ul className="navbar-nav flex-column align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" id="nav-log" to="/user"
               onClick={() => setMenuOpen(false)}>
                Profil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" id="nav-reg" to="/admin/users"
               onClick={() => setMenuOpen(false)}>
                Users
              </Link>
            </li>
            <li className="nav-item">
            <button onClick={handleLogout} className="w-100 text-start px-4 py-2 text-white border-0 bg-transparent hover">
              Log out
            </button>
            </li>
          </ul>
              

      </div>

  </header>
  )
}
