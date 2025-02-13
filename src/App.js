import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import useAuthContext from './contexts/AuthContext';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import HomeGuest from './pages/HomeGuest';


function App() {
    const {user} = useAuthContext()//meghívtuk 
  return (
    
        <Routes>
            {!user && ( // Vendég nézet
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<HomeGuest />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    
                </Route>
            )}

            {user && ( // Bejelentkezett felhasználó nézet (Admin vagy User)
                <Route path="/" element={user?.isAdmin === 1 ? <AdminLayout /> : <UserLayout />}>
                  <Route index element={user.isAdmin === 1 ? <HomeUser /> : <HomeAdmin />} />

                </Route>
            )}
        </Routes>
    )
    
  
}

export default App;
