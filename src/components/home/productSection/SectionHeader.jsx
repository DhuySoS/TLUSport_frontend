import { Button } from '@/components/ui/button';
import React from 'react'

const SectionHeader = () => {
  return (
    <div className="w-full relative ">
      <img
        src="/banner/productBanner-1.jpg"
        alt="productBanner"
        className="w-full  object-cover object-center aspect-4/3 md:aspect-19/6  "
      />
      <div className="absolute bottom-18 left-0 px-15 text-left ">
        <h2 className="text-6xl  font-bold text-white">
          Đồ thể thao
        </h2>
        <Button className=" bg-white text-neutral-900 p-8 text-xl font-semibold rounded-4xl mt-4 cursor-pointer hover:bg-neutral-200 transition-colors duration-300">
          Mua ngay
        </Button>
      </div>
    </div>
  );
}

export default SectionHeader