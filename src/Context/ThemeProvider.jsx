import React, { useEffect, useState } from 'react';
import ThemeContext from './CreateContext';

const ThemeProvider = ({ children }) => {

    const [isClose , setIsClose] = useState(false)


    const [theme ,setTheme] = useState(()=>{
        return localStorage.getItem("theme") || "light"
    });

    useEffect(()=>{
        const html = document.documentElement;
    if (theme === "dark"){
        html.classList.add("dark");
    } else{
        html.classList.remove("dark");
    }

    localStorage.setItem( "theme" , theme )

    },[theme])


    const themeInfo = {
        theme,
        setTheme,
        isClose,
        setIsClose,
    }
    return (
        <ThemeContext.Provider value={themeInfo}>
                {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;