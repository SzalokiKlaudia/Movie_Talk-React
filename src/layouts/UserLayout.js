

import React from 'react'
import UserNav from '../components/user/UserNav'
import useAuthContext from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation} from 'react-router-dom'
import GuestFooter from '../components/guest/GuestFooter'
import NoSearchNav from '../components/user/NoSearchNav'
import '../style/Container.css'



export default function UserLayout() {

    const { user } = useAuthContext()
    const location = useLocation()

    return user && user.is_admin === 0 ?  
        <main className='user-cont container-fluid flex-column'> 
            {location.pathname === '/user' ? ( <NoSearchNav /> 
            ) : ( <UserNav /> ) }
            
            
            <Outlet />
            <GuestFooter />
        </main> : <Navigate to="/" />


}
