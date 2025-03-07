

import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'
import GuestFooter from '../components/guest/GuestFooter'
import AdminNoSearchNav from '../components/admin/AdminNoSearchNav'
import '../style/Container.css'


export default function AdminLayout() {
  const { user } = useAuthContext()


    return user && user.is_admin === 1 ?  
      <main className='admin-cont container-fluid flex-column admin-custom'>
        <AdminNoSearchNav />

        <Outlet />
        <GuestFooter />
      </main> : <Navigate to="/"/>

}

