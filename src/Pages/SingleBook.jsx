import { ArrowLeft, Star, Heart } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import useAPIs from '../Hooks/useAPIs';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { DataContext } from '../Context/DataProvider';


const SingleBook = () => {
    const navigate = useNavigate();
    const [wishList, setWishList] = useState(false);
    const [orderBox, setOrderBox] = useState(false);
    const { user } = useContext(AuthContext);
    const { setWishRefetch } = useContext(DataContext);
    const instance = useAPIs();
    const [book, setBook] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await instance.get(`/AllBooks/${id}`);
            setBook(bookData.data);
        };
        const checkWishlist = async () => {
            try {
                const res = await instance.get(`/MyWishlist?email=${user.email}`);
                const alreadyAdded = res.data.some(book => book._id === id);
                setWishList(alreadyAdded);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBook();
        if (user) checkWishlist();
    }, [id]);


    const orderDialogueBox = () => setOrderBox(true);
    const wishlistButton = async () => {
        if (!wishList) {
            try {
                await instance.post(`/Wishlist/${id}`);
                setWishList(true);
                toast("Book Added to Wishlist", {
                    duration: 2000,
                    position: "bottom-right",
                    style: { background: '#1e293b', color: '#fff' },
                });
                setWishRefetch(true)
            } catch (error) {
                console.error("Adding to wishlist:", error);
                toast("Failed to add to Wishlist", {
                    duration: 2000,
                    position: "bottom-right",
                    style: { background: '#ff0000', color: '#fff' },
                });
            }
        }
        else {
            try {
                await instance.delete(`/Wishlist/remove/${id}`);
                setWishList(false);
                toast("Removed from Wishlist", {
                    duration: 2000,
                    position: "bottom-right",
                    style: { background: '#1e293b', color: '#fff' },
                });
            } catch (error) {
                console.error(error);
                toast("Failed to remove from Wishlist", {
                    duration: 2000,
                    position: "bottom-right",
                    style: { background: '#ff0000', color: '#fff' },
                });
            }
        }
    };

    const handleOrder = async (e) => {
        e.preventDefault();

        try {
            const phone = e.target.phone.value;
            const address = e.target.address.value;
            const id = book._id;
            const url = book.url;
            const author = book.author;
            const bookName = book.bookName;
            const price = book.price;
            const buyerName = user?.displayName;
            const email = user.email;
            const payBookData = { buyerName, id, phone, address, url, bookName, price, email, author }

            const res = await instance.post("/payment", payBookData)

        } catch (error) {
            console.error(error);
        }

        navigate("/dashboard/MyOrder")
        setOrderBox(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="dark:bg-black/20 min-h-screen px-6 lg:px-20 py-6 space-y-6">

            {/* Back Button */}
            <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                className="flex gap-2 px-4 py-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white text-black font-medium"
            >
                <ArrowLeft /> Back
            </motion.button>

            {/* Main Book Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Book Image */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src={book?.url}
                        alt={book?.bookName}
                        className="w-200 h-150 lg:h-100 lg:w-150 object-cover" />
                </motion.div>

                {/* Book Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-700 p-6 md:p-4 rounded-2xl shadow-xl flex flex-col justify-between">
                    {/* Genre */}
                    <span className="bg-blue-600 text-white px-4 py-2 w-max rounded-xl font-semibold">
                        {book?.genra || "Loading..."}
                    </span>

                    {/* Title */}
                    <h1 className="mt-5 text-3xl lg:text-4xl font-bold text-black dark:text-white">
                        {book?.bookName || "Loading..."}
                    </h1>

                    {/* Author */}
                    <h2 className="mt-3 text-lg lg:text-xl font-medium text-gray-800 dark:text-gray-300">
                        By {book?.author || "Loading..."}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center mt-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-6 w-6 ${star <= Math.round(book?.rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                        <span className="ml-2 dark:text-white font-medium text-md">
                            {book?.rating}
                        </span>
                    </div>

                    {/* Price */}
                    <p className="mt-6 text-3xl lg:text-4xl font-bold text-black dark:text-white">
                        ${book?.price || "Loading..."}
                    </p>

                    {/* Description */}
                    <p className="mt-5 text-gray-700 dark:text-gray-300 text-md lg:text-lg">
                        {book?.description || "Loading..."}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                        <motion.button
                            onClick={() => (user ? orderDialogueBox() : navigate("/Login"))}
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 px-5 py-3 bg-blue-800 text-white rounded-2xl hover:bg-blue-700 font-semibold">
                            Order Now
                        </motion.button>

                        <motion.button
                            onClick={wishlistButton}
                            whileTap={{ scale: 0.9 }}
                            className={`px-4 py-3 rounded-2xl ${wishList ? "bg-blue-700 text-white" : "bg-amber-100 text-gray-800"
                                }`}>
                            <Heart />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Order Modal */}
            <AnimatePresence>
                {orderBox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <motion.form
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onSubmit={handleOrder}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-lg space-y-4">
                            <h2 className="text-2xl font-bold dark:text-white">Place Your Order</h2>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full px-3 py-2 rounded-lg border"
                                    value={user?.displayName || ''}
                                    readOnly />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full px-3 py-2 rounded-lg border"
                                    value={user?.email || ''}
                                    readOnly />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full px-3 py-2 rounded-lg border"
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    required
                                    placeholder="Enter your phone number"
                                    onInput={(e) => {
                                        if (e.target.value.length > 11) {
                                            e.target.value = e.target.value.slice(0, 11);
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300">Delivery Address</label>
                                <textarea
                                    className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full px-3 py-2 rounded-lg border"
                                    name="address"
                                    id='address'
                                    required
                                    rows={3}
                                    placeholder="Enter your delivery address" />
                            </div>
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-800 text-white rounded-2xl hover:bg-blue-700 font-semibold">
                                    Place Order
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOrderBox(false)}
                                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-2xl hover:bg-gray-300 font-semibold">
                                    Close
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default SingleBook;