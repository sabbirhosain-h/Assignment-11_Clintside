import React, { useContext, useState } from 'react';
import ThemeContext from '../Context/CreateContext';
import { Link,  NavLink, useNavigate } from 'react-router';
import { CircleUser, Moon, User } from 'lucide-react';
import { AuthContext } from '../Context/AuthProvider';


const Navber = () => {
    const {user , SignOut} = useContext(AuthContext);
    const {theme, setTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [show , setShow] = useState(false);
    const Navigate = useNavigate();
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }
    const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    ];
   const handleSignOut = () => {
        SignOut();
        Navigate("/");
   }
   
    return (
        <nav className='lg:flex sticky top-0 z-50 w-full max-w-full mx-auto bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>

            {/* Big sceen */}

          <div className='flex items-center justify-between w-full lg:px-10 lg:py-4 px-4 py-3  min-w-0'>
             
             {/* logo */}
             <div className='flex gap-4 items-center shrink-0'>
                        <Link to='/' className='flex items-center gap-4 group'>
                            <div className=''>
                                <img src='../../public/Librisgo.jpg' className='w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-md text-white '/>
                            </div>
                            <span className='text-xl dark:text-white font-semibold text-black sm:block group-hover:text-[#0077b6] transition-colors'>
                                LibrisGo
                            </span>
                        </Link>
            </div>

            {/* nav links */}
             
                <div className='hidden lg:flex gap-4'>
                    {navLinks.map(link => (
                    <NavLink  key={link.path} to={link.path} 
                    className={({isActive})=>`text-md font-medium dark:text-white transition-all duration-200 hover:text-[#0077b6] hover:scale-105  px-3 py-2 rounded-md text-gray-800 
                    
                    ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' :
                     ' '}`}>
                       
                        {link.label}
                       
                    </NavLink>
                    ))}
                    {
                        user &&  (
                        <NavLink  to={"Dashboard"} 
                       className={({isActive})=>`text-md font-medium dark:text-white transition-all duration-200 hover:text-[#0077b6] hover:scale-105  px-3 py-2 rounded-md text-gray-800 
                    
                        ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' :
                     ' '}`}>    
                        Dashboard
                        </NavLink>
                        )
                    }
                </div>
              



            {/* theme button */}
            <div className='flex items-center gap-2 shrink-0'>

               <div onClick={ 
                () => {
                    toggleTheme();
                }} 
            className={`relative  
             ${theme === "light" ? "bg-white" : "bg-gray-800"}
            w-12 h-7 border-2 border-gray-500 rounded-l-2xl rounded-r-2xl cursor-pointer p-2`}>

                <div className={`absolute -top-3 -left-3 w-12 h-12 rounded-full 
                  flex items-center justify-center transition-transform duration-500 ease-in-out
                      ${theme === "light" ? "translate-x-5" : "translate-x-0"}`}>

                    {
                        theme === "light" ? 
                        <span className="text-yellow-400">☀️</span> : 
                        (<Moon className="text-white fill-white"></Moon>)
                    }      
                
                </div>

                <div>

                </div>
              </div>

                 {/* user pic and mane */}

                {
                    user ? 
                      <div 
                      onMouseEnter={()=> setShow(true) }
                      onMouseLeave={()=> setShow(false) }
                      className='relative hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center p-1 rounded-md '>
                    {
                        user.photoURL ? 
                        <img className='h-10 w-10 object-cover rounded-xl' src={user.photoURL } alt="" /> 
                        :
                          <CircleUser className=" w-10 h-10 text-black/70 dark:text-white dark:border-gray-700" />
                    }
                    {
                        show && 
                        <div className="absolute bg-white border rounded-md p-2 top-13 -left-20 text-sm font-medium dark:bg-gray-800 dark:text-white">

                         <div className=''>
                             
                              {user.displayName}
                            
                              <span className='block text-xs text-gray-700 dark:text-gray-300'>{user.email}</span>
                             
                         </div>
                         
                        </div>
                    }
                  
               </div> 
               : ""
                }

               {/* mobile buttom */}
                <div className='lg:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5" />
                    </svg>
                </div>
                
             {/* Login and regisratoin button */}
               {
                user ? 
               
               <button onClick={handleSignOut} className="text-sm font-medium text-white transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 hidden lg:flex rounded-md hover:bg-red-700 bg-red-500 ">
                Sign Out
              </button>
               :
                <div className='flex gap-4 items-center shrink-0'>
                
             <NavLink to='/Login' 
             className={({isActive})=>`text-sm font-medium text-black transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 hidden lg:flex rounded-md hover:bg-blue-600
             ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' : 
             '  bg-gray-200 dark:bg-gray-700 dark:text-white'}
             `}>
                Log in
             </NavLink> 

             <NavLink to='/Register' 
             className={({isActive})=>`text-sm font-medium text-black transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 hidden lg:flex rounded-md hover:bg-blue-600
             ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' : 
             '  bg-gray-200 dark:bg-gray-700 dark:text-white'}
             `}>
                Register
             </NavLink> 

             

               </div>
               }

                   </div>
             
             
          </div>
        

          {/* Mobile nav  */}
         
            <div className={`lg:hidden flex w-full justify-center items-center gap-2 pb-4 flex-wrap ${isMenuOpen ? 'block' : 'hidden'}`}>


                   <div className="w-full flex justify-center items-center gap-2 ">
                     {navLinks.map(link => (
                    <NavLink  key={link.path} to={link.path} 
                    className={({isActive})=>`text-md font-medium dark:text-white transition-all duration-200 hover:text-[#0077b6] hover:scale-105  px-3 py-2 rounded-md text-gray-800 
                    
                    ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' :
                     ' '}`}>
                       
                        {link.label}
                       
                    </NavLink>
                     ))}
                     {
                        user &&   (
                        <NavLink  to={"Dashboard/MyOrder"} 
                       className={({isActive})=>`text-md font-medium dark:text-white transition-all duration-200 hover:text-[#0077b6] hover:scale-105  px-3 py-2 rounded-md text-gray-800 
                    
                        ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' :
                     ' '}`}>    
                        Dashboard
                    </NavLink>
                        )

                    }

                   </div>

                 {
                    user ? 
                 <div>
                     <button onClick={handleSignOut} className="flex text-sm font-medium text-white transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 lg:flex rounded-md hover:bg-red-700 bg-red-500 ">
                        Sign Out
                     </button>
                 </div>
                  :
                     <div className='flex gap-4'>
             <NavLink to='/Login' className={({isActive})=>`text-sm font-medium text-black transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 rounded-md hover:bg-blue-600
             ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' : 
             '  bg-gray-200 dark:bg-gray-700 dark:text-white'}
             `}>
                Login
           </NavLink>
           
             <NavLink to='/Register' className={({isActive})=>`text-sm font-medium text-black transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 rounded-md hover:bg-blue-600
             ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' : 
             '  bg-gray-200 dark:bg-gray-700 dark:text-white'}
           
             `}>
                Register
           </NavLink>
                  </div>
                 }
            </div>
        
           
        </nav>
    );
};

export default Navber;