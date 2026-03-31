import { NavLink } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { Book, Heart, LayoutDashboardIcon, Library, MoveRightIcon, Plus, ReceiptIcon, ShoppingBag, ShoppingBagIcon, User, User2, X } from "lucide-react";
import { useContext, useEffect } from "react";
import ThemeContext from "../Context/CreateContext";
import { useQuery } from "@tanstack/react-query";
import useSecure from "../Hooks/useSecure";


const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { isClose, setIsClose } = useContext(ThemeContext);
 

  const secure = useSecure();
  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await secure.get("/Role");
      return res.data;
    },
    enabled: !!user,
  });

 



  const userDB = [
    { path: "/dashboard/profile", label: "My Profile", icon: <User /> },
    { path: "/dashboard/MyOrder", label: "My Order", icon: <ShoppingBag /> },
    { path: "/dashboard/Invoices", label: "Invoices", icon: <ReceiptIcon /> },
    { path: "/dashboard/MyWishlist", label: "My Wishlist", icon: <Heart /> },
  ];

  const librarianDB = [
    { path: "/dashboard/AddBooks", label: "Add New", icon: <Plus /> },
    { path: "/dashboard/MyBooks", label: "My Books", icon: <Book /> },
    { path: "/dashboard/Order", label: "Order", icon: <ShoppingBagIcon /> },
    { path: "/dashboard/profile", label: "My Profile", icon: <User /> },
  ];

  const adminDB = [
    { path: "/dashboard/AllUsers", label: "All Users", icon: <User2 /> },
    { path: "/dashboard/ManageBooks", label: "Manage Books", icon: <Library /> },
    { path: "/dashboard/profile", label: "My Profile", icon: <User /> },
  ];

  let menu = userDB;

  if (role === "admin") {
    menu = adminDB;
  } else if (role === "librarian") {
    menu = librarianDB;
  }

  if (isLoading) {
    return <span className="loading loading-ring loading-2xl"></span>;
  }

  return (
    <nav className="flex flex-col">
      {/* Toggle Button */}
      <div className="hidden md:flex justify-end border-b border-blue-300">
        <button
          className="px-2 py-3 hover:bg-slate-200 rounded-lg"
          onClick={() => setIsClose(!isClose)}
        >
          {isClose ? <MoveRightIcon /> : <X />}
        </button>
      </div>

      {/* User Info */}
      {!isClose && (
        <div className="border-b border-blue-300 p-4">
          <div className="rounded-xl bg-gray-500 dark:bg-blue-500/50 p-3">
            <div className="flex items-center gap-2 text-white">
              <LayoutDashboardIcon />
              <div>
                <h1 className="font-semibold capitalize">
                  {role} Dashboard
                </h1>
                <p className="text-sm">{user?.displayName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="space-y-3 p-4">
        {menu.map((links) => (
          <NavLink
            key={links.label}
            to={links.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg border-b
              ${isActive
                ? "bg-blue-600 text-white"
                : "text-black dark:text-white"
              }
              hover:bg-amber-300`
            }
          >
            <div className="hidden md:block">{links.icon}</div>
            {!isClose && <span>{links.label}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;