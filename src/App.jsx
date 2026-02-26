import { Outlet } from 'react-router'
import './App.css'
import Navber from './Home/Navber';
import Footer from './Home/Footer';
import { Toaster } from 'react-hot-toast';


function App() {
 

  return (
    <>
     <div className="min-h-screen bg-gray-100 dark:bg-black/50">
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster />
     </div>
    </>
  )
}

export default App;
