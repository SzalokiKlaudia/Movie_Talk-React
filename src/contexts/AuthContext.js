import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


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
    setErrors({})
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
            console.log(error.response.data.errors)
            setErrors(error.response.data.errors)
            
          }
          if (error.response.status === 401) {
            console.error("Unauthorized user!")
            /*setErrors({
                email: 'Invalid email address!',
                password: 'Invalid password!'
            });*/
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


    const [ users, setUsers ] = useState([])

    const getActiveUsers = async () => {
      try {
        const {data} = await myAxios.get('api/admin/users/0')
        //console.log(data)

        if(data.length > 0){
        const sortedUsers = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))//rendezzük csökkenő dátum sz

        setUsers(sortedUsers) //frissítsük az aktív user lsitánkat
        }

      } catch (error) {
        console.error("Could not find any data to the routes")
      }
    }
    //console.log(users)

  
    const getInActiveUsers = async () => {
      try {
        const {data} = await myAxios.get('api/admin/users/1')
        //console.log(data)
        if(data.length > 0){
          const sortedUsers = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))//rendezzük csökkenő dátum sz
          setUsers(sortedUsers)  //frissítsük a lsitánkat ami az inactive usereket tartalmazza
        }

      } catch (error) {
        console.error("Could not find any data to the routes")
      }
    }

    const deleteUser = async (id) => {

      try{
          const response = await myAxios.delete(`api/admin/users/${id}`)
          console.log(response.data)
          getActiveUsers()

      } catch (error){
        console.error('Could not find the user!')

      }
  }

    const restoreUser = async (id) => {

      try{
          const response = await myAxios.patch(`api/admin/users/${id}/restore`)
          console.log(response.data)    
          getInActiveUsers()

      } catch (error){
        console.error('Could not find the user!')

      }
    }

    const [userErrors, setUserErrors] = useState({
      user_name: '',
      email: '',
      birth_year: ''
    })

    const postUserDataModify = async ({...data}, route) => {
      try{
        const response = await myAxios.patch(route, data)
        console.log(response)
        Swal.fire("You have succesfully updated your datas!")
        setUserErrors({})

      }catch (error){
        console.error('Could not update the user datas')
       
        console.log(error.response.data.errors.user_name)
        setUserErrors({
          user_name: error.response.data.errors.user_name,
          email: error.response.data.errors.email,
          birth_year: error.response.data.errors.birth_year
        })

       
      }
    }

        useEffect(() => {
          if (!user) {
            getUser()
          }

        }, [])


      return (
        <AuthContext.Provider value={{ errors,user,userErrors, getUser, loginReg, logOut,selectedValue, setSelectedValue, users,setUsers, 
        deleteUser, restoreUser,getActiveUsers, getInActiveUsers, postUserDataModify}}>
          {children}
        </AuthContext.Provider>
      )
    
}

    export default function useAuthContext() {//egyedi hook az authcontext használatához
      return useContext(AuthContext)//így nem kell midnen komponensben importálni
    }



