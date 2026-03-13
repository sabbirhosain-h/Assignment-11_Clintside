import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import useAPIs from '../../Hooks/useAPIs';
import { DataContext } from '../../Context/DataProvider';
import { AuthContext } from '../../Context/AuthProvider';
import useImageUpload from '../../Hooks/useImageUpload ';
import { ImageUp } from 'lucide-react/dist/cjs/lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AddBooks = () => {
    const {  setAllBooks } = useContext(DataContext);
    const { user } = useContext(AuthContext);
    const instance = useAPIs();
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const uploadImage = useImageUpload();

    const genres = ['Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Classic', 'Non-Fiction', 'Thriller', 'Horror', 'Biography', 'History'];

    const uploadPic = async (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        const imgUrl = await uploadImage(file);
        setImageFile(imgUrl);
    };

    const handleAddBook = async (e) => {
        e.preventDefault();

        const bookName = e.target.bookname.value;
        const author = e.target.author.value;
        const url = imageFile;
        const genra = e.target.genra.value;
        const price = e.target.price.value;
        const rating = e.target.rating.value;
        const description = e.target.description.value;
        const status = e.target.status.value;
        const email = user.email;

        const newBook = { bookName, author, url, genra, price, rating, description, status, email };

        try {
            const post = await instance.post("/AllBooks", newBook);
            if (post.data.insertedId) {
                setAllBooks(prev => [...(prev || []), newBook]);
            }
            e.target.reset();
            setImageFile(null);
            setPreview(null);
            toast("Book Added", {
                duration: 4000,
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        } catch (error) {
            console.error(error);
            toast("Failed to add book", {
                duration: 4000,
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <h1 className='text-4xl font-bold dark:text-white'>Add New Books</h1>
            <p className='text-md font-medium text-gray-500'>Add a book to the library collection</p>

            <form onSubmit={handleAddBook} className='mt-5 rounded-2xl bg-white dark:bg-slate-900 w-full min-h-screen p-5 space-y-3'>

                {/* Book Name */}
                <div>
                    <label className='label dark:text-white'>Book Name</label>
                    <input
                        placeholder='Title of the Book'
                        className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                        name='bookname' type="text" required
                    />
                </div>

                {/* Author */}
                <div>
                    <label className='label dark:text-white'>Author Name</label>
                    <input
                        placeholder='Name of the Author'
                        className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                        name='author' type="text" required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className='block label dark:text-gray-300'>Upload Image</label>

                    <AnimatePresence mode="wait">
                        {!preview ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='cursor-pointer input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                            >
                                <label className="flex justify-start items-center gap-3 cursor-pointer">
                                    <ImageUp className="w-10 h-10 shrink-0" />
                                    <span className="text-sm">Upload book cover image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={uploadPic} />
                                </label>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="relative mt-2 w-full"
                            >
                                <img src={preview} className="w-50 h-52 object-cover rounded-xl" alt="preview" />
                                <button
                                    type="button"
                                    onClick={() => { setPreview(null); setImageFile(null); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg"
                                >
                                    Remove
                                </button>
                                {!imageFile && <p className="text-xs text-slate-400 mt-1 text-center">Uploading...</p>}
                                {imageFile && <p className="text-xs text-green-500 mt-1 text-center">✓ Image ready</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Category */}
                <div>
                    <label className='label dark:text-white'>Category</label>
                    <select className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' required name="genra">
                        <option value="">Select a Genre</option>
                        {genres.map((gen) => (
                            <option key={gen} value={gen}>{gen}</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className='label dark:text-white'>Price (৳)</label>
                    <input
                        placeholder='0.00'
                        className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                        name='price' required type="number"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className='label dark:text-white'>Rating (1-5)</label>
                    <select name="rating" required className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="">Select Rating</option>
                        {[1, 2, 3, 4, 5].map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className='label dark:text-white'>Description</label>
                    <textarea
                        placeholder='Enter Book Description'
                        rows={3}
                        className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                        name='description' required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className='label dark:text-white'>Status</label>
                    <select className='input-field input-field:focus dark:bg-gray-700 dark:border-gray-600 dark:text-white' required name="status">
                        <option value="Published">Published</option>
                        <option value="Unpublished">Unpublished</option>
                    </select>
                </div>

                {/* Submit */}
                <motion.button
                    type='submit'
                    disabled={preview && !imageFile}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className='Primary-btn px-3 py-2 rounded-2xl w-full text-white text-xl disabled:opacity-50'
                >
                    {preview && !imageFile ? "Uploading Image..." : "Add Book"}
                </motion.button>

            </form>
        </motion.div>
    );
};

export default AddBooks;