import { createContext, useEffect, useState } from "react";
import useAPIs from "../Hooks/useAPIs";
import useSecure from "../Hooks/useSecure";

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [allBooks , setAllBooks] = useState({});
    const [wishRefetch , setWishRefetch] = useState(false)
    
    

    const instance = useAPIs();
    const secure = useSecure();
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
    setAllBooks,
    wishRefetch, 
    setWishRefetch

}  
    return (
        <DataContext.Provider value={Data}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider;