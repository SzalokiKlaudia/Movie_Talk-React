import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../style/GuestNav.css';
import { myAxios } from "../../api/axios";
import useMovieDataContext from "../../contexts/MovieDataContext";



export default function GuestNav() {


    const [menuOpen, setMenuOpen] = useState(false) //hamburger menühöz kell beállítani a state-jéz klikkre
    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

      
    //egyszerű keresés!
    const { postSearchByTitle, setFoundMovies} = useMovieDataContext()
    const [ searchTitle, setSearchTitle ] = useState('') //itt tároljuk el az input értékét

    const handleInputChange = (e) => {
      const value = e.target.value
      setSearchTitle(value) //frissít input érték

    }

    //egyszerű kereséhez hozzárendeljük a button-höz
      const handleSearch = (e) => {
      
          if (searchTitle === '') {
            setFoundMovies([]) 
          } else {
            postSearchByTitle(searchTitle)
          }
  
      }

    return (

      <header className="navbar navbar-dark bg-dark p-3">
        {/*desktop nézet*/}
        <nav className="container flex-lg-nowrap custom-navbar bg-dark">

          <div>
            <Link className="navbar-brand" to="/" id="logo">
                Movie Track
            </Link>
            
          </div>

                {/* Hamburger menü gomb (csak mobil nézetben látható) */}
          <button
              className="navbar-toggler d-block d-lg-none" //d-lg-none eltüntei nagy kijelzőn, bootstrap-el formázzuk
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen ? "true" : "false"}> 
              <span className="navbar-toggler-icon"></span>
          </button>


            {/*ez a kereső sávja ami csak nagyobb kijelzőkön látható, kisebb kijelzőkön a hamburger nyitott menüjében van */}

          <form
            className={`d-none d-lg-block justify-content-center w-50 mx-3`}>
            <div className="input-group">

                <button
                  id="btn-title-mobile"
                  className="btn btn-light title-btn"
                  type="button"
                >
                  Title
                </button>
          
              

              {/* Kereső input a filmek keresésére */}
              <input
              id="search-input-guest"
                className="form-control flex-grow-1"
                type="search"
                value={searchTitle}
                onChange={handleInputChange} //mindig frissíti az input karaktereket
                placeholder="Search..."
                aria-label="Search"
              />

              {/* Kereső ikon ami elindítja  a keresését */}
              <button id="search"
                onClick={handleSearch}
                className="btn btn-light" 
                type="button">
                <Link className="search-btn" to= '/movie/title'>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </Link>
              
              </button>
            </div>
          </form>


            <ul className="navbar-nav flex-row flex-wrap gap-3 d-none d-lg-flex">
              <li className="nav-item">
                <Link className="nav-link"to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Join now
                </Link>
              </li>
            
            </ul>
        </nav>

      
       {/*mobil nézet, csak mobil kijelzőn aktiválódik ha a hamburgerre katt, ezek a menüpontok
        alapértelmezetten display none, ha katt  hanburgerre ez a menüpontok active osztályt kapnak és 
        block elem lesz a mobile-menu-active osztálya*/}
        <div className={`mobile-menu d-lg-none ${menuOpen ? "active" : ""}`}>

          <ul className="navbar-nav flex-column align-items-center">
            <li className="nav-item">
              <Link className="nav-link" id="nav-log" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="nav-reg" to="/register">Join now</Link>
            </li>
          </ul>
                {/* mobil kereső form-ja */}
          <form className="mobile-search">
            <div className="input-group">
              <button id="btn-title-mobile" 
                className="btn btn-light title-btn" 
                type="button"
              >
                Title
              </button>

              <input
                className="form-control flex-grow-1"
                id="search-input-guest"
                value={searchTitle}
                onChange={handleInputChange} //mindig frissíti az input karaktereket
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button id="search" 
                className="btn btn-light" 
                type="button"
                onClick={handleSearch}>
                <Link className="search-btn" to= '/movie/title'>
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </Link>
              </button>
            </div>
          </form>
        
        

        </div>
      </header>
    )
}