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
import PaySuccess from "../Pages/PaySuccess";
import PayCancle from "../Pages/PayCancle";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    hydrateFallbackElement: <Load></Load>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "Details/:id", element: <SingleBook /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "Payment/:i", element: ( <PrivateRoute><Payment /></PrivateRoute> ) },
      { path: "PaySuccess", element: <PaySuccess/>  },
      { path: "PayCancle", element: <PayCancle/>  },
      
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
             <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <PrivateRoute><Profile/></PrivateRoute>  },
          { path: "/dashboard/profile", element: <PrivateRoute><Profile/></PrivateRoute> },
          { path: "/dashboard/MyOrder", element: <PrivateRoute><MyOrder/></PrivateRoute> },
          { path: "/dashboard/Invoices", element: <PrivateRoute><Invoices/></PrivateRoute> },
          { path: "/dashboard/MyWishlist", element: <PrivateRoute><MyWishlist/></PrivateRoute> },
          { path: "/dashboard/AddBooks", element: <PrivateRoute><AddBooks/></PrivateRoute> },
          { path: "/dashboard/AllUsers", element: <PrivateRoute><AllUsers/></PrivateRoute> },
          { path: "/dashboard/ManageBooks", element: <PrivateRoute><ManageBooks/></PrivateRoute> },
          { path: "/dashboard/MyBooks", element: <PrivateRoute><MyBooks/></PrivateRoute> },
          { path: "/dashboard/Order", element: <PrivateRoute><Order/></PrivateRoute> },
        ],
      },
    ],
    
  },
    

]);