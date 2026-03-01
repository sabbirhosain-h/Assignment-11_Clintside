import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { Book, Heart, LayoutDashboardIcon, Library, MoveRightIcon, Plus, ReceiptIcon, ShoppingBag, ShoppingBagIcon, User, User2, X } from "lucide-react";
import { useContext  } from "react";
import ThemeContext from "../Context/CreateContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  
//   const role = user?.role;
  const {isClose , setIsClose} = useContext(ThemeContext);

  const Userdashboard = [
    { path: "/dashboard/MyOrder" , label: "My Order" , icon: <ShoppingBag/>},
    { path: "/dashboard/profile" , label: "My Profile", icon: <User/>  },
    { path: "/dashboard/Invoices" , label: "Invoices", icon: <ReceiptIcon/>  },
    { path: "/dashboard/MyWishlist" , label: "My Wishlist", icon: <Heart/>  },
    { path: "/dashboard/AddBooks" , label: "Add New", icon: <Plus/>  },
    { path: "/dashboard/AllUsers" , label: "All Users", icon: <User2/>  },
    { path: "/dashboard/ManageBooks" , label: "Manage Books", icon: <Library/>  },
    { path: "/dashboard/MyBooks" , label: "My Books", icon: <Book/>  },
    { path: "/dashboard/Order" , label: "Order", icon: <ShoppingBagIcon/>  },
  ];

  const librarian = [
      { path: "/dashboard/AddBooks" , label: "Add New", icon: <Plus/>  },
      { path: "/dashboard/MyBooks" , label: "My Books", icon: <Book/>  },
      { path: "/dashboard/Order" , label: "Order", icon: <ShoppingBagIcon/>  },
      { path: "/dashboard/profile" , label: "My Profile", icon: <User/>  },
      
  ];
  const admin = [
    { path: "/dashboard/AllUsers" , label: "All Users", icon: <User2/>  },
    { path: "/dashboard/ManageBooks" , label: "Manage Books", icon: <Library/>  },
    { path: "/dashboard/profile" , label: "My Profile", icon: <User/>  },
  ];

  const close = () => {
      setIsClose(!isClose)
  };
  return (
    <nav className="flex flex-col">

      <div className="hidden md:flex   justify-end border-b border-blue-300">
        <button className="px-2 py-3 hover:bg-slate-200 hover:text-black rounded-lg text-black dark:text-white" onClick={close}>
         {
          isClose ? 
          <MoveRightIcon></MoveRightIcon> 
          :
          <X/> 
         }
      </button>
      </div>

         {/* dashboard user info */}
         <div className={isClose ? "hidden" : "border-b border-blue-300 p-4"}>
            <div className="hidden md:flex rounded-xl bg-gray-500 dark:bg-blue-500/50 border-blue-300">
               <div className="flex justify-center items-center px-3 py-2 gap-2 text-blue-600">
                  <div>
                    <LayoutDashboardIcon />
                   </div>

                   <div>
                      <h1 className="text-white font-semibold">User Dashboard</h1>
                      <h1 className="text-md text-white font-light">
                        {user.displayName}
                     </h1>
                   </div>
                 </div>
             </div>
         </div>

      <div className="space-y-3 p-4">
        {
        Userdashboard.map((links)=> (
          <NavLink key={links.label} className={({isActive})=>`text-black dark:text-white flex items-center gap-3 border-b px-3 py-3 rounded-lg ${isActive ? "bg-blue-600 hover:bg-blue-500 text-white" : ""} hover:bg-amber-300` } to={links.path}>

           <div className="hidden md:block">
             {links.icon}
           </div>

            <div className={`block lg:${isClose ? "hidden" : "block"} `}>
              {links.label}
           </div>

          </NavLink>
        ))
      }
      </div>

      

    </nav>
  );
};

export default Sidebar;