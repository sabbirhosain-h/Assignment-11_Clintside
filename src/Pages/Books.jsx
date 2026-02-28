import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from "motion/react"
import { Star, User } from 'lucide-react';


const Books = () => {
    const location = useLocation();
    const [search , setSearch] = useState();
    const [filter , setFilter] = useState("Name (A-Z)");

   
   
    localStorage.setItem(
      "redirectAfterLogin",
       location.pathname 
    );
    return (
        <div className='p-10 bg-amber-50 dark:bg-slate-900 w-full min-h-screen'>
           
            <h1 className='text-black dark:text-white font-extrabold text-4xl'>All Books</h1>

            <p className='text-slate-500 font-medium mt-2'>Browse our complete collection of books from local libraries</p>


            {/* search and Filter */}
            <div className='mt-5 grid gap-4 grid-cols-2 lg:grid-cols-5'> 
                
            <input 
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search Book by Name or Author'
            className='col-span-4 input-field input-field:focus dark:text-white' type="text" />

            <select onChange={(e)=>setFilter(e.target.value)} className='input-field input-field:focus' name="" id="">
                <option value="Name (A-Z)</">Name (A-Z)</option>
                <option value="price high">price high</option>
                <option value="price low">price low</option>
            </select>

            </div>

            {/* book count */}

            <p className='mt-4 text-slate-600 font-medium'>Showing 1 out of 9 Books</p>


       {/* all Books */}

        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <motion.div
               
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                //   transition= {{ delay: index * 0.05 }}
                  className="p-7 dark:bg-slate-700 rounded-2xl bg-white shadow-2xl">
                  <div className=" mb-3">
                   
                    <img
                    
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s"
                      
                    className="lg:w-65 lg:h-70 w-20 h-28 object-cover hover:scale-103 rounded"/>
                    
                 
                    <div className="flex-1">

                      <h3 className="mt-4 isDark dark:text-white font-bold text-xl  text-slate-900">
                        Boi er nam</h3>

                      <p className="text-slate-600 ml-1 dark:text-slate-400 text-sm ">
                        by Boi er lekhok
                      </p>

                      <div className="flex mt-4 items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded text-sm isDark text-white   bg-blue-600">
                          Horror
                        </span>

                        <div className="flex  items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm isDark  dark:text-white text-slate-900">5.55</span>
                        </div>
                      </div>

                      <p className='text-sm line-clamp-3 text-slate-600'>

                        A story about teenage rebellion and alienation told through the eyes of

                      </p>

                      <div className='mt-4 font-bold text-3xl'>
                            $11.25
                      </div>

                    </div>
                  </div>
                  
               
                  <button
                    className="block w-full text-center px-4 py-2 text-white  rounded-lg Primary-btn  dark:text-white bg-indigo-600">
                    View Details
                  </button>
        </motion.div>
        </div>


        </div>
    );
};

export default Books;