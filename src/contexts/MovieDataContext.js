import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { ContactSupportTwoTone } from "@mui/icons-material";
import Swal from "sweetalert2";

const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {

    //lekérjük  apremier filmeket backendről
        const [pMovies, setPMovies] = useState([])
    
        const getPremiers = async () => { //itt szedjük le külső apiból a premier filmeket
          try {
            const {data} = await myAxios.get('/api/premier-movies')
            //console.log(data)
            setPMovies(data)  // Itt tároljuk el a filmeket az állapotban!!!!!
         
          } catch (error) {
            console.error("No datas to the premiers:", error)
          }
        }

        //lekérjük a top filmeket backendről
        const [usersTopMovies, setUsersTopMovies] = useState([])
    
        const getUsersTopMovies = async () => {
          try {
            const {data} = await myAxios.get('api/movie/top-rated-movies')
            console.log(data.data)
            setUsersTopMovies(data.data)
    
          } catch (error) {
            console.error("Could not find any data to the routes")
            
          }
        }
    
        //lekérjük a top felhazsnálókat backendről
        const [topUsers, setTopUsers] = useState([])
    
        const getTopUsers = async () => {
          try {
            const {data} = await myAxios.get('api/movie/top-users')
            //console.log(data)
            setTopUsers(data)
          }catch (error) {
            console.error("Could not find any data to the routes")
          }
        }

           //egyszerű keresés
              
        const [ foundMovies, setFoundMovies ] = useState([]) //ide gyűjtjük a találatokat
            
            //itt történik a backend-el való kommunikáció
         const postSearchByTitle = async (title) => {
            try{
                const response = await myAxios.post('api/movie/title', {title})//mert tesztelésnél is megkell adni ezeket az adatokat
                console.log(response.data.data)
                setFoundMovies(response.data.data) //beállítjuk a találatokat a tömbünkbe, már benne van a műfaj és a kulcsszavak
                
            }catch(error){
                console.log('No movies have been found')
                setFoundMovies([])
            }
        }

        //összetett keresés

        const postAdvancedSearch = async ({...data}, route) => {
          try{
            const response = await myAxios.post(route,data)
            if(response.data.success) {
              setFoundMovies(response.data.data)
              console.log('Success')
          }
          }catch(error){
          console.log(error)
          setFoundMovies([])
          }
        }

        //felh-k filmjeinek lekérése

        const [userMovies, setUserMovies ] = useState([])
        const [ message, setMessage ] = useState('')

        const getUserMovies = async () => {
          try {
            const response = await myAxios.get('api/user/movies')
            console.log(response)

             if(response.data.data && response.data.data.length > 0){
              const sortedMovies = [...response.data.data].sort((a, b) => new Date(b.watching_date) - new Date(a.watching_date))//rendezzük csökkenő dátum sz
              setUserMovies(sortedMovies)
                //setUserMovies(response.data.data)
                console.log('Success')
              }else if (response.data){
                setUserMovies([])
                setMessage(response.data.message)

              }
            //console.log(data)
          }catch (error) {
            console.error("Could not find any data to the routes")
            setUserMovies([])
          }

        }
       
        //érétkelés
        const patchRating = async ({...data}, route) => {
          try{
            const response = await myAxios.patch(route,data)
            if(response.data){
              //setDataRating(response.data)
              console.log(response)
              Swal.fire("You have succesfully rated the selected movie!")
              getUserMovies()
            }
          }catch(error){
            console.error('Could not find the route')
          }

        }

        //hozzáadás listához

        const postUserAddMovie = async ({...data}, route) => {
          try{
            const response = await myAxios.post(route,data)
            if(response.data){
              console.log(response.data)
              //alert(response.data.message)
              Swal.fire("The movie is added to your list!")

              getUserMovies()
            }
          }catch(error){
            Swal.fire("Sorry, but you can't mark the movie for rewatching until you have rated it before!")

          }

        }

        //Top filmek


        const [ topMovies, setTopMovies ] = useState([])

        const getMyTopMovies = async (userId) => {
          try{
            const response = await myAxios.get(`/api/user/${userId}/favorite-movies`)
            if(response.data){
              console.log(response.data)
              setTopMovies(response.data)
            }
          }catch(error){
            console.error('Could not find the route')
          }


        }



     
        
        useEffect(() => {  

            getPremiers()
            getUsersTopMovies()
            getTopUsers()
            //setFoundMovies([])
            
            //getUserMovies()
           
        }, [])

        
      return (
        <MovieDataContext.Provider value={{ pMovies, usersTopMovies, getTopUsers, topUsers,foundMovies, setFoundMovies, postSearchByTitle, 
          foundMovies, postAdvancedSearch, setFoundMovies, userMovies, getUserMovies, patchRating, postUserAddMovie, setUserMovies, message, getMyTopMovies, topMovies}}>
          {children}
        </MovieDataContext.Provider>
      )
    


}

 export default function useMovieDataContext() {//egyedi hook az authcontext használatához
      // console.log(useContext(MovieDataContext))
      return useContext(MovieDataContext)//így nem kell midnen komponensben importálni
    }