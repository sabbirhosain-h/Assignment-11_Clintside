import React from 'react';
import { Link } from 'react-router';
import { CircleCheckBig } from "lucide-react";
import { motion } from "motion/react";

const PaySuccess = () => {
    const rows = [
        { label: "Payment ID:", value: "PAY-1772760668074", bold: false },
        { label: "Book:", value: "The Catcher in the Rye", bold: true },
        { label: "Amount:", value: "$12.49", bold: true },
        { label: "Date:", value: "2026-03-06", bold: false },
    ];

    return (
        <div className='dark:bg-slate-900 flex justify-center items-center p-20'>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mx-auto p-10 bg-white dark:bg-slate-800 rounded-2xl flex flex-col justify-center items-center"
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                    className='mt-5 mb-3 rounded-full p-5 text-green-400 bg-green-100'
                >
                    <CircleCheckBig className="w-20 h-20" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.35 }}
                    className='text-3xl dark:text-white font-extrabold'
                >
                    Payment Successful!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.35 }}
                    className='dark:text-white/20 text-black/25 mt-2'
                >
                    Your payment has been processed successfully
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.35 }}
                    className='grid grid-cols-2 grid-rows-4 justify-self-end w-full mt-2 rounded-2xl p-5 bg-slate-100 dark:bg-slate-600'
                >
                    {rows.map((row, i) => (
                        <React.Fragment key={i}>
                            <motion.div
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
                                className="p-1 dark:text-white/60"
                            >
                                {row.label}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
                                className={`p-1 ${row.bold ? "font-bold" : ""} dark:text-white`}
                            >
                                {row.value}
                            </motion.div>
                        </React.Fragment>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.78, duration: 0.3 }}
                    className="w-full"
                >
                    <Link to={"/dashboard/MyOrder"} className='w-full'>
                        <button className='mt-4 px-3 py-2 text-white bg-blue-700 text-md rounded-lg w-full'>
                            Go to Dashboard
                        </button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.88, duration: 0.3 }}
                    className="w-full"
                >
                    <Link to={"/Books"} className='w-full'>
                        <button className='mt-2 px-3 py-2 dark:bg-slate-600 bg-blue-100 dark:text-white text-md rounded-lg w-full'>
                            Continue Shopping
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaySuccess;