import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './app.css'
import App from './App.jsx'
import { router } from './Router/Routes.jsx';
import ThemeProvider from './Context/ThemeProvider.jsx';
import AuthProvider from './Context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
       <AuthProvider>
        <RouterProvider router={router} />,
       </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
