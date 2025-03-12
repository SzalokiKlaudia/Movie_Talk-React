import React, { useState } from 'react'
import '../../style/AdminAside.css'
import useAuthContext from '../../contexts/AuthContext'

export default function AdminAside() {

    const { selectedValue, setSelectedValue} = useAuthContext()
    //console.log(activeUsers)
    //console.log(inActiveUsers)
    //console.log(selectedValue)


  return (
        <>
           <div className={`form-check custom-radio option-hover ${selectedValue === 'active' ? 'active' : 'inactive'}`}
             id='option1'
                onClick={() => setSelectedValue('active')}>
                <input className="form-check-input input-custom" 
                    type="radio" 
                    id="activeUser" 
                    name="customRadios"
                    value = 'active' //így frissül az állapot
                    
                    />
                <label className="form-check-label input-label"
                    htmlFor="customRadio1">Active Users</label>
            </div>
            <div className={`form-check custom-radio option-hover ${selectedValue === 'inactive' ? 'active' : 'inactive'}`} 
                id='option2'
                onClick={() => setSelectedValue('inactive')} >
                <input className="form-check-input input-custom" 
                    type="radio" 
                    id="inactiveUser" 
                    name="customRadios" 
                    value = 'inactive'

                    />
                <label className="form-check-label input-label"
                    htmlFor="customRadio2">Inactive Users</label>
            </div>
        </>

        


   
  )
}
