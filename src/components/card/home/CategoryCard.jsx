import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  // console.log("category", category);
  return (
    <Link
      to={`/list-products/${category?.slug}`}
      className="w-full text-center space-y-4 cursor-pointer block"
    >
      <div className="overflow-hidden rounded-2xl text-center w-full">
        <img
          src={category?.imageUrl || "/category/cate_1.jpg"}
          alt={category?.name || "CATE"}
          className="object-cover object-bottom w-full h-64 sm:h-72 md:h-80 lg:h-85 hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-sm sm:text-base md:text-lg font-medium mt-2 uppercase text-neutral-800 tracking-wide line-clamp-1">
        {category?.name || "Chưa có tên"}
      </p>
    </Link>
  );
};

export default CategoryCard;
