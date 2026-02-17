import React, { useContext } from 'react';
import ThemeContext from '../Context/CreateContext';
import { Link, NavLink } from 'react-router';

const Navber = () => {
    const {theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    }
    const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/dashboard', label: 'Dashboard' }
  ];

    return (
        <nav className='lg:flex sticky top-0 z-50 w-full max-w-full overflow-hidden mx-auto bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>

          <div className='flex items-center justify-between w-full lg:px-10 lg:py-4 px-4 py-3  min-w-0'>
             
             {/* logo */}
             <div className='flex gap-4 items-center shrink-0'>
                        <Link to='/' className='flex items-center gap-4 group'>
                            <div className=''>
                                <img src='https://i.ibb.co.com/sdDsNMSx/download.jpg' className='w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-md text-white '/>
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
                    className={({isActive})=>`text-md font-medium dark:text-white transition-all duration-200 hover:text-[#0077b6] hover:scale-105  px-3 py-2 rounded-md 
                    
                    ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' :
                     'bg-white dark:bg-gray-800'}`}>
                       
                        {link.label}
                       
                    </NavLink>
                ))}
                </div>
              



            {/* theme button */}
            <div className='flex items-center gap-2 shrink-0'>
            <div onClick={ 
                () => {
                    toggleTheme();
                }} 
            className="relative  bg-gray-300   w-12 h-7 border-2 border-gray-500 rounded-l-2xl rounded-r-2xl cursor-pointer p-2">

                <div className={`absolute -top-3 -left-3 w-12 h-12 rounded-full 
                  flex items-center justify-center transition-transform duration-500 ease-in-out
                      ${theme === "light" ? "translate-x-5" : "translate-x-0"}`}>

                    {
                        theme === "light" ? "☀️" : "🌙"
                    }      
                
                </div>

               
                 
                <div>

                </div>
            </div>

            {/* Login and regisratoin button */}
             <NavLink to='/login' className={({isActive})=>`text-sm font-medium text-white transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 rounded-md hover:bg-blue-600
             ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' : 
             'bg-blue-800 dark:bg-blue-500 dark:text-white'}
             `}>
                Login
             </NavLink>

             <NavLink to='/register' className={({isActive})=>`text-sm font-medium text-black transition-all duration-200 hover:text-white hover:scale-105  px-3 py-2 rounded-md hover:bg-blue-600
             ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' : 
             '  bg-gray-200 dark:bg-gray-700 dark:text-white'}
             `}>
                Register
             </NavLink>
            
            </div>



          </div>
        

          {/* Mobile nav  */}
         
                     <div className='lg:hidden flex w-full justify-center items-center gap-2 p-2 flex-wrap'>
                    {navLinks.map(link => (
                    <NavLink  key={link.path} to={link.path} 
                    className={({isActive})=>`text-md font-medium dark:text-white transition-all duration-200 hover:text-[#0077b6] hover:scale-105  px-3 py-2 mb-2 rounded-md 
                    
                    ${isActive ? 'Primary-btn hover:text-white text-white rounded-md' :
                     'bg-white dark:bg-gray-800'}`}>
                       
                        {link.label}
                       
                    </NavLink>
                ))}
                </div>
        
           
        </nav>
    );
};

export default Navber;