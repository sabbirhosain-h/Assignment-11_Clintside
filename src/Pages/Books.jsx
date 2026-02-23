import React from 'react';
import { useLocation } from 'react-router';


const Books = () => {
    const location = useLocation();
   
    localStorage.setItem(
      "redirectAfterLogin",
       location.pathname 
    );
    return (
        <div>
           Books Page
        </div>
    );
};

export default Books;