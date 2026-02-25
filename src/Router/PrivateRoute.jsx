import React, {  useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation, } from 'react-router';


const PrivateRoute = ({ children }) => {
    const { user, Loading } =  useContext(AuthContext);
    const location = useLocation();
    localStorage.setItem(
      "redirectAfterLogin",
       location.pathname 
    );
    
    const from = location.state?.from?.pathname || localStorage.getItem("redirectAfterLogin") || "/";
    if(Loading){
        <div>
            loading.....
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to={from}></Navigate>
};

export default PrivateRoute;