import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ListProItemCard from "@/components/card/home/ListProItemCard";
import { Link } from "react-router-dom";
const ProductList = ({ products }) => {

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-15">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-800">{products.title}</h2>
        {/* <Link
          to={"/list-products"}
          className="text-sm font-bold text-neutral-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer underline"
        >
          Xem thêm
        </Link> */}
      </div>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2">
          {products?.items?.map((product, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <ListProItemCard productData={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default ProductList;
