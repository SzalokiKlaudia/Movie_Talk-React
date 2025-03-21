import React, { useState } from 'react'
import '../../style/AdminAside.css'
import useAuthContext from '../../contexts/AuthContext'

export default function AdminAside() {

    const { selectedValue, setSelectedValue} = useAuthContext()
    //console.log(activeUsers)
    //console.log(inActiveUsers)
    //console.log(selectedValue)

    const handleClickActive = () => {
        setSelectedValue('active')

    }

    const handleClickInactive = () => {
        setSelectedValue('inactive')

    }


  return (
        <>
           <div className={`form-check custom-radio option-hover text-center ${selectedValue === 'active' ? 'active' : 'inactive'}`} //megkapja a selectedvalue állapot szerint az aktív vagy inaktív osztályt
             id='option1'
                onClick={handleClickActive}>
                <span>Active users</span>
                
            </div>
            <div className={`form-check custom-radio option-hover text-center ${selectedValue === 'inactive' ? 'active' : 'inactive'}`} 
                id='option2'
                onClick={handleClickInactive} >
                 <span>Inactive users</span>
                
            </div>
        </>

        


   
  )
}
