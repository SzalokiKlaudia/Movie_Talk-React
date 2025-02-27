

import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'
import GuestFooter from '../components/guest/GuestFooter'
import NoSearchNav from '../components/user/NoSearchNav'


export default function AdminLayout() {
  const { user } = useAuthContext()
  const location = useLocation() // ő felel azért h melyik oldalon vagyunk


    return user && user.is_admin === 1 ?  
      <>
        {location.pathname === '/user' ? ( <NoSearchNav /> 
          ) : ( <AdminNav /> ) } 

        <Outlet />
        <GuestFooter />
      </> : <Navigate to="/"/>

}

