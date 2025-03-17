import React, { useEffect, useState } from 'react'
import '../../style/AdvancedSearch.css'
import { Link, useNavigate } from 'react-router-dom'
import useMovieDataContext from '../../contexts/MovieDataContext'

export default function AdvancedSearch() {//öszetett kereső logikája

    const { postAdvancedSearch, foundMovies} = useMovieDataContext()
    
    const [title, setTitle] = useState('') //beállítjuk az állapotukat
    const [releaseFrom, setReleaseFrom] = useState('')
    const [releaseTo, setReleaseTo] = useState('')
    const [genre, setGenre] = useState('')
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const handleToChangeGender = (event) => {
        setGenre(event.target.value)
    }
    //console.log(dateFrom)
    //console.log(releaseTo)
    //console.log(keyword)
    //console.log(title)
    //console.log(genre)

    const genres = [
        'Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Science Fiction', 'Romance', 
        'Animation', 'Adventure', 'Documentary', 'Fantasy', 'Crime', 'Mystery', 'History', 
        'War', 'Music', 'Family'
    ]

   
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = { // összegyűjtjük opbektumba az űrlap adatait
            title: title,
            releaseFrom: releaseFrom,
            releaseTo: releaseTo,
            genre: genre,
            keyword: keyword,
          
        }
        //console.log("Sending data to API:", adat);
        //console.log(adat)

        await postAdvancedSearch(data, 'api/movie/advanced-search')
        navigate('/movie/title')//átnavigálunk a találatos url path-ra ahol a MoviesResults komponensben jelenítjük meg a filmes találatokat

    }

    //console.log(foundMovies)

  return (
    <div className='adven-search-container col-12'>
        <h3 className='mb-3'>Advenced search</h3>
        <form onSubmit={handleSubmit}>

            <div className='mb-3'>
                <label htmlFor="title"
                    className='form-label advan-label'>
                    Title
                </label>
                <input type="text" 
                    className='form-control advan-input'
                    id='title'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    placeholder='Movie title'
                />
            </div>

            <div className='mb-3'>
                <label htmlFor="releaseFrom" className="form-label advan-label">
                    Choose a date (from)
                </label>
                <input type="date" 
                    className='form-control advan-input'
                    id='releaseFrom'
                    value={releaseFrom}
                    onChange={(e) => {
                        setReleaseFrom(e.target.value)
                    }}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor="releaseTo" className="form-label advan-label">
                   (to)
                </label>
                <input type="date" 
                    className='form-control advan-input'
                    id='releaseTo'
                    value={releaseTo}
                    onChange={(e) => {
                        setReleaseTo(e.target.value)
                    }}
                />
            </div>

            <div className="mb-3">
    
                <select
                size='4'
                    className="form-select advan-input"
                    id="genre"
                    value={genre}
                    onChange={handleToChangeGender}>
                    <optgroup label="Select genre:">
                        {genres.map((genre, index) => {
                        return <option value={genre} key = {index}>{genre}</option>
                        })}
                    </optgroup>
                
                </select>
            </div>

            <div className='mb-3'>
                <label htmlFor="keyword"
                    className='form-label advan-label'>
                    Keyword
                </label>
                <input type="text" 
                    className='form-control advan-input'
                    id='keyword'
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                    placeholder='Keyword'
                />
            </div>


                <div className='btn-search-container d-block mt-5'>
            
                <button type="submit" 
                    id='advan-btn'
                    className="d-block advenced-search-button m-auto"
                >
                    Search
                </button>
                
                </div>

        </form>

    </div>
  )
}
