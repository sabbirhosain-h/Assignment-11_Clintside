import React, { useContext, useEffect, useState } from 'react';
import { motion } from "motion/react"
import { BookOpen, Star, User , X } from 'lucide-react';
import useAPIs from '../../Hooks/useAPIs';
import { AuthContext } from '../../Context/AuthProvider';
import { DataContext } from '../../Context/DataProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const MyWishlist = () => {
    const [ wishList , setWishList ] = useState([])
    const instance = useAPIs();
    const { user } = useContext(AuthContext);
    const { wishRefetch } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(()=>{
      const getMywishList = async () => {
        try {
          const res = await instance(`MyWishlist?email=${user.email}`);
          setWishList(res.data)
          console.log(res.data)
        } catch (error) {
          console.error(error)
        }
      };
      getMywishList() ;
    },[wishRefetch]);

    const handleRemove = async (bookId) => {
    try {
        await instance.delete(`/Wishlist/remove/${bookId}`);
        setWishList(prev => prev.filter(book => book._id !== bookId)); 
        toast("Removed from Wishlist", {
            duration: 2000,
            position: "bottom-right",
            style: { background: '#1e293b', color: '#fff' },
        });
    } catch (error) {
        console.error(error);
        toast("Failed to remove", {
            duration: 2000,
            position: "bottom-right",
            style: { background: '#ff0000', color: '#fff' },
        });
    }
};
    return (
        <div>
           <h1 className='text-4xl font-bold dark:text-white'>My Wishlist</h1>
           <p className='text-md font-medium text-gray-500'>Books you want to read later</p>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>

             {
              wishList.map((book)=> (
                <motion.div
               
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                //   transition= {{ delay: index * 0.05 }}
                  className="p-4 mt-5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">

                  <div className="flex gap-5 mb-3">
                   
                    <img   src={book.url}
                      
                      className="w-25 h-32 object-cover rounded"/>
                    
                 
                    <div className="">

                      <h3 className="mb-1 text-2xl dark:text-white  text-slate-900">
                        {book.bookName}</h3>

                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        by {book.author}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded text-sm  text-white   bg-blue-600">
                          {book.genra}
                        </span>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm   dark:text-white text-slate-900">{book.rating}</span>
                        </div>
                      </div>
                      <div className="text-black dark:text-white text-xl">
                          ৳ {book.price}
                      </div>
                    </div>
                  </div>
                  
               
                  <div className='flex justify-center gap-2'>
                    <button
                    onClick={() => navigate(`/Details/${book._id}`)}
                    className="block w-full text-center px-4 py-2   rounded-lg Primary-btn  text-white ">
                    View Details
                  </button>
                  <button 
                  onClick={() => handleRemove(book._id)}
                  className='bg-red-600 text-white px-3 py-2 rounded-lg'>
                     <X></X>
                  </button>
                  </div>

             </motion.div>
              ))
             }

        

          </div>
        </div>
    );
};

export default MyWishlist;