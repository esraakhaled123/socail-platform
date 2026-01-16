

import React from 'react'
import { Outlet } from 'react-router-dom'
import image from '../../assets/images/Mobile login-amico.png'
export default function AuthLayout() {
  return <>
 <section className="flex items-center min-h-screen">
  {/* Image */}
  <div className=" hidden flex-1 md:flex justify-center">
    <img
      src={image}
      className="max-w-full"
      alt="join us"
    />
  </div>

  {/* Outlet */}
  <div className="flex-2">
    <Outlet />
  </div>
</section>

  </>
}
