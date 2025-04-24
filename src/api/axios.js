import axios from "axios";


export const  myAxios=axios.create({

    baseURL: process.env.REACT_APP_API_URL || '/api',


    withCredentials: true, //kérések atzonosítása cookie-k segítségével
    withXSRFToken :true, 


})

myAxios.interceptors.request.use(
    (config) => {
      // CSRF token lekérése a cookie-ból
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1]
  
      // Ha találunk tokent, hozzáadjuk a headerhez
      if (token) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token)
      } else {
        console.warn("No CSRF token found in cookies.")
      }
      // A config visszaadása, hogy a kérés folytatódhasson
      return config

    },
    
    
    (error) => {
        // Hiba esetén írjuk ki a hibát, vagy végezzünk hibakezelést
        console.error("Request interceptor error:", error)
        return Promise.reject(error)
      }
  )

  

