import Header from '@/components/layout/Header'
import ScrollToTop from '@/lib/ScrollToTop';
import React from 'react'
import { Outlet } from 'react-router-dom'

const CartLayout = () => {
  return (
    <div className="w-full min-h-screen md:h-screen flex flex-col md:overflow-y-hidden">
      <div className="flex-none z-50">
        <Header />
      </div>
      {/* <Header /> */}

      <Outlet />
    </div>
  );
}

export default CartLayout