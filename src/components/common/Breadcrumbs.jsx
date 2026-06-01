import { slugify } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ productData }) => {
  if (!productData) return <div className="py-4"></div>;

  return (
    <div className="py-4  gap-2 text-sm text-neutral-500 font-medium hidden md:flex">
      <Link to="/" className="hover:text-neutral-900 transition-colors">
        Trang chủ
      </Link>
      <span>/</span>
      {productData.categoryName && (
        <Link
          to={`/list-products/${slugify(productData.categoryName)}`}
          className="hover:text-neutral-900 transition-colors cursor-pointer"
        >
          {productData.categoryName}
          <span>/</span>
        </Link>
      )}
      <span className="text-neutral-900">{productData.name}</span>
    </div>
  );
};

export default Breadcrumbs;
