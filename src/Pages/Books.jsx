import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from "motion/react"
import { Star, User } from 'lucide-react';
import useAPIs from '../Hooks/useAPIs';


const Books = () => {
    const location = useLocation();
    const [search , setSearch] = useState("");
    const [sortBy , setSortBy] = useState("bookName");
    const [order , setOrder] = useState("asc");
    const [allBooks , setAllBooks] = useState([]);
    const [bookCount , setBookCount] = useState([]);
    const [totalPage , setTotalPage] = useState(0);
    const [currentPage , setCurrentPage] = useState(0);
    const limit = 6;

    const instance = useAPIs();
    
    
    useEffect(()=>{
      const getAllBooks = async () => {
        try {
          const res = await instance.get(`/AllBooks?skip=${currentPage * limit}&limit=${limit}&sort=${sortBy}&order=${order}&search=${search}`);
          setAllBooks(res.data.result);
          setBookCount(res.data.total);

          const page = Math.ceil( res.data.total / limit)
          setTotalPage(page);


        } catch (error) {
          console.log(error);
        }
      }
      getAllBooks();
    },[currentPage , search , sortBy , order ]);
  
   
    useEffect(() => {
      localStorage.setItem("redirectAfterLogin", location.pathname);
    }, [location.pathname]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className='p-10 bg-amber-50 dark:bg-slate-900 w-full min-h-screen'>
           
            <h1 className='text-black dark:text-white font-extrabold text-4xl'>All Books</h1>

            <p className='text-slate-500 font-medium mt-2'>Browse our complete collection of books from local libraries</p>


            {/* search and Filter */}
            <div className='mt-5 grid gap-4 grid-cols-2 lg:grid-cols-5'> 
                
            <input 
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search Book by Name or Author'
            className='col-span-4 input-field input-field:focus dark:text-white' type="text" />

            <select onChange={(e)=>{ 
              const [sort, ord] = e.target.value.split("-");
               setSortBy(sort);
               setOrder(ord);
               setCurrentPage(0)}}
                className='input-field input-field:focus dark:text-black'>
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>

               <option value="price-asc">Price (Low → High)</option>
               <option value="price-desc">Price (High → Low)</option>

              <option value="rating-asc">Rating (Low → High)</option>
              <option value="rating-desc">Rating (High → Low)</option>
            </select>

            </div>

            {/* book count */}
            <p className='mt-4 text-slate-600 font-medium'>Showing { currentPage * limit + 1 } to { Math.min((currentPage + 1) * limit, bookCount) } out of {bookCount} Books</p>

            {  
              bookCount == 0 && (
                <div className='text-center py-20 text-white text-5xl font-bold'>
                  No Books Uploaded Yet..
                </div>
              )
            }

            {/* all Books */}
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {
                allBooks.map((Book , index)=>(
                  <motion.div
                    key={Book._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-7 dark:bg-slate-700 rounded-2xl bg-white shadow-2xl">
                    <div className="mb-3">
                     
                      <img
                        src={Book.url}
                        className="w-full h-52 object-cover hover:scale-103 rounded"/>
                      
                      <div className="flex-1">

                        <h3 className="mt-4 isDark dark:text-white font-bold text-xl text-slate-900">
                          {Book.bookName}</h3>

                        <p className="text-slate-600 ml-1 dark:text-slate-400 text-sm">
                          by {Book.author}
                        </p>

                        <div className="flex mt-4 items-center gap-2 mb-2">
                          <span className="px-2 py-1 rounded text-sm isDark text-white bg-blue-600">
                            {Book.genra}
                          </span>

                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm isDark dark:text-white text-slate-900">
                              {Book.rating} </span>
                          </div>
                        </div>

                        <p className='text-sm line-clamp-3 text-slate-900'>
                          {Book.description}
                        </p>

                        <div className='mt-4 font-bold text-3xl dark:text-white'>
                         ৳  {Book.price}
                        </div>

                      </div>
                    </div>
                    
                    <button
                      className="block w-full text-center px-4 py-2 text-white rounded-lg Primary-btn dark:text-white bg-indigo-600">
                      View Details
                    </button>
                  </motion.div>
                ))
              }
            </div>
              
              {/* pagination buttons */}
            <div className=' flex justify-center flex-wrap items-center py-10 gap-5'>
              {
                currentPage > 0 &&  <button className='hover:scale-105 hover:bg-blue-500 bg-white dark:text-white dark:bg-slate-800 px-3 py-2 text-black rounded-lg' onClick={()=> setCurrentPage(currentPage - 1)}>Prev</button>
              }
             
              {
                [...Array(totalPage).keys()].map((i)=>(

                     <button key={i} onClick={()=> setCurrentPage(i)} className={` ${ i === currentPage && "Primary-btn text-white"} hover:scale-105 hover:bg-blue-500 bg-white dark:text-white dark:bg-slate-800 px-3 py-2 text-black rounded-lg `}>{i}</button>
                  
                ))
              }
              {
                currentPage < totalPage - 1 && <button className='hover:scale-105 hover:bg-blue-500 bg-white dark:text-white dark:bg-slate-800 px-3 py-2 text-black rounded-lg' onClick={()=> setCurrentPage(currentPage + 1)}>Next</button>
              }
              
            </div>

            
            

        </motion.div>
    );
};

export default Books;