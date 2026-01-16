
import './App.css'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';


import {  RouterProvider } from 'react-router-dom'
import { router } from './Routing/AppRoutes'
import AuthContextProvider from './components/Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toast } from 'flowbite-react'



function App() {
 
const queryClient = new QueryClient()
  return (
    <>
 <QueryClientProvider client={queryClient}>
     <AuthContextProvider>
<RouterProvider router={router}/>
      <Toaster position="top-right" richColors />
<ReactQueryDevtools/>
    </AuthContextProvider>
 </QueryClientProvider>
      
   
    </>
  )
}

export default App
