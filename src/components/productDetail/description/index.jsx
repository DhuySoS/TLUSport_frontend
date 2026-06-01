import React from 'react'
import ProductHighlights from './ProductHighlights'
import ProductRichText from './ProductRichText'

const ProductDescription = ({ productData }) => {
  return (
    <div className='mt-10 md:mt-20 mx-auto px-4 sm:px-12 md:px-20 lg:px-40 py-8 md:py-15' id="description-section">
      <h1 className='text-center text-3xl md:text-5xl font-semibold text-neutral-900 uppercase'>Mô tả sản phẩm</h1>
      <div className='mt-10'>
        <ProductHighlights productData={productData} />
        {productData?.description ? (
          <ProductRichText productData={productData} />
        ) : (
          <p className="text-center text-gray-600 italic">Chưa có mô tả chi tiết cho sản phẩm này.</p>
        )}
      </div>
    </div>
  )
}

export default ProductDescription