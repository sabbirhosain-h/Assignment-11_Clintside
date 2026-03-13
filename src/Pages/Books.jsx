import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from "motion/react"
import { Star } from 'lucide-react';
import useAPIs from '../Hooks/useAPIs';
import Load from './Load';


const Books = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("bookName");
  const [order, setOrder] = useState("asc");
  const [allBooks, setAllBooks] = useState([]);
  const [bookCount, setBookCount] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;

  const instance = useAPIs();



  useEffect(() => {
    const getAllBooks = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`/AllBooks?skip=${currentPage * limit}&limit=${limit}&sort=${sortBy}&order=${order}&search=${search}`);

        setAllBooks(res.data.result);
        setBookCount(res.data.total);

        const page = Math.ceil(res.data.total / limit)
        setTotalPage(page);


      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllBooks();
  }, [currentPage, search, sortBy, order]);


  useEffect(() => {
    localStorage.setItem("redirectAfterLogin", location.pathname);
  }, [location.pathname]);


  if (loading) {
    return <Load />
  }
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
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Book by Name or Author'
          className='col-span-4 input-field input-field:focus dark:text-white' type="text" />

        <select onChange={(e) => {
          const [sort, ord] = e.target.value.split("-");
          setSortBy(sort);
          setOrder(ord);
          setCurrentPage(0)
        }}
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
      <p className='mt-4 text-slate-600 font-medium'>Showing {currentPage * limit + 1} to {Math.min((currentPage + 1) * limit, bookCount)} out of {bookCount} Books</p>

      {
        bookCount == 0 && (
          <div className='text-center py-20 text-white text-5xl font-bold'>
            No Books Uploaded Yet..
          </div>
        )
      }

      {/* all Books */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBooks.map((Book, index) => (
          <motion.div
            key={Book._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="p-7 bg-white dark:bg-slate-700 rounded-2xl shadow-2xl"
          >
            {/* Image */}
            <motion.img
              src={Book.url}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              className="w-full h-52 object-cover rounded-lg"
            />

            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="mt-4"
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="font-bold text-xl text-slate-900 dark:text-white"
              >
                {Book.bookName}
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-slate-600 dark:text-slate-400 text-sm"
              >
                by {Book.author}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-center gap-2 mt-4 mb-2"
              >
                <span className="px-2 py-1 rounded text-sm text-white bg-blue-600">
                  {Book.genra}
                </span>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-slate-900 dark:text-white">
                    {Book.rating}
                  </span>
                </div>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-sm line-clamp-3 text-slate-900 dark:text-slate-300"
              >
                {Book.description}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-4 font-bold text-3xl dark:text-white"
              >
                ৳ {Book.price}
              </motion.div>
            </motion.div>

            {/* Button */}
            <Link to={`/Details/${Book._id}`}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-5 block w-full px-4 py-2 text-white rounded-lg bg-indigo-600"
              >
                View Details
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* pagination buttons */}
      <div className=' flex justify-center flex-wrap items-center py-10 gap-5'>
        {
          currentPage > 0 && <button className='hover:scale-105 hover:bg-blue-500 bg-white dark:text-white dark:bg-slate-800 px-3 py-2 text-black rounded-lg' onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        }

        {
          [...Array(totalPage).keys()].map((i) => (

            <button key={i} onClick={() => setCurrentPage(i)} className={` ${i === currentPage && "Primary-btn text-white"} hover:scale-105 hover:bg-blue-500 bg-white dark:text-white dark:bg-slate-800 px-3 py-2 text-black rounded-lg `}>{i}</button>

          ))
        }
        {
          currentPage < totalPage - 1 && <button className='hover:scale-105 hover:bg-blue-500 bg-white dark:text-white dark:bg-slate-800 px-3 py-2 text-black rounded-lg' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        }

      </div>




    </motion.div>
  );
};

export default Books;