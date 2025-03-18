import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import { ContactSupportTwoTone } from "@mui/icons-material";

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
            //console.log(data)
            setUsersTopMovies(data)
    
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

        const getUserMovies = async () => {
          try {
            const response = await myAxios.get('api/user/movies')
            console.log(response)

             if(response.data.data.length > 0){
                setUserMovies(response.data.data)
                console.log('Success')
              }else{
                setUserMovies([])
              }
            //console.log(data)
          }catch (error) {
            console.error("Could not find any data to the routes")
            setUserMovies([])
          }

        }
        console.log(userMovies)

        //értékelés

        //const [ dataRating, setDataRating ] = useState([])

        const patchRating = async ({...data}, route) => {
          try{
            const response = await myAxios.patch(route,data)
            if(response.data){
              //setDataRating(response.data)
              console.log(response)
              alert(response.data.message)
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
              alert(response.data.message)
              getUserMovies()
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
            
            getUserMovies()
           
        }, [])

        
      return (
        <MovieDataContext.Provider value={{ pMovies, usersTopMovies, topUsers,foundMovies, setFoundMovies, postSearchByTitle, 
          foundMovies, postAdvancedSearch, setFoundMovies, userMovies, getUserMovies, patchRating, postUserAddMovie, setUserMovies}}>
          {children}
        </MovieDataContext.Provider>
      )
    


}

 export default function useMovieDataContext() {//egyedi hook az authcontext használatához
      // console.log(useContext(MovieDataContext))
      return useContext(MovieDataContext)//így nem kell midnen komponensben importálni
    }