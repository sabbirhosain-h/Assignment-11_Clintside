import React, { use, useState } from 'react';
import { motion } from "motion/react"
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");  
     const { setUser, signIn, signInWithGoogle} = use(AuthContext);
     const navigate = useNavigate();
     const location = useLocation();
    
     const redirectPath = location.state?.from?.pathname 
     || localStorage.getItem("redirectAfterLogin") || "/";

    const handleSubmit = async (e) => {  
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email || !password) {
            setError("");
            return;
        }
        setError(""); 
        setLoading(true);

        try {
           const result = await signIn(email, password); 
           setUser(result.user);
           e.target.reset();
           navigate(redirectPath, { replace: true });
           localStorage.removeItem("redirectAfterLogin");
        } catch(error) {
           
            if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                setError("Invalid email or password. Please try again.");
            } else if (error.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else if (error.code === "auth/too-many-requests") {
                setError("Too many failed attempts. Please try again later.");
            } else {
                setError("Something went wrong. Please try again.");
            }
            
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
       setError("");
       try {
          const result = await signInWithGoogle();
          setUser(result.user);
          navigate(redirectPath, { replace: true });
          localStorage.removeItem("redirectAfterLogin");
       } catch (error) {
          setError("Google sign-in failed. Please try again." + (error.message || ""));
       }
    }

    return (
        <div className="flex items-center justify-center min-h-100 bg-gray-100 dark:bg-gray-800">

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="flex flex-col items-center justify-center w-80 md:w-125 rounded-2xl shadow-xl p-8 border border-slate-200 px-4 py-3 dark:bg-slate-800 dark:border-slate-700 mt-10 mb-10">

                <motion.img 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className='h-12 w-12 mt-5 rounded-2xl'
                src="https://i.ibb.co.com/sdDsNMSx/download.jpg" alt="" />

                <h2 className="ml-4 text-xl font-bold dark:text-white text-black mt-3">Welcome to LibrisGo</h2>
                <p className="dark:text-white text-black mt-2">Sign in to your account to continue</p>

                {/*  Error alert box */}
                {error && (
                    <div className="w-full mt-4 px-4 py-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full mt-4">

                    {/* email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="you@example.com" />
                    </div>

                    {/* password */}
                    <div className="mb-4">
                        <label className="relative block text-sm font-medium text-gray-700 dark:text-gray-300">Password

                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700">
                            {showPassword 
                              ? <Eye className="w-5 h-5 cursor-pointer" /> 
                              : <EyeOff className="w-5 h-5 cursor-pointer" />}
                          </button>
                        </label>

                        <input 
                        type={showPassword ? "text" : "password"} id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                       {loading ? (
                            <div className="flex items-center gap-2 justify-center">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Signing in...</span>  
                            </div>
                       ) : <span>Sign In</span>}
                    </button>
                </form>

                <div className="flex flex-col my-6 w-full">
                   <span className="text-center px-2 bg-gray-100 dark:bg-gray-800 text-slate-500">
                      -- Or continue with --
                   </span>

                    <button 
                    onClick={handleGoogleSignUp}
                    className="mt-5 flex items-center justify-center bg-white text-black border-[#e5e5e5] border rounded-md py-2 px-4">
                       <svg aria-label="Google logo" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                     Login with Google
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default Login;