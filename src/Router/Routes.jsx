import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Home/Home";
import Books from "../Pages/Books";
import SingleBook from "../Pages/SingleBook";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <h1>404 Not Found</h1>,
    children:[
        { index: true,
          Component: Home
        },
        {
          path: "/books",
          Component: Books
        },
        {
          path: "/SingleBook",
          Component: SingleBook
        },
        {
          path: "Dashboard",
          element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
        },
        {
          path: "/Login",
          Component: Login
        },
        {
          path: "/Register",
          Component: Register
        }
    ]
  },
]);