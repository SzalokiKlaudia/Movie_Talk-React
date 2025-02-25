

import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'
import GuestFooter from '../components/guest/GuestFooter'


export default function AdminLayout() {
  const { user } = useAuthContext()

    return user && user.is_admin === 1 ?  
      <><AdminNav /> 
        <Outlet />
        <GuestFooter />
      </> : <Navigate to="/"/>

}

