// EditBook.jsx
import React, { useState } from 'react';
import useSecure from '../../Hooks/useSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { ImageUp } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import useImageUpload from '../../Hooks/useImageUpload ';

const GENRES = ["Fiction", "Non-Fiction", "Science", "History", "Fantasy", "Biography", "Technology", "Other"];

const EditBook = () => {
    const { id } = useParams();
    const secure = useSecure();
    const navigate = useNavigate();
    const uploadImage = useImageUpload();
    const [imageUrl, setImageUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { data: book, isLoading } = useQuery({
        queryKey: ["book", id],
        queryFn: async () => {
            const res = await secure.get(`/books/${id}`);
            return res.data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: (updatedData) => secure.put(`/books/${id}`, updatedData),
        onSuccess: () => {
            toast.success("Book updated", {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
            navigate(-1);
        },
        onError: () => {
            toast.error("Update failed, try again", { position: "bottom-right" });
        },
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setUploading(true);
        setImageUrl(null);
        try {
            const url = await uploadImage(file);
            setImageUrl(url);
        } catch {
            setFileName(null);
            toast.error("Image upload failed", { position: "bottom-right" });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            bookName: form.bookName.value,
            author: form.author.value,
            price: Number(form.price.value),
            genra: form.genra.value,
            rating: Number(form.rating.value),
            status: form.status.value,
            url: imageUrl || book.url,
        };
        updateMutation.mutate(updatedData);
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-40">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div>
            <h1 className='text-3xl font-bold dark:text-white'>Edit Book</h1>
            <p className='text-sm text-gray-400 mt-1'>Update the details for this book</p>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='bg-white dark:bg-slate-900 p-6 md:p-8 mt-4 rounded-2xl max-w-2xl'
            >
                {/* Current cover preview */}
                <div className='flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800'>
                    <img
                        src={imageUrl || book.url}
                        alt={book.bookName}
                        className='h-40 w-30 object-cover rounded-xl shrink-0'
                    />
                    <div>
                        <p className='font-semibold dark:text-white'>{book.bookName}</p>
                        <p className='text-sm text-slate-400'>{book.author}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    {/* Book Name */}
                    <div>
                        <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>Book Name</label>
                        <input
                            name="bookName"
                            defaultValue={book.bookName}
                            required
                            className='w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>Author</label>
                        <input
                            name="author"
                            defaultValue={book.author}
                            required
                            className='w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                        />
                    </div>

                    {/* Price + Rating side by side */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>Price (৳)</label>
                            <input
                                name="price"
                                type="number"
                                defaultValue={book.price}
                                required
                                className='w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>Rating</label>
                            <input
                                name="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                defaultValue={book.rating}
                                required
                                className='w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                            />
                        </div>
                    </div>

                    {/* Genre + Status side by side */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>Genre</label>
                            <select
                                name="genra"
                                defaultValue={book.genra}
                                className='w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                            >
                                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>Status</label>
                            <select
                                name="status"
                                defaultValue={book.status}
                                className='w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400'
                            >
                                <option value="published">Published</option>
                                <option value="unpublished">Unpublished</option>
                            </select>
                        </div>
                    </div>

                    {/* Cover image upload */}
                    <div>
                        <label className='block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'>
                            Cover Image <span className='text-slate-400 font-normal'>(leave empty to keep current)</span>
                        </label>
                        <label className='flex items-center gap-3 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition'>
                            <ImageUp className='w-4 h-4 text-slate-400 shrink-0' />
                            <span className='text-sm text-slate-400 truncate'>
                                {uploading ? "Uploading..." : imageUrl ? fileName : "Choose new image"}
                            </span>
                            {uploading && (
                                <div className="ml-auto w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
                            )}
                            {imageUrl && !uploading && (
                                <span className='ml-auto text-xs text-green-500'>✓ Ready</span>
                            )}
                            <input type="file" accept="image/*" className='hidden' onChange={handleImageUpload} />
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-3 pt-2'>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className='px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateMutation.isPending || uploading}
                            className='flex-1 px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {updateMutation.isPending ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </span>
                            ) : "Save Changes"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditBook;