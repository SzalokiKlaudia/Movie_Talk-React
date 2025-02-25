import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../style/GuestNav.css';



export default function GuestNav() {
    const [searchOpen, setSearchOpen] = useState(false); // Állapot a kereső nyitásához
    const [titleOpen, setTitleOpen] = useState(false); // A Title lenyitása
    const [menuOpen, setMenuOpen] = useState(false); //hamburger menühöz kell beállítani a state-jéz klikkre
    const toggleMenu = () => {
      setMenuOpen(!menuOpen)
    }

  

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

      
       {/*mobil nézet, csak mobil kijelzőn aktiválódik ha a hamburgerre katt active osztályt kap*/}
        <div className={`mobile-menu d-lg-none ${menuOpen ? "active" : ""}`}>

          <ul className="navbar-nav flex-column align-items-center">
            <li className="nav-item">
              <Link className="nav-link" id="nav-log" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="nav-reg">Join now</Link>
            </li>
          </ul>
                {/* mobil kereső form-ja */}
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