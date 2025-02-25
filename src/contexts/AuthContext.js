import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()//hook segítségével átnavigálhatsz másik oldalra
    const [errors, setErrors] = useState({
        user_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        gender: "",
        birth_year: "",


    })
    
    const [pMovies, setPMovies] = useState([]);

    const getPremiers = async () => { //itt szedjük le külső apiból a premier filmeket
      try {
        const {data} = await myAxios.get('/api/premier-movies')
        //console.log(data)
        setPMovies(data)  // Itt tároljuk el a filmeket az állapotban!!!!!
     
      } catch (error) {
        console.error("No datas to the premiers:", error)
      }
    }

    const [usersTopMovies, setUsersTopMovies] = useState([]);

    const getUsersTopMovies = async () => {
      try {
        const {data} = await myAxios.get('api/movie/top-rated-movies')
        //console.log(data)
        setUsersTopMovies(data)

      } catch (error) {
        console.error("Could not find any data to the routes")
      }
    }

    const [topUsers, setTopUsers] = useState([]);

    const getTopUsers = async () => {
      try {
        const {data} = await myAxios.get('api/movie/top-users')
        console.log(data)
        setTopUsers(data)
      }catch (error) {
        console.error("Could not find any data to the routes")
      }
    }


    const csrf = async () => myAxios.get("/sanctum/csrf-cookie")

   //bejelentkezett felhasználó adatainak lekérdezése
   const getUser = async () => {
    const { data } = await myAxios.get("/api/user")
    console.log(data)
    setUser(data)
    }
  

    const logOut = async () => {
      await csrf()
  
      myAxios.post("/logout").then((resp) => {
        setUser(null)
        console.log(resp)
      })
    }

   
     // Komponens betöltésekor egyszer lefut
        useEffect(() => {
          if (!user) {
            getUser()
          }
          getPremiers(); // Filmek adatainak lekérése a komponens betöltésekor
          getUsersTopMovies()
          getTopUsers()

        }, []);

      const loginReg = async ({...data}, route) => { //bej vagy reg
        try {
            await csrf()//lekérjük a tokent
            await myAxios.post(route, data)
            console.log("Succes!!")
            //sikeres bejelentkezés/regisztráció esetén
          
            getUser()//frissítjük a feh-i adatokat
            navigate("/")//átírányítás a főoldalra
      
          } catch (error) {
            console.log(error)
            if (error.response.status === 422) {
              setErrors(error.response.data.errors)
            }
            if (error.response.status === 401) {
              console.error("Unauthorized: Hibás bejelentkezési adatok")
              setErrors({
                  email: 'Invalid credentials',
                  password: 'Invalid credentials'
              });
            }
          }
      }

      return (
        <AuthContext.Provider value={{ errors,user,pMovies, loginReg, logOut, usersTopMovies, topUsers}}>
          {children}
        </AuthContext.Provider>
      )
    
}

    export default function useAuthContext() {//egyedi hook az authcontext használatához
      return useContext(AuthContext)//így nem kell midnen komponensben importálni
    }



