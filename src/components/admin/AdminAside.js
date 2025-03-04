import React, { useState } from 'react'
import '../../style/AdminAside.css'
import useAuthContext from '../../contexts/AuthContext'

export default function AdminAside() {

    const { selectedValue, setSelectedValue, activeUsers, inActiveUsers } = useAuthContext()
    //console.log(activeUsers)
    //console.log(inActiveUsers)
    //console.log(selectedValue)


  return (
        <>
           <div className={`form-check custom-radio option-hover ${selectedValue === 'active' ? 'active' : 'inactive'}`}
             id='option1'>
                <input className="form-check-input input-custom ms-2" 
                    type="radio" 
                    id="activeUser" 
                    name="customRadios"
                    checked = {selectedValue == 'active'}
                    value = 'active'
                    onChange = {(e) => setSelectedValue(e.target.value)}
                    
                    />
                <label className="form-check-label ms-2"
                    htmlFor="customRadio1">Active Users</label>
            </div>
            <div className={`form-check custom-radio option-hover ${selectedValue === 'inactive' ? 'active' : 'inactive'}`} 
                id='option2'>
                <input className="form-check-input input-custom ms-2" 
                    type="radio" 
                    id="inactiveUser" 
                    name="customRadios" 
                    checked = {selectedValue == 'inactive'}
                    value = 'inactive'
                    onChange={(e) => setSelectedValue(e.target.value)}

                    />
                <label className="form-check-label ms-2"
                    htmlFor="customRadio2">Inactive Users</label>
            </div>
        </>

        


   
  )
}
