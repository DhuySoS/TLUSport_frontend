import AiRecommendations from '@/components/home/aiRecommendations'
import BannerSection from '@/components/home/BannerSection'
import CategorySection from '@/components/home/categorySection/CategorySection'
import ProductSection from '@/components/home/productListSection'
import TestimotionSection from '@/components/home/testimonialSection'
import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen space-y-15 bg-neutral-100 pb-15">
      <BannerSection />
      <CategorySection />
      <ProductSection />
      <AiRecommendations/> 
      <TestimotionSection/>
    </div>
  );
}

export default HomePage