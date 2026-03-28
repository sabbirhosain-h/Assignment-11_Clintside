import React from 'react';
import useSecure from '../../Hooks/useSecure';
import { Star, Trash2Icon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

const ManageBooks = () => {
    const secure = useSecure();
    const queryClient = useQueryClient();

    const { data: allBooks = [] } = useQuery({
        queryKey: ["manageBooks"],
        queryFn: async () => {
            const res = await secure.get("/manageBooks");
            return res.data;
        },
    });

    // Toggle publish/unpublish
    const statusMutation = useMutation({
        mutationFn: async ({ bookId, newStatus }) => {
            await secure.patch(`/manageBooks/${bookId}/status`, { status: newStatus });
            return { bookId, newStatus };
        },
        onMutate: async ({ bookId, newStatus }) => {
            await queryClient.cancelQueries({ queryKey: ["manageBooks"] });
            const previous = queryClient.getQueryData(["manageBooks"]);
            queryClient.setQueryData(["manageBooks"], (old) =>
                old.map(b => b._id === bookId ? { ...b, status: newStatus } : b)
            );
            return { previous };
        },
        onSuccess: (_, { newStatus }) => {
            toast.success(`Book ${newStatus === "published" ? "published" : "unpublished"}`, {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(["manageBooks"], context.previous);
            toast.error("Failed to update status", {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["manageBooks"] }),
    });

    // Delete book
    const deleteMutation = useMutation({
        mutationFn: async (bookId) => {
            await secure.delete(`/manageBooks/${bookId}`);
            return bookId;
        },
        onMutate: async (bookId) => {
            await queryClient.cancelQueries({ queryKey: ["manageBooks"] });
            const previous = queryClient.getQueryData(["manageBooks"]);
            queryClient.setQueryData(["manageBooks"], (old) =>
                old.filter(b => b._id !== bookId)
            );
            return { previous };
        },
        onSuccess: () => {
            toast.success("Book deleted", {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(["manageBooks"], context.previous);
            toast.error("Failed to delete book", {
                position: "bottom-right",
                style: { background: '#1e293b', color: '#fff' },
            });
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["manageBooks"] }),
    });

    const handleStatusToggle = (book) => {
        const newStatus = book.status === "published" ? "unpublished" : "published";
        statusMutation.mutate({ bookId: book._id, newStatus });
    };

    return (
        <div>
            <h1 className='text-4xl font-bold dark:text-white'>Manage Books</h1>
            <p className='text-md font-medium text-gray-500'>Manage all books in the library</p>

            <div className='bg-white dark:bg-slate-900 p-4 md:p-10 mt-4 w-full rounded-2xl'>
                <h1 className='font-semibold text-2xl dark:text-white mb-4'>
                    All Books ({allBooks.length})
                </h1>

                {/* Desktop Table */}
                <div className='hidden lg:block overflow-x-auto rounded-t-2xl'>
                    <table className='bg-white dark:bg-slate-900 w-full'>
                        <thead>
                            <tr className="dark:bg-slate-800 bg-slate-100">
                                {["Book", "Category", "Price", "Status", "Rating", "Actions"].map((head) => (
                                    <th key={head} className="tablehead dark:text-white text-left px-4 py-3">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
                            {allBooks.map((book, i) => (
                                <motion.tr
                                    key={book._id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    <td className='px-4 py-3'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                className='h-12 w-12 rounded-xl object-cover shrink-0'
                                                src={book.url}
                                                alt={book.bookName}
                                            />
                                            <span className='font-medium dark:text-white'>{book.author}</span>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <span className='bg-amber-100 text-amber-700 dark:bg-yellow-900 dark:text-amber-300 rounded-xl px-3 py-1.5 text-sm'>
                                            {book.genra}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 text-gray-900 dark:text-gray-300'>৳ {book.price}</td>
                                    <td className='px-4 py-3'>
                                        <StatusBadge status={book.status} />
                                    </td>
                                    <td className='px-4 py-3 text-gray-600 dark:text-gray-300'>
                                        <div className='flex items-center gap-1'>
                                            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                                            <span>{book.rating}</span>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() => handleStatusToggle(book)}
                                                disabled={statusMutation.isPending}
                                                className={`rounded-xl px-3 py-1.5 text-sm text-white transition disabled:opacity-50 disabled:cursor-not-allowed
                                                    ${book.status === "published"
                                                        ? "bg-amber-500 hover:bg-amber-600"
                                                        : "bg-blue-500 hover:bg-blue-600"}`}
                                            >
                                                {book.status === "published" ? "Unpublish" : "Publish"}
                                            </button>
                                            <button
                                                onClick={() => deleteMutation.mutate(book._id)}
                                                disabled={deleteMutation.isPending}
                                                className='rounded-xl bg-red-500 hover:bg-red-600 text-white p-2 transition disabled:opacity-50 disabled:cursor-not-allowed'
                                            >
                                                <Trash2Icon className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className='lg:hidden space-y-3'>
                    {allBooks.map((book, i) => (
                        <motion.div
                            key={book._id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className='border border-slate-200 dark:border-slate-700 rounded-xl p-4'
                        >
                            {/* Book info */}
                            <div className='flex items-center gap-3 mb-3'>
                                <img
                                    className='h-14 w-14 rounded-xl object-cover shrink-0'
                                    src={book.url}
                                    alt={book.bookName}
                                />
                                <div>
                                    <p className='font-semibold dark:text-white'>{book.author}</p>
                                    <span className='bg-amber-100 text-amber-700 dark:bg-yellow-900 dark:text-amber-300 rounded-lg px-2 py-0.5 text-xs'>
                                        {book.genra}
                                    </span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mb-3'>
                                <div className='flex items-center gap-3'>
                                    <span className='text-sm dark:text-white'>৳ {book.price}</span>
                                    <div className='flex items-center gap-1'>
                                        <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
                                        <span className='text-sm dark:text-gray-300'>{book.rating}</span>
                                    </div>
                                </div>
                                <StatusBadge status={book.status} />
                            </div>

                            <div className='flex gap-2'>
                                <button
                                    onClick={() => handleStatusToggle(book)}
                                    disabled={statusMutation.isPending}
                                    className={`flex-1 rounded-xl px-3 py-1.5 text-sm text-white transition disabled:opacity-50 disabled:cursor-not-allowed
                                        ${book.status === "published"
                                            ? "bg-amber-500 hover:bg-amber-600"
                                            : "bg-blue-500 hover:bg-blue-600"}`}
                                >
                                    {book.status === "published" ? "Unpublish" : "Publish"}
                                </button>
                                <button
                                    onClick={() => deleteMutation.mutate(book._id)}
                                    disabled={deleteMutation.isPending}
                                    className='rounded-xl bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 transition disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <Trash2Icon className='w-4 h-4' />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {allBooks.length === 0 && (
                    <p className='text-center text-slate-400 py-10'>No books found.</p>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        published: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
        unpublished: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    };
    return (
        <span className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize ${styles[status] || styles.unpublished}`}>
            {status || "unpublished"}
        </span>
    );
};

export default ManageBooks;