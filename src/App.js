import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import useAuthContext from './contexts/AuthContext';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import HomeUser from './pages/HomeUser';
import HomeGuest from './pages/HomeGuest';
import ProfilUser from './pages/ProfilUser';
import AdminUsers from './pages/AdminUsers';
import MoviesResults from './pages/MoviesResults';
import MovieDetails from './pages/MovieDetails';


function App() {
    const {user} = useAuthContext()//meghívtuk 
    //console.log(user)
  return (
    
        <Routes>
            {!user && ( // Vendég nézet
                <Route element={<GuestLayout />}>
                    <Route path="/" element={<HomeGuest />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path='/movie/title' element={<MoviesResults />}/>
                    <Route path='/movie/:id/details/' element={<MovieDetails />}/>

                    
                </Route>
            )}

            {user?.is_admin === 1 && (
                <Route element={<AdminLayout />}>
                    <Route index element={<HomeUser />} />
                    <Route path="/user" element={<ProfilUser />} />
                    <Route path="/admin/users" element={<AdminUsers />} />

                </Route>
            )}

            {user?.is_admin === 0 && (
                <Route element={<UserLayout />}>
                    <Route index element={<HomeUser />} />
                    <Route path="/user" element={<ProfilUser />} />
                    <Route path='/movie/title' element={<MoviesResults />}/>
                    <Route path='/movie/:id/details/' element={<MovieDetails />}/>



                </Route>
            )}

        </Routes>
    )
    
  
}

export default App;
