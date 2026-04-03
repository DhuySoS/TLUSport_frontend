import Header from '@/components/layout/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const CartLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="flex-none z-50">
        <Header />
      </div>
      <hr className="bg-neutral-200 w-full flex-none" />
      <Outlet />
    </div>
  );
}

export default CartLayout