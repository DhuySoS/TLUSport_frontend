import Header from '@/components/layout/Header';
import React from 'react'
import { Outlet } from 'react-router-dom';

const CheckoutLayout = () => {
  return (
    <div className="w-full min-h-screen ">
      <Header />
      <Outlet />
    </div>
  );
}

export default CheckoutLayout