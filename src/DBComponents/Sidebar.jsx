import { NavLink } from "react-router";
// import { use } from "react";
import { AuthContext } from "../Context/AuthProvider";

const Sidebar = () => {
//   const { user } = use(AuthContext);
//   const role = user?.role;

  return (
    <nav className="flex flex-col gap-2 p-4">

      <NavLink to="/dashboard/MyOrder">My Order</NavLink>
      <NavLink to="/dashboard/profile">My Profile</NavLink>
      <NavLink to="/dashboard/Invoices">Invoices</NavLink>
      <NavLink to="/dashboard/MyWishlist">My Wishlist</NavLink>

      {/* {role === "admin" && (
        <>
          <NavLink to="/dashboard/admin">Admin Home</NavLink>
          <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
        </>
      )}

      {role === "moderator" && (
        <NavLink to="/dashboard/settings">Settings</NavLink>
      )} */}

    </nav>
  );
};

export default Sidebar;