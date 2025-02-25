

import React from 'react'
import UserNav from '../components/user/UserNav'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import GuestFooter from '../components/guest/GuestFooter'


export default function UserLayout() {

    const { user } = useAuthContext()
    return user && user.is_admin === 0 ?  
        <>  <UserNav /> 
            <Outlet />
            <GuestFooter />
        </> : <Navigate to="/" />


}
