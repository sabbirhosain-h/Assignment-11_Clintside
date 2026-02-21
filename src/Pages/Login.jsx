/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from "motion/react"
import { EyeOff, EyeOffIcon } from 'lucide-react';

const Login = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
    return (
        <div className=" flex items-center justify-center min-h-100 bg-gray-100 dark:bg-gray-800">

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="flex flex-col items-center justify-center w-80 md:w-125 rounded-2xl shadow-xl p-8 border border-slate-200 px-4 py-3 dark:bg-slate-800 dark:border-slate-700 mt-10 mb-10">


                <motion.img 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className='h-12 w-12 mt-5 rounded-2xl justify-center items-center'
                src="https://i.ibb.co.com/sdDsNMSx/download.jpg" alt="" />

                <h2 className="ml-4 text-xl font-bold dark:text-white text-black mt-3">Welcome to LibrisGo</h2>
                <p className="dark:text-white text-black mt-2">Sign in to your account to continue</p>



                <form className="w-full mt-4">

                    {/* mail */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="you@example.com" />
                    </div>

                    {/* pass */}
                    <div className="mb-4">
                        <label className="relative block text-sm font-medium text-gray-700 dark:text-gray-300">Password

                          <buttton onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-500">

                            {showPassword ? <EyeOff className="w-5 h-5 sm:w-5 cursor-pointer" /> : <EyeOffIcon className="w-5 h-5 sm:w-5 cursor-pointer" />}

                          </buttton>
                        </label>
                        <input 
                        type={showPassword ? "password" : "text"} id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                        
                       {loading ? 
                       (
                            <>
                             <div className="flex items-center gap-2 justify-center" >
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Signing in...</span>  
                              </div>
                             </>
                       ) : (  <span>Sign In</span> )}
                        
                        </button>
                </form>

                <div className="flex flex-col my-6">
           
 
                   <span className="text-center px-2 bg-gray-100 dark:bg-gray-800  text-slate-500">
                      -- Or continue with --
                    </span>
                    

                    {/* google login  */}
                    <button 
                    
                    className="mt-5 flex items-center justify-center bg-white text-black border-[#e5e5e5] border rounded-md py-2 px-4 ">
                       <svg aria-label="Google logo" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>

                     Login with Google
                    </button>
              

                </div>





            </motion.div>
        </div>
    );
};

export default Login;