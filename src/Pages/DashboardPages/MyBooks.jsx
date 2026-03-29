// MyBooks.jsx
import React, { useContext } from 'react';
import useSecure from '../../Hooks/useSecure';
import { Star, Pencil } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthProvider';

const MyBooks = () => {
    const secure = useSecure();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { data: myBooks = [], isLoading } = useQuery({
        queryKey: ["myBooks", user?.email],
        queryFn: async () => {
            const res = await secure.get(`/myBooks?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-40">
            <div className="w-6 h-6 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div>
            <h1 className='text-3xl font-bold dark:text-white'>My Books</h1>
            <p className='text-sm text-gray-400 mt-1'>Manage books you've added</p>

            <div className='bg-white dark:bg-slate-900 p-4 md:p-8 mt-4 rounded-2xl'>
                <div className='flex items-center justify-between mb-5'>
                    <h2 className='font-semibold text-xl dark:text-white'>
                        {myBooks.length} Books
                    </h2>
                </div>

                {/* Desktop */}
                <div className='hidden lg:block overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800 text-xs uppercase tracking-wide text-slate-500">
                                {["Book / Author", "Genre", "Price", "Status", "Rating", ""].map(h => (
                                    <th key={h} className="text-left px-5 py-4 text-[15px] font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
                            {myBooks.map((book, i) => (
                                <motion.tr
                                    key={book._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    <td className='px-6 py-6'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={book.url}
                                                alt={book.bookName}
                                                className='h-15 w-15 rounded-lg object-cover shrink-0'
                                            />
                                            <div>
                                                <p className='font-medium text-md dark:text-white'>{book.bookName}</p>
                                                <p className='text-xs text-slate-400'>{book.author}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-5 py-5 text-md text-slate-500 dark:text-slate-400'>
                                        {book.genra}
                                    </td>
                                    <td className='px-5 py-5 text-xl dark:text-white'>
                                        ৳{book.price}
                                    </td>
                                    <td className='px-5 py-5'>
                                        <StatusBadge status={book.status} />
                                    </td>
                                    <td className='px-5 py-5'>
                                        <div className='flex items-center gap-1 text-sm dark:text-white'>
                                            <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                                            {book.rating}
                                        </div>
                                    </td>
                                    <td className='px-5 py-5'>
                                        <button
                                            onClick={() => navigate(`/dashboard/EditBook/${book._id}`)}
                                            className='flex items-center gap-1.5 text-md px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 transition font-medium'
                                        >
                                            <Pencil className='w-3.5 h-3.5' />
                                            Edit
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ✅ Mobile — only this section changed */}
                <div className='lg:hidden space-y-3'>
                    {myBooks.map((book, i) => (
                        <motion.div
                            key={book._id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className='border border-slate-100 dark:border-slate-800 rounded-xl p-4'
                        >
                            {/* top row: image + info + edit button */}
                            <div className='flex items-center gap-3'>
                                <img
                                    src={book.url}
                                    alt={book.bookName}
                                    className='h-16 w-16 rounded-lg object-cover shrink-0'
                                />
                                <div className='flex-1 min-w-0'>
                                    <p className='font-semibold text-sm dark:text-white truncate'>{book.bookName}</p>
                                    <p className='text-xs text-slate-400 mt-0.5'>{book.author}</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/dashboard/EditBook/${book._id}`)}
                                    className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 shrink-0'
                                >
                                    <Pencil className='w-3.5 h-3.5' />
                                    Edit
                                </button>
                            </div>

                            {/* bottom row: genre · price · rating · status */}
                            <div className='flex items-center gap-3 mt-3 flex-wrap'>
                                <span className='text-xs text-slate-400'>{book.genra}</span>
                                <span className='text-xs text-slate-500 dark:text-slate-300'>৳{book.price}</span>
                                <div className='flex items-center gap-0.5 text-xs text-slate-400'>
                                    <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
                                    {book.rating}
                                </div>
                                <StatusBadge status={book.status} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {myBooks.length === 0 && (
                    <p className='text-center text-slate-400 py-16 text-sm'>You haven't added any books yet.</p>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => (
    <span className={`text-md px-2 py-0.5 rounded-md font-medium
        ${status === "published"
            ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            : "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400"
        }`}>
        {status || "unpublished"}
    </span>
);

export default MyBooks;