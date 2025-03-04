import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import useAuthContext from "./AuthContext";



const FileContext = createContext()

export const FileProvider = ({ children }) => {

    const [profilPicture, setProfilePicture] = useState(null)
    const { user } = useAuthContext()


  
   

    const getProfilPicture = async () => {

        if(user){
            try {
                const { data } = await myAxios.get('api/user/profile-picture') // ő felel a kép lekérésére a usernek
                //console.log(data.picture)
               setProfilePicture(data.picture)
    
    
            } catch (error) {
                console.error('Could not find the image',error)
    
            }



        }

   
      

    }

    const uploadProfilePicture = async (file) => {
        try {
            const formData = new FormData();
            formData.append("profile_picture", file);
    
            const { data } = await myAxios.post("api/user/profile-picture/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Fájl típusú adat küldése
                },
            });
            console.log(data.picture)
            setProfilePicture(data.picture) // Mivel a backend már a teljes URL-t adja vissza
        } catch (error) {
            console.error("Found error during the profile picture uploading:", error)
        }
    }

    useEffect(() => {
        if (user) {
            getProfilPicture()
          } else {
            setProfilePicture(null)
          }
    }, [user])

  

    return (
        <FileContext.Provider value={{profilPicture,uploadProfilePicture, setProfilePicture}}>
        {children}
        </FileContext.Provider>
    )
    


}

export default function useFileContext() {
    return useContext(FileContext)
}