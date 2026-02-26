import React, { useContext } from 'react';
import Sidebar from './DBComponents/Sidebar';
import { Outlet } from 'react-router';
import ThemeContext from './Context/CreateContext';

const DashboardLayout = () => {
  const {isClose } = useContext(ThemeContext);
    return (
        <div className='flex min-h-screen'>
            
           {/* Sidebar */}
          <aside className={`w-25 ${isClose ? "lg:w-20" : "lg:w-64"} border border-blue-300 bg-slate-100 dark:bg-slate-900 text-white`}>
            <Sidebar></Sidebar>
          </aside>

           {/* Content */}
          <main className="flex-1 p-6 bg-slate-100 dark:bg-slate-800">
           <Outlet />
          </main>
        </div>
    );
};

export default DashboardLayout;