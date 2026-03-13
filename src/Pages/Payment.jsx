import { CreditCard } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router';
import useAPIs from '../Hooks/useAPIs';
import { motion } from 'motion/react';
import Load from './Load';

const Payment = () => {
  
    const [na, setNa] = useState("");
    const instance = useAPIs();
    const { i } = useParams();


    useEffect(() => {
        const getprivatedatat = async () => {
            const res = await instance.get("/payment", { params: { id: i } });

            setNa(res.data);

        };
        getprivatedatat();
    }, [i]);


    const finalPrice = parseInt(na.price) + parseInt(na.price * 0.2)

    const handlepayment = async (e) => {
        e.preventDefault();
        const totalPrice = parseInt(na.price) + parseInt(na.price * 0.2)
        const bookId = na.bookId;
        console.log(na ,bookId)
        const Book = na.bookName;
        const paymentInfo = { finalPrice , Book , i , totalPrice , bookId  }
        
        // console.log(i,bookId)

        try {
            const res = await instance.post("/makePayment", paymentInfo )
         
            window.location.href = res.data.checkoutUrl;
        } catch (error) {
            console.error(error)
        }
        };

        if (!na) return <Load/>;
    


    return (
        <motion.div
            className='grid gap-5 grid-cols-1 px-4 py-6 sm:px-8 sm:py-10 max-w-lg mx-auto'
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.68, 0, 1.2] }}
        >
            <h1 className='text-center font-bold text-3xl dark:text-white'>Order Summery</h1>
            <div className='bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm'>

                {/* Book Image */}
                <motion.img
                    className='w-full h-56 object-cover'
                    src={na.url}
                    alt={na.bookName}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                />

                <div className='p-5'>

                    {/* Book Title */}
                    <h2 className='text-base font-medium text-slate-900 dark:text-white mb-4 leading-snug'>
                        {na.bookName}
                    </h2>

                    <div className='border-t border-slate-100 dark:border-slate-700' />

                    {/* Price Breakdown */}
                    <div className='py-4 space-y-2'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-slate-500 dark:text-slate-400'>Subtotal</span>
                            <span className='text-sm font-medium text-slate-800 dark:text-white'>৳ {na.price}</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-slate-500 dark:text-slate-400'>Delivery fee</span>
                            <span className='text-sm font-medium text-slate-800 dark:text-white'>৳ {parseInt(na.price * 0.2)}</span>
                        </div>
                        <div className='flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700'>
                            <span className='text-base font-medium text-slate-900 dark:text-white'>Total</span>
                            <span className='text-lg font-medium text-slate-900 dark:text-white'>
                                ৳ {finalPrice}
                            </span>
                        </div>
                    </div>

                    <div className='border-t border-slate-100 dark:border-slate-700' />

                    {/* Delivery Address */}
                    <div className='mt-4 bg-slate-50 dark:bg-slate-700 rounded-xl p-4'>
                        <p className='text-sm font-medium text-slate-800 dark:text-white mb-1'>Delivery address</p>
                        <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>{na.address}</p>
                        <p className='text-sm text-slate-500 dark:text-slate-400'>{na.phone}</p>
                    </div>

                    {/* Pay Button */}
                    <motion.button
                        onClick={handlepayment}
                        className='mt-4 w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-medium tracking-wide'
                        whileHover={{ opacity: 0.85 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ duration: 0.15 }}
                    >
                        Pay ৳ {finalPrice}
                    </motion.button>

                </div>
            </div>
        </motion.div>
    );
};

export default Payment;