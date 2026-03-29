import BannerSection from '@/components/home/BannerSection'
import CategorySection from '@/components/home/categorySection/CategorySection'
import React from 'react'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <BannerSection/>
      <CategorySection/>
    </div>
  )
}

export default HomePage