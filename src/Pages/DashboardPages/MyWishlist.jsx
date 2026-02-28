import React from 'react';
import { motion } from "motion/react"
import { Star, User } from 'lucide-react';

const MyWishlist = () => {
    return (
        <div>
           <h1 className='text-4xl font-bold dark:text-white'>My Wishlist</h1>
           <p className='text-md font-medium text-gray-500'>Books you want to read later</p>

          <div className='grid grid-cols-1 lg:grid-cols-3'>

             <motion.div
               
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                //   transition= {{ delay: index * 0.05 }}
                  className="p-4 mt-5 ">
                  <div className="flex gap-4 mb-3">
                   
                    <img
                    
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s"
                      
                      className="w-25 h-32 object-cover rounded"/>
                    
                 
                    <div className="flex-1">
                      <h3 className="mb-1 isDark dark:text-white  text-slate-900">
                        Boi er nam</h3>

                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        by Boi er lekhok
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded text-sm isDark text-white   bg-blue-600">
                          Horror
                        </span>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm isDark  dark:text-white text-slate-900">5.55</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 isDark  text-slate-500 dark:text-slate-400 text-sm">
                        <User className="w-3 h-3" />
                        <span>Lekhok</span>
                      </div>
                    </div>
                  </div>
                  
               
                  <button
                    className="block w-full text-center px-4 py-2   rounded-lg Primary-btn text-slate-400 dark:text-white bg-indigo-600">
                    View Details
                  </button>
        </motion.div>

        

          </div>
        </div>
    );
};

export default MyWishlist;