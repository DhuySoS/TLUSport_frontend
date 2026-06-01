import React from 'react'
import ProductListCarousel from '../common/ProductListCarousel';
import useRecentlyViewedStore from '@/store/useRecentlyViewedStore';

const ProductViewed = () => {
  const viewedProducts = useRecentlyViewedStore((state) => state.viewedProducts);

  if (!viewedProducts || viewedProducts.length === 0) return null;

  return (
    <div className="my-10 md:my-12 [&_h2]:text-xl [&_h2]:md:text-2xl [&_.carousel-item-element]:md:basis-1/4 [&_.carousel-item-element]:lg:basis-1/5">
      <ProductListCarousel title="Sản phẩm bạn đã xem" products={viewedProducts} />
    </div>
  );
}

export default ProductViewed