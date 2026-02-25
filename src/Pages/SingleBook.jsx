import { ArrowLeft, MoveLeft, Star, Heart } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';

const SingleBook = () => {
    const navigate = useNavigate();
    const [wishList , setWishList] = useState(false);
    const [orderBox , setOrderBox]= useState(false);
    const {user} = useContext(AuthContext);
   
    const orderDialogueBox = () =>{
        setOrderBox(true);
    };
    const wishlistButton = () =>{
        setWishList(!wishList);
    };
    const handleOrder = (e) => {
        e.preventDefault();
        const number = e.target.phone.value;
        const address = e.target.address.value;
        console.log(number,address)
        setOrderBox(!orderBox); // then order is complete close the box
    }
    return (
        <div className='dark:bg-black/30 px-10 py-5 space-y-4'>
           
           <button 
            onClick={()=> navigate(-1)}
             className='flex gap-2 px-3 py-2 rounded-xl hover:bg-gray-300 dark:text-white text-black'>
            <ArrowLeft></ArrowLeft> Back
           </button>

        {/* main data about book */}

           <div className='min-h-screen py-8'>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12'>

                    
                    <div>
                        <img className='w-full hover:scale-105 rounded-2xl shadow-2xl ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AXD49XCs-BzwfBp99gCr60hs1WKc29RHbg&s" alt="" />
                    </div>
                  

                     <div className='w-full p-5 md:p-2 ' >
                        {/* genre */}
                        <span className='bg-blue-600  px-3 py-2 rounded-2xl text-white'>
                            Fantasy
                        </span>

                        {/* title */}
                        <p className='mt-12 text-3xl font-bold text-black dark:text-white'>
                            Whispers of the Forgotten Realm
                        </p>
                        {/* author */}
                        <h1 className='mt-4 mb-3 text-xl font-medium text-gray-800 dark:text-white/45'>
                           By Elena Storm
                        </h1>
                        {/* ratings */}
                        <div className="flex items-center">
                           {[1, 2, 3, 4, 5].map((star) => (
                               <Star key={star}
                                className={`h-5 w-5 ${star <= Math.round(4.5)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`} />
                            ))}
                         <span className="ml-2 font-medium">{(4.5).toFixed(1)}</span>
                         </div>
                        {/* price */}
                        <p className='mt-10 text-4xl font-bold text-black dark:text-white'>
                            $ 5.22
                        </p>
                        {/* summery */}
                        <p className='mt-8 text-md font-medium dark:text-white'>
                            A young warrior discovers an ancient kingdom hidden beyond time, where magic demands a deadly price
                        </p>

                        {/* button */}
                        <div className='flex gap-2 justify-center items-center mt-5'>

                            <button onClick={()=>{
                                user ? orderDialogueBox() : navigate("/Login");
                                
                            }}
                            className='px-4 py-3 bg-blue-800 rounded-2xl  w-full text-white hover:bg-blue-700'>
                            Order Now
                           </button>

                           {/* wishlist */}
                           <button onClick={wishlistButton}
                           className={`
                           ${wishList ?
                            "bg-blue-700 text-white"
                            :
                             "bg-amber-100" }
                           px-4 py-3 rounded-xl `}>
                                <Heart></Heart>
                           </button>
                        </div>

                    </div>

                </div>

                
           </div>

            {/* Order box */}
           {
             orderBox && (
                <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 '>

                    <form onSubmit={handleOrder} className='bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl space-y-4 lg:w-200'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">Name</label>
                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              id="name" value={user?.displayName || ''} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                            id="email" value={user?.email || ''} readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input
                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" >Delivery Address</label>
                            <textarea  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                id="address"
                                placeholder="Enter your delivery address"
                                rows={3}
                            />
                        </div>
                        <div className=' rounded-2xl p-6 shadow-2xl flex gap-2'>
                            <button type='submit' className='px-4 py-3 bg-blue-800 rounded-2xl text-white hover:bg-blue-700'>
                                Place Order
                            </button>
                            <button
                                className='px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white'
                                onClick={() => setOrderBox(!orderBox)}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                    
                </div>
             )
           }
           

        </div>
    );
};

export default SingleBook;