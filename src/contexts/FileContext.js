import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";



const FileContext = createContext()

export const FileProvider = ({ children }) => {

    const [pictureList, setPictureList] = useState([])

    const getlist = async ( endPoint, callBack) => {
        const { data } = await myAxios.get(endPoint)
        console.log(data)

        callBack(data)
    }

    const postData = async ({ ...data }, endPoint) => {   
        try {
        await myAxios
            .post(endPoint, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            })
            .then((resp) => {
            console.log(resp);
            setPictureList(resp.data);
            });
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        getlist("/file-upload", setPictureList);
    }, [])

    return (
        <FileContext.Provider value={{ pictureList, postData }}>
        {children}
        </FileContext.Provider>
    )
    


}

export default function useFileContext() {
    return useContext(FileContext);
}