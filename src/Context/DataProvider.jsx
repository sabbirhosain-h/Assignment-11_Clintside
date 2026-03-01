import { createContext, useEffect, useState } from "react";
import useAPIs from "../Hooks/useAPIs";

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [allBooks , setAllBooks] = useState({});

    const instance = useAPIs();
    useEffect(()=>{
        const getAllBooks = async () => {
            try {
                const bookData = await instance.get("/AllBooks")
                setAllBooks(bookData.data.result)
            } catch (error) {
                console.error("para is:" , error)
            }
        }
        getAllBooks();
    },[])



const Data = {
    allBooks,
    setAllBooks
}  
    return (
        <DataContext.Provider value={Data}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider;