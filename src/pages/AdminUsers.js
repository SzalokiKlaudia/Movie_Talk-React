import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import { all } from 'axios'
import AdminAside from '../components/admin/AdminAside'
import AdminTableUsers from '../components/admin/AdminTableUsers'

export default function AdminUsers() {

    const { allUsers } = useAuthContext()
    console.log(allUsers)
    
  return (
    <div className='container'>
      <div className='row'>
      
        <div className='col'>
          <AdminAside/>
        </div>

        <div className='col'>
          <AdminTableUsers/>
        </div>
     
      </div>



    </div>

  )
}
