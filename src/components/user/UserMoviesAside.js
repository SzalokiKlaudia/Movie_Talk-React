import React from 'react'

export default function UserMoviesAside() {
  return (
    <>
        <div className='options'
             id='option1'>
                //onClick={}
                <input className="form-check" 
                    type="radio" 
                    id="" 
                    name="customRadios"
                    //value =  //így frissül az állapot
                    
                    />
                <label className="form-check-label input-label"
                    htmlFor="customRadio1">Rated movies</label>
        </div>
            <div className=''
                id='option2'
                    >
                <input className="form-check" 
                    type="radio" 
                    id="" 
                    name="customRadios" 
                    //value = 

                    />
                <label className="form-check-label input-label"
                    htmlFor="customRadio2">Waiting for rate movies</label>
        </div>


    </>
  )
}
