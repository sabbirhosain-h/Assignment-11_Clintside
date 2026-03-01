import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Home/Home";
import Books from "../Pages/Books";
import SingleBook from "../Pages/SingleBook";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../DashboardLayout"; 
import Profile from "../Pages/DashboardPages/Profile";
import MyOrder from "../Pages/DashboardPages/MyOrder";
import Invoices from "../Pages/DashboardPages/Invoices";
import MyWishlist from "../Pages/DashboardPages/MyWishlist";
import Load from "../Pages/Load";
import Error from "./Error";
import AddBooks from "../Pages/DashboardPages/AddBooks";
import AllUsers from "../Pages/DashboardPages/AllUsers";
import ManageBooks from "../Pages/DashboardPages/ManageBooks";
import MyBooks from "../Pages/DashboardPages/MyBooks";
import Order from "../Pages/DashboardPages/Order";
import Payment from "../Pages/Payment";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    hydrateFallbackElement: <Load></Load>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "SingleBook", element: <SingleBook /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "Payment", element: <Payment /> },
      
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
             <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Profile/>  },
          { path: "/dashboard/profile", element: <Profile/> },
          { path: "/dashboard/MyOrder", element: <MyOrder/> },
          { path: "/dashboard/Invoices", element: <Invoices/> },
          { path: "/dashboard/MyWishlist", element: <MyWishlist/> },
          { path: "/dashboard/AddBooks", element: <AddBooks/> },
          { path: "/dashboard/AllUsers", element: <AllUsers/> },
          { path: "/dashboard/ManageBooks", element: <ManageBooks/> },
          { path: "/dashboard/MyBooks", element: <MyBooks/> },
          { path: "/dashboard/Order", element: <Order/> },
        ],
      },
    ],
  },
]);