import { CreditCard } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAPIs from '../Hooks/useAPIs';
import { motion } from 'motion/react';

const Payment = () => {
    const [cardNum, setCardNum] = useState("");
    const [cardName, setCardName] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [cvv, setCvv] = useState("");
    const navigate = useNavigate();
    const [paymentBook, setPaymentBook] = useState("");
    const [na, setNa] = useState("");
    const [paymentId, setPaymentId] = useState(null);

    const instance = useAPIs();
    const { i } = useParams();

    useEffect(() => {
        const getPaymentBook = async () => {
            const res = await instance.get(`/AllBooks/${i}`);
            setPaymentBook(res.data);
        }
        getPaymentBook();
    }, [i]);

    useEffect(() => {
        const getprivatedatat = async () => {
            const res = await instance.get("/payment", { params: { id: i } });
            setNa(res.data);
            setPaymentId(res.data._id);
        };
        getprivatedatat();
    }, [i]);

    const handlepayment = async (e) => {
        e.preventDefault();
        if (!paymentId) {
            alert("Payment record not found");
            return;
        }
        try {
            await instance.patch(`/payment/success/${i}`);
            alert("Payment done");
            navigate(`/PaySuccess/${i}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardNumber = (e) => {
        let raw = e.target.value.replace(/\D/g, "").slice(0, 16);
        let formatted = raw.match(/.{1,4}/g)?.join(" ") || "";
        setCardNum(formatted);
    };

    const handleCardName = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        setCardName(value);
    };

    const handleCvv = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 3);
        setCvv(value);
    };

    const handleYear = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
        setYear(value);
    };

    return (
        <motion.div
            className='grid gap-5 grid-cols-1 lg:grid-cols-2 lg:px-30 lg:py-10 px-10 py-5 max-w-5xl mx-auto'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >

            {/* Order Summary Card */}
            <motion.div
                className='bg-white dark:bg-slate-600 p-5 shadow-xl rounded-2xl w-full'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
                <h1 className='text-md font-medium text-shadow-black dark:text-white'>Order Summary</h1>

                <div className='flex gap-5 items-center'>
                    <img className='mt-8 h-35 w-35' src={paymentBook.url} alt="" />
                    <div>
                        <h1 className='text-xl font-medium text-black dark:text-white'>{paymentBook.bookName}</h1>
                        <p className='mt-2 text-md font-md text-slate-800'>Order=#654</p>
                    </div>
                </div>

                <div className='devider mt-8'></div>

                <div className='mt-4 p-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg font-medium text-slate-500 dark:text-slate-800'>Subtotal</h1>
                        <span className='text-lg font-medium text-black'>৳ {paymentBook.price}</span>
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                        <h1 className='text-lg font-medium text-slate-500 dark:text-slate-800'>Delivery Fee</h1>
                        <span className='text-lg font-medium text-black'>৳ {parseInt(paymentBook.price * 0.2)}</span>
                    </div>
                    <div className='mt-3 flex items-center justify-between'>
                        <h1 className='text-3xl font-medium text-black'>Total</h1>
                        <span className='text-3xl font-medium text-black'>
                            ৳ {parseInt(paymentBook.price) + parseInt(paymentBook.price * 0.2)}
                        </span>
                    </div>
                </div>

                <div className='devider mt-8'></div>

                <div className='mt-5 p-3 bg-slate-100 dark:bg-slate-700 rounded-xl'>
                    <h1 className='text-lg font-medium text-black'>Delivery Address</h1>
                    <p className='text-lg font-md text-slate-600 dark:text-slate-800'>{na.address}</p>
                    <p className='text-lg font-sm text-slate-600 dark:text-slate-800'>{na.phone}</p>
                </div>
            </motion.div>

            {/* Payment Form Card */}
            <motion.div
                className='bg-white dark:bg-slate-600 p-5 shadow-xl rounded-2xl min-h-screen w-full'
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
                <h1 className='flex gap-2 text-md font-medium text-shadow-black dark:text-white'>
                    <CreditCard />
                    Payment Details
                </h1>

                <form onSubmit={handlepayment} className='mt-5'>

                    <label className='labe dark:text-white'>Card Number</label>
                    <input
                        className='input-field input-field:focus dark:text-white'
                        placeholder="1234 5678 9012 3456"
                        value={cardNum}
                        maxLength={19}
                        onChange={handleCardNumber}
                        inputMode="numeric"
                        type="text"
                        required
                    />

                    <label className='mt-2 labe dark:text-white'>Cardholder Name</label>
                    <input
                        className='input-field input-field:focus dark:text-white'
                        placeholder="Name on card"
                        value={cardName}
                        onChange={handleCardName}
                        type="text"
                        required
                    />

                    <label className='mt-2 labe dark:text-white'>Expiry Month</label>
                    <select
                        onChange={(e) => setMonth(e.target.value)}
                        value={month}
                        className='input-field input-field:focus dark:text-black'
                        required
                    >
                        <option value="">Select Month</option>
                        {["01","02","03","04","05","06","07","08","09","10","11","12"].map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>

                    <label className='mt-2 labe dark:text-white'>Expiry Year</label>
                    <input
                        className='input-field input-field:focus dark:text-white'
                        placeholder="YYYY"
                        value={year}
                        maxLength={4}
                        inputMode="numeric"
                        type="text"
                        onChange={handleYear}
                        required
                    />

                    <label className='mt-2 labe dark:text-white'>CVV</label>
                    <input
                        className='input-field input-field:focus dark:text-white'
                        placeholder="123"
                        value={cvv}
                        maxLength={3}
                        onChange={handleCvv}
                        inputMode="numeric"
                        type="text"
                        required
                    />

                    <motion.button
                        type='submit'
                        className='mt-5 px-3 py-2 Primary-btn w-full text-white text-2xl rounded-2xl'
                        whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        ৳ {parseInt(paymentBook.price) + parseInt(paymentBook.price * 0.2)}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Payment;