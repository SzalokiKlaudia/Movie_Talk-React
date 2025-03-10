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
    

    const csrf = async () => myAxios.get("/sanctum/csrf-cookie")

   //bejelentkezett felhasználó adatainak lekérdezése
   const getUser = async () => {
      try{
        const { data } = await myAxios.get("/api/user")
        setUser(data)
        //console.log(data)
      }catch(error){
        if(error.response && error.response.status == 401){
          setUser(null) //nem oldotta meg a 401-es hibát csak a konzolon jelenik meg...
        }else{
          console.error('Wrong api call',error)
        }
      }
    }

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
  
//KIJELENTKEZÉS
    const logOut = async () => {
      await csrf()
  
      myAxios.post("/logout").then((resp) => {
        setUser(null)
        console.log(resp)
      })
    }


    const [selectedValue, setSelectedValue] = useState("active")//ő tartalmazza h aktív vagy nem aktív egy user


    const [activeUsers, setActiveUsers] = useState([]) //itt tárolódnak az aktív felhazsnálók

    const getActiveUsers = async () => {
      try {
        const {data} = await myAxios.get('api/admin/users/0')
        //console.log(data)
        setActiveUsers(data) //frissítsük az aktív user lsitánkat
        //console.log(activeUsers)
   

      } catch (error) {
        console.error("Could not find any data to the routes")
      }
    }

  

    const [inActiveUsers, setInActiveUsers] = useState([]) //itt tároljuk az inaktív usereket

    const getInActiveUsers = async () => {
      try {
        const {data} = await myAxios.get('api/admin/users/1')
        //console.log(data)
        setInActiveUsers(data)  //frissítsük a lsitánkat ami az inactive usereket tartalmazza
        //console.log(inActiveUsers)
        //console.log(selectedValue)

      } catch (error) {
        console.error("Could not find any data to the routes")
      }
    }

    
    const deleteUser = async (id) => {

      try{
          const response = await myAxios.delete(`api/admin/users/${id}`)
          console.log(response.data)
          
          alert("User is succesfully deleted")
          getActiveUsers()

      } catch (error){
        console.error('Could not find the user!')

      }
  }

    const restoreUser = async (id) => {

      try{
          const response = await myAxios.patch(`api/admin/users/${id}/restore`)
          console.log(response.data)
          
          alert("User is succesfully restored")
          getInActiveUsers()

      } catch (error){
        console.error('Could not find the user!')

      }
    }

        useEffect(() => {
          if (!user) {
            getUser()
          }

        }, [])

      return (
        <AuthContext.Provider value={{ errors,user,loginReg, logOut,selectedValue, setSelectedValue, activeUsers, 
        inActiveUsers, deleteUser, restoreUser,getActiveUsers, getInActiveUsers}}>
          {children}
        </AuthContext.Provider>
      )
    
}

    export default function useAuthContext() {//egyedi hook az authcontext használatához
      return useContext(AuthContext)//így nem kell midnen komponensben importálni
    }



