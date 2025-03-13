import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";

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
     
        
        useEffect(() => {  
            getPremiers()
            getUsersTopMovies()
            getTopUsers()
            setFoundMovies([])
           
        }, [])

        
      return (
        <MovieDataContext.Provider value={{ pMovies, usersTopMovies, topUsers,foundMovies, setFoundMovies, postSearchByTitle, foundMovies}}>
          {children}
        </MovieDataContext.Provider>
      )
    


}

 export default function useMovieDataContext() {//egyedi hook az authcontext használatához
      // console.log(useContext(MovieDataContext))
      return useContext(MovieDataContext)//így nem kell midnen komponensben importálni
    }