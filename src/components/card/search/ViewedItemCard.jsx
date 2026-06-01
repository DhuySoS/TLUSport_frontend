import React from "react";
import { Link } from "react-router-dom";

const ViewedItemCard = ({ productData }) => {
  if (!productData) {
    return (
      <div className="flex flex-col gap-2 w-full animate-pulse">
        <div className="aspect-square overflow-hidden rounded-lg bg-neutral-200"></div>
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
      </div>
    );
  }

  const imageUrl = productData?.skus?.[0]?.images?.[0]?.imageUrl || "/cart/example.jpg";

  return (
    <Link to={`/product-detail/${productData.id}/${productData.slug}`} className="flex flex-col gap-2 w-full group cursor-pointer">
      <div className="aspect-square overflow-hidden rounded-lg ">
        <img
          src={imageUrl}
          alt={productData.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-sm font-medium text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2" title={productData.name}>
        {productData.name}
      </p>
    </Link>
  );
};

export default ViewedItemCard;
