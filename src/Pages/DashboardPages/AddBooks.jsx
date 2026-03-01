import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import useAPIs from '../../Hooks/useAPIs';
import { DataContext } from '../../Context/DataProvider';
import { AuthContext } from '../../Context/AuthProvider';


const AddBooks = () => {
    const { allBooks , setAllBooks} = useContext(DataContext);
    const {user} = useContext(AuthContext);
    const instance = useAPIs();

    const genres = ['Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Classic', 'Non-Fiction', 'Thriller', 'Horror', 'Biography', 'History'];

    const handleAddBook = async (e) => {
         e.preventDefault();

         const bookName = e.target.bookname.value;
         const author = e.target.author.value;
         const url = e.target.url.value;
         const genra = e.target.genra.value;
         const price = e.target.price.value;
         const rating = e.target.rating.value;
         const description = e.target.description.value;
         const status = e.target.status.value;
         const email = user.email;

         
         const newBook = { bookName , author , url , genra , price , rating ,  description , status , email };
        console.log(newBook)
        try {
            const post = await instance.post("/AllBooks",  newBook   );

            if( post.data.insertedId){
                setAllBooks(...allBooks ,newBook ,)
            }
        } catch (error) {
            console.error(error)
        }


         e.target.reset();


         toast("Book Added" , {
             duration: 4000,
             position: "bottom-right",
             style: { background: '#1e293b',   color: '#fff'  },
           })
    };
    return (
        <div>
            <h1 className='text-4xl font-bold dark:text-white'>Add New Books</h1>
            <p className='text-md font-medium text-gray-500'>Add a book to the library collection</p>

            <form onSubmit={handleAddBook} className='mt-5 rounded-2xl bg-white dark:bg-slate-900 w-full min-h-screen p-5 space-y-3'>

                {/* Book name  */}
                <div className=''>
                <label className='label dark:text-white'>Book Name</label>
                <input 
                placeholder='Title of the Book'
                className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' name='bookname' id='bookname' type="text" />
                </div>

                {/* Author */}
                <div className=''>
                <label className='label dark:text-white'>Author Name</label>
                <input 
                placeholder='Name of the Author'
                className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' name='author' id='author' type="text" />
                </div>

                {/* Book image url */}
                <div className=''>
                <label className='label dark:text-white'>Image URL</label>
                <input 
                placeholder='Enter Image URL'
                className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' name='url' id='url'  type="text" />
                </div>

                {/* catagory */}
                <div className=''>
                <label className='label dark:text-white'>Catagory</label>
                <select className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' required name="genra" id="genra">
                    <option>Select a Genra</option>
                    {
                      genres.map((gen)=> (
                        <option key={gen} id={gen} value={gen}>{gen}</option>
                      ))
                    }
                </select>
                </div>

                {/* Price */}
                <div className=''>
                <label className='label dark:text-white'>Price ($)</label>
                <input 
                placeholder='0.00'
                className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' name='price' id='price' required type="number" />
                </div>

                {/* Ratings */}
                  <label className='label dark:text-white'>Rating (1-5)</label>
                 <select name="rating"id="rating"required
                  className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="">Select Rating</option>
                     {[1, 2, 3, 4, 5].map(r => (
                        <option key={r} value={r}>{r}</option>
                            ))}
                 </select>

                {/* description */}
                <div className=''>
                <label className='label dark:text-white'>Description</label>
                <textarea 
                placeholder='Enter Book Descriotion'
                row={3}
                className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' name='description' id='description' required type="text" />
                </div>

                {/* Status */}
                <div className=''>
                <label className='label dark:text-white'>Status</label>
                <select 
                className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' required name="status" id="status">
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                </select>
                </div>

                {/* submit  */}
                <button type='submit'  
                className='Primary-btn px-3 py-2 rounded-2xl w-full text-white text-xl'>
                        Add Book
                </button>

            </form>
        </div>
    );
};

export default AddBooks;