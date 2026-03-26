import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MasterLayout = () => {
  return (
    <div className='w-full min-h-screen'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MasterLayout