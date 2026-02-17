import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Home/Home";


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
          Component: () => <h1>Books Page</h1>
        },
        {
          path: "/Login",
          Component: () => <h1>Login Page</h1>
        }
    ]
  },
]);