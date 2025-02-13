import React from 'react'
import useAuthContext from '../contexts/AuthContext'
import GuestNav from '../components/guest/GuestNav'
import { Navigate, Outlet } from 'react-router-dom'
import GuestFooter from '../components/guest/GuestFooter'



export default function GuestLayout() {//layout tartalmazza  aközös részeket, és aza otlet-et ami dinamikus tartalom
    const { user } = useAuthContext()
    if (user) {//ha a felhazsnáló be van jelentkezve oda irányítja a főoldalra
        return <Navigate to="/" />;
    }

  return (//ha nincs bejelentkezve a felhazsnáló megjelenik a vendég nav és az aktuális oldal?
        <>
        <GuestNav />
        <Outlet />
        
        </>     
    )
}
