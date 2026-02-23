import React, {  useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { useLocation, useNavigate } from 'react-router';


const PrivateRoute = ({ children }) => {
    const { user, Loading } =  useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    localStorage.setItem(
      "redirectAfterLogin",
       location.pathname 
    );
    
    const from = location.state?.from?.pathname || localStorage.getItem("redirectAfterLogin") || "/";
    
    if (user) {
        return children;
    }
    return navigate(from, { replace: true });
};

export default PrivateRoute;