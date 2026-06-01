import Header from '@/components/layout/Header';
import ScrollToTop from '@/lib/ScrollToTop';
import React from 'react'
import { Outlet } from 'react-router-dom';

const CheckoutLayout = () => {
  return (
    <div className="w-full min-h-screen ">
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
}

export default CheckoutLayout