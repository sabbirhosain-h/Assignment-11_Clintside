import { createContext, useEffect, useState } from "react";
import useAPIs from "../Hooks/useAPIs";

export const DataConstext = createContext();

const DataProvider = ({children}) => {
    const [allBooks , setAllBooks] = useState([]);

    const instance = useAPIs();
    useEffect(()=>{
        const getAllBooks = async () => {
            try {
                const bookData = await instance.get("/AllBooks")
                setAllBooks(bookData.data)
            } catch (error) {
                console.error("para is:" , error)
            }
        }
        getAllBooks();
    },[instance])



const Data = {
    allBooks,
}  
    return (
        <DataConstext.Provider value={Data}>
            {children}
        </DataConstext.Provider>
    )
}
export default DataProvider;