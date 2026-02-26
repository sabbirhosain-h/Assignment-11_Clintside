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


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    hydrateFallbackElement: <Load></Load>,
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
      { path: "singleBook", element: <SingleBook /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
             <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <MyOrder/>  },
          { path: "/dashboard/profile", element: <Profile/> },
          { path: "/dashboard/MyOrder", element: <MyOrder/> },
          { path: "/dashboard/Invoices", element: <Invoices/> },
          { path: "/dashboard/MyWishlist", element: <MyWishlist/> },
        ],
      },
    ],
  },
]);