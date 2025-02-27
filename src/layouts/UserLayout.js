

import React from 'react'
import UserNav from '../components/user/UserNav'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation} from 'react-router-dom'
import GuestFooter from '../components/guest/GuestFooter'
import NoSearchNav from '../components/user/NoSearchNav'


export default function UserLayout() {

    const { user } = useAuthContext()
    const location = useLocation()

    return user && user.is_admin === 0 ?  
        <>  
            {location.pathname === '/user' ? ( <NoSearchNav /> 
            ) : ( <UserNav /> ) }
            
            
            <Outlet />
            <GuestFooter />
        </> : <Navigate to="/" />


}
