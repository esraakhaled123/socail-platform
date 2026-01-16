import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import AppFooter from '../footer/Footer'
import AppNavbar from '../Navbar/Navbar'


import { Offline, Online } from "react-detect-offline";
import { Toast, ToastToggle } from 'flowbite-react'
import { HiCheck, HiX } from 'react-icons/hi'



export default function Layout() {
  return (
    <main className='bg-gray-900 dark:text-gray-100 capitalize '>
    <AppNavbar/>
     

    <div className=' min-h-screen'>
       <div>
    <Online > 
   <Toast className='fixed top-30 right-20'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal"> you're online.</div>
        <ToastToggle />
      </Toast>
      </Online>
    <Offline> 
       <Toast className='fixed top-24 right-10'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal"> you're offline</div>
        <ToastToggle />
      </Toast>
      </Offline>
  </div>
  <Outlet/>  
    </div>
                 
    <AppFooter/>
    </main>
  )
}
