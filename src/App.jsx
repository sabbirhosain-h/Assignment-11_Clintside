import { Outlet } from 'react-router'
import './App.css'
import Navber from './Home/Navber';
import Footer from './Home/Footer';


function App() {
 

  return (
    <>
     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
     </div>
    </>
  )
}

export default App;
