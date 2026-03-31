import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate } from "react-router";


const axiosSecure = axios.create({
  baseURL: "https://librisgo.vercel.app",
});

const useSecure = () => {
  const { user, signOut } = useContext(AuthContext);
//   const navigate = useNavigate();

  useEffect(() => {
   
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

   
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          signOut().then(() => {
            Navigate("/Login")
          
          });
        }

        return Promise.reject(error);
      }
    );

 
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOut]);

  return axiosSecure;
};

export default useSecure;