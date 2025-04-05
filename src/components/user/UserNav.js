

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../../contexts/AuthContext'
import { faBars, faSearch, faChevronDown, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMovieDataContext from '../../contexts/MovieDataContext';
import '../../style/GuestNav.css'
import useFileContext from '../../contexts/FileContext';

export default function UserNav() {

  const {user, logOut} = useAuthContext()//meghívtuk 
  const { profilPicture } = useFileContext()
  const [menuOpen, setMenuOpen] = useState(false) //hamburger menühöz kell beállítani a state-jéz klikkre

  const navigate = useNavigate() // Navigációhoz szükséges hook

  const [isOpen, setIsOpen] = useState(false) // A nyíl állapotát határozza meg, ha turue lesz hozzáadjuk a rotated osztályt, ami elforgatja a nyilat 180%-ban
  const toggleMenuProfil = () => { // a metódus profil menü állapotát állítja be, alapártelmezetten zárt lesz, kattintásra nyitott
    setIsOpen(!isOpen) // Menü lenyitása
  }

  const toggleMenu = () => { //a metódus mobil nézetben a hamburger ikont nyitja ki, és zárja be true, false értékekkel
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    await logOut() // Kijelentkeztet
    navigate("/") // Átirányít a főoldalra (vendég kezdőoldal)
  }

   const baseUrl = "http://localhost:8000/storage"
  const imageUrl = baseUrl + `/${profilPicture}`

  //console.log(user)

  //egyszerű keresés

  const { postSearchByTitle, setFoundMovies} = useMovieDataContext()
  const [ searchTitle, setSearchTitle ] = useState('') //itt tároljuk el az input értékét

    //egyszerű kereséhez hozzárendeljük a button-höz
    const handleSearch = (e) => {
      
      if (searchTitle === '') {
        setFoundMovies([]) 
      } else {
        postSearchByTitle(searchTitle)
      }

    }


  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTitle(value) //frissít input érték

  }

  //alapért kép
  const defaultProfilePicture = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"






  return (
    <header className="navbar navbar-dark bg-dark navbar-expand-lg h-navbar p-3">
    {/*desktop nézet*/}
    <nav className="container flex-lg-nowrap custom-navbar">

      <div>
        <Link className="navbar-brand" 
          to="/" 
          id="logo">
            Movie Track
        </Link>
        
      </div>

      
             {/* Hamburger menü gomb (csak mobil nézetben látható) */}
        <button //
          className="navbar-toggler d-block d-lg-none hamburger-button" //d-lg-none eltüntei nagy kijelzőn, bootstrap-el formázzuk
          type="button"
          aria-expanded={menuOpen ? "true" : "false"} //az olvashatóság miatt kell,itt látjuk h a menü nyitva van-e vagy sem, a menueOpen értékét ami false alapban
          onClick={toggleMenu} >
        <span className="navbar-toggler-icon"></span> 
      </button>
   
      {/*ez a kereső sávja ami csak nagyobb kijelzőkön látható, kisebb kijelzőkön a hamburger nyitott menüjében van */}
      <form
        className={`d-none d-lg-block justify-content-center w-50 mx-3`}
        role="search">
        <div className="input-group">

            <button
              id="btn-title-user-mobile"
              className="btn btn-light"
              type="button"
            >
              Title
            </button>
    
          {/* Kereső input */}
          <input
            id='search-input-user'
            className="form-control flex-grow-1"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={searchTitle}
            onChange={handleInputChange}
          />

          {/* Kereső ikon */}
          <button id="search" 
            className="btn btn-light" 
            onClick={handleSearch}
            type="button">
            <Link className="search-btn" to= '/movie/title'>
              <FontAwesomeIcon icon={faSearch} className='search-icon' />
            </Link>
          </button>
        </div>
      </form>


      {/* itt kezdődik a profil menüje amit csak nagyobb klpernyőn látunk d-lg-flex, kicsin pedig d-none*/}
 
      <ul className="navbar-nav flex-row gap-3 d-none d-lg-flex">
        <li className="nav-item position-relative">
            {/* Felhasználói menü ha katt a divre akkor a falseból true lesz */}
          <div className="d-flex align-items-center gap-2 bg-dark text-white py-2 px-4 rounded-pill custom"
            aria-expanded={isOpen ? "true" : "false"} //itt látjuk h a menü nyitva van-e vagy sem, a isOpen értékét ami false alapban
            onClick={toggleMenuProfil}>
             <div className='avatar'>
                <img src={profilPicture || defaultProfilePicture}/>  {/* felhasználó kör ikonja */}
            </div>
            <span className="fw-semibold">{user.user_name}</span>  {/* felh neve */}

                {/* nyíl,nyíl, ha isOpen true állapot  akkor hozzáadja a rotated osztályt és elforgatja a nyilat 180 %-ban */}
            <FontAwesomeIcon icon={faChevronDown} className={`fs-5 ${isOpen ? "rotated" : ""}`} />
          </div>

          {/* lenyíló profil menü ha az isopen true megjelenik az ul a DOM-ban vagyis a menüpontok nagy kijelzőn*/}
          {isOpen && (
            <ul className="position-absolute top-100 w-100 shadow-lg rounded py-2 z-50 custom-bg mt-2 p-0">
                <li className="list-unstyled">
                    <Link to="/user" 
                      className="d-block px-4 py-2 text-white text-decoration-none hover">
                      Profil
                    </Link>
                </li>

                <li className="list-unstyled">
                    <Link to="/user/movies" 
                      className="d-block px-4 py-2 text-white text-decoration-none hover"
                      onClick={() => setIsOpen(false)}>
                      My Movies
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


    {/*csak mobil kijelzőn aktiválódik ha a hamburgerre katt active osztályt kap ezek a menüpontok
        alapértelmezetten display none, ha katt  hanburgerre ez a menüpontok active osztályt kapnak és 
        block elem lesz a mobile-menu-active osztálya*/}  
        
       <div className={`mobile-menu d-lg-none ${menuOpen ? "active" : ""}`}>
          <ul className="navbar-nav flex-column align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" 
                id="nav-log" 
                to="/user">Profil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" 
                to="/user/movies"
                id="nav-reg">My Movies
              </Link>
            </li>
            <li className="nav-item">
            <button onClick={handleLogout} 
              className="w-100 text-start px-4 py-2 text-white border-0 bg-transparent hover">
              Log out
            </button>
            </li>
          </ul>
                {/* mobil nézet keresője */}
          <form className="mobile-search" role="search">
            <div className="input-group">
              <button id="btn-title-user-mobile" 
                className="btn btn-light" 
                type="button"
            >
                Title
              </button>
  
              <input
                id="search-input-user"
                className="form-control flex-grow-1"
                value={searchTitle}
                onChange={handleInputChange}
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button id="search"
              onClick={handleSearch}
                className="btn btn-light" 
                type="button">
                <Link to='/movie/title'>
                  <FontAwesomeIcon icon={faSearch} className='search-icon' />
                </Link>
              </button>
            </div>
          </form>

        </div>

  </header>
  )
}
