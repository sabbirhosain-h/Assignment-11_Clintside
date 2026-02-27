import { BookSearch, MoveRightIcon, Star } from 'lucide-react';
import { motion } from "motion/react"
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router';
import { DataConstext } from '../Context/DataProvider';

const LatestAdditions = () => {
   
    const {allBooks} = useContext(DataConstext);

    const topBooks = useMemo(() => {
            return allBooks.filter(book => book.rating > 4.5);
        }, [allBooks]);

    return (
        <motion.div 
        
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mt-20 mb-10 flex flex-col items-center justify-center'>
            <h1 className="text-3xl font-bold dark:text-white">Latest Additions</h1>
            <p className=" text-gray-800 mt-2 px-5">Explore our newest collection of books just added to our library</p>

            <section className=' px-5 py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                
                {
                    topBooks.slice(0,3).map((book)=>(
                        <div className='p-4 bg-amber-50 dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg hover:scale-102 transition-all duration-300'>
                    <img src={book.coverImage} alt="" className="w-full h-64 object-cover rounded-lg shadow-md" />

                    <h1 className="mt-4 text-2xl font-semibold dark:text-white">The Great Gatsby</h1>

                    <h1 className="mt-2 text-sm text-gray-500 dark:text-gray-300">F. Scott Fitzgerald</h1>

                    <div className='flex items-center gap-4 my-2'>
                        <div className='flex justify-center items-center text-black dark:text-white'>
                            <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                             <span className="ml-1 text-sm">5.0</span>
                        </div>

                        <span className='px-2 py-1 rounded-xl bg-yellow-400 text-xs font-medium text-black'> 
                            horror
                        </span>

                    </div>
                    <p className="mt-2 text-gray-400">A classic novel by F. Scott Fitzgerald that explores themes of wealth, love, and the American Dream.</p>

                    <Link to={`/SingleBook}`}>
                    <button className="mt-4 px-4 py-2 w-full Primary-btn text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        View Details
                    </button>
                    </Link>
                </div>
                    ))
                }
                
                
               

            </section>


                 <Link to={'/Books'}>
                    <button className="flex justify-center items-center mt-4 px-4 py-2 Primary-btn text-white rounded-lg hover:bg-blue-900 transition duration-300">
                        View All Books
                        <MoveRightIcon className="ml-2 w-5 h-5" />
                    </button>
                 </Link>
        </motion.div>
    );
};

export default LatestAdditions;