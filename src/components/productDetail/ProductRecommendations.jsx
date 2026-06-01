import React from 'react'

import ProductListCarousel from '../common/ProductListCarousel';
const ProductRecommendations = ({ products }) => {
  return (
    <div className="my-10 md:my-12">
      <ProductListCarousel title="Gợi ý sản phẩm" products={products} />
    </div>
  );
}

export default ProductRecommendations