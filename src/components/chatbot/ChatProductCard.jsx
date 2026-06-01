import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/formatCurrency";
import { useState, useEffect } from "react";
import productServices from "@/services/productServices";

const ChatProductCard = ({ product }) => {
  const [productDetail, setProductDetail] = useState(null);
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await productServices.getProductDetail(product.id);
      setProductDetail(response.data);
      console.log(productDetail);

    }
    fetchProductDetail();
  }, [product]);

  const imageUrl = productDetail?.skus?.[0]?.images?.[0]?.imageUrl || "https://placehold.co/400x400?text=No+Image";
  return (
    <Link
      to={`/product-detail/${product.id}/${product.slug || 'product'}`}
      className="flex flex-col gap-2 w-full group cursor-pointer bg-white border border-neutral-100 rounded-xl p-2 hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-neutral-900 mt-1">
          {formatCurrency(product.base_price || 0)}
        </p>
      </div>
    </Link>
  );
};

export default ChatProductCard;
