import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import GuestNav from '../components/guest/GuestNav'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import GuestFooter from '../components/guest/GuestFooter'
import LoginRegisterNav from '../components/guest/LoginRegisterNav'



export default function GuestLayout() {//layout tartalmazza  aközös részeket, és aza otlet-et ami dinamikus tartalom
    const { user } = useAuthContext()
    const location = useLocation() // segít, hogy melyik oldalon vagyunk

    if (user) {//ha a felhazsnáló be van jelentkezve oda irányítja a főoldalra
        return <Navigate to="/" />;
    }

  return (//ha nincs bejelentkezve a felhazsnáló megjelenik a vendég nav és az aktuális oldal?
        // tehát, ha login vagy register oldalon vagyunk akkor jelenjen csak meg az ő navuk ha nem akkor a guest sima
        <> 
        {location.pathname === '/login' || location.pathname === '/register' ? (
        <LoginRegisterNav /> )
        : (
        <GuestNav />
        )}
        <Outlet />
        {location.pathname !== "/login" && location.pathname !== "/register" && <GuestFooter />}
        </>  
         
    )
   
}
