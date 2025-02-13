

import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'


export default function AdminLayout() {
  const { user } = useAuthContext()

   return user && user.role === 1 ?  <>  <AdminNav /> <Outlet /> </> : <Navigate to="/homeAdmin" />

}

