import React, { useState } from 'react'
import '../../style/AdvencedSearch.css'

export default function GuestAdvencedSearch() {

    const genres = [
        'Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 'Science Fiction', 'Romance', 
        'Animation', 'Adventure', 'Documentary', 'Fantasy', 'Crime', 'Mystery', 'History', 
        'War', 'Music', 'Family'
    ]

    const [title, setTitle] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [genre, setGenre] = useState('');
    const [keyword, setKeyword] = useState('')

  return (
    <div className='adven-search-container col-12'>
        <h3 className='mb-3'>Advenced search</h3>
        <form action="">

            <div className='mb-3'>
                <label htmlFor="title"
                    className='form-label'>
                    Title
                </label>
                <input type="text" 
                    className='form-control'
                    id='title'
                    value={title}
                    placeholder='Movie title'
                />
            </div>

            <div className='mb-3'>
                <label htmlFor="dateFrom" className="form-label">
                   Enter full date
                </label>
                <input type="date" 
                    className='form-control'
                    id='dateFrom'
                    value={dateFrom}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor="dateTo" className="form-label">
                   to
                </label>
                <input type="date" 
                    className='form-control'
                    id='dateTo'
                    value={dateTo}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="genre" className="form-label">Select genre</label>
                <select
                    className="form-select"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}>
                    <option value="">Select Genre</option>
                    {genres.map((genre, index) => {
                        <option value={genre} key = {index}></option>
                    })}
                
                </select>
            </div>

            <div className='mb-3'>
                <label htmlFor="keyword"
                    className='form-label'>
                    Keyword
                </label>
                <input type="text" 
                    className='form-control'
                    id='keyword'
                    value={keyword}
                    placeholder='Keyword'
                />
            </div>



                <div className='btn-search-container d-block mt-5'>
                <button type="submit" className="d-block advenced-search-button m-auto">
                    Search
                </button>
                </div>

        

            
        </form>



    </div>
  )
}
