import { formatCurrency } from '@/lib/formatCurrency';
import React from 'react'
import { Link } from 'react-router-dom';

const ResultItemCard = ({ productData, onClose }) => {
  if (!productData) return null;
  const image = productData?.skus?.[0].images?.[0].imageUrl || "https://placehold.co/400x600?text=No+Image";

  return (
    <Link onClick={onClose} to={`/product-detail/${productData?.id}/${productData?.slug}`} className="flex flex-col gap-2 w-full cursor-pointer group">
      <div className="aspect-square overflow-hidden rounded-lg ">
        <img
          src={image}
          alt={productData.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-md font-bold text-neutral-800 hover:text-blue-500 transition-colors truncate" title={productData.name}>
        {productData.name}
      </p>
      <p className="text-md font-bold text-neutral-800">{formatCurrency(productData.basePrice || 0)}</p>
    </Link>
  );
}

export default ResultItemCard;