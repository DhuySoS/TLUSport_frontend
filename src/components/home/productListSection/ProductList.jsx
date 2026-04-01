import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ListProItemCard from "@/components/card/ListProItemCard";
const ProductList = () => {
  return (
    <div className="px-15">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-medium text-neutral-800 ">Đồ thể thao</h2>
        <button className="text-sm font-bold text-neutral-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer underline">
          Xem thêm
        </button>
      </div>
      <Carousel
        className="w-full "
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-1 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:pl-2 lg:basis-1/2 xl:basis-1/4 "
            >
              <div className="p-1">
                <ListProItemCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductList;
