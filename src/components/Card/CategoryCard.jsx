import React from 'react'

const CategoryCard = () => {
  return (
    <div className="w-fit text-center space-y-4">
      <div className="overflow-hidden rounded-2xl text-center ">
        <img
          src="/category/cate_1.jpg"
          alt="CATE"
          className="object-cover object-bottom h-100  hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-xl font-medium mt-2 uppercase">Áo polo</p>
    </div>
  );
}

export default CategoryCard