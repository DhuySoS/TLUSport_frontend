import BannerSection from '@/components/home/BannerSection'
import CategorySection from '@/components/home/categorySection/CategorySection'
import ProductSection from '@/components/home/productSection'
import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen space-y-15 bg-neutral-100">
      <BannerSection />
      <CategorySection />
      <ProductSection />
    </div>
  );
}

export default HomePage