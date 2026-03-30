import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './app.css'
import App from './App.jsx'
import { router } from './Router/Routes.jsx';
import ThemeProvider from './Context/ThemeProvider.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import DataProvider from './Context/DataProvider.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <AuthProvider>
         <QueryClientProvider client={queryClient}>
            <DataProvider>
             <ThemeProvider>
               <RouterProvider router={router} />,
             </ThemeProvider>
            </DataProvider>
         </QueryClientProvider>
      </AuthProvider>

      
  
  </StrictMode>,
)
