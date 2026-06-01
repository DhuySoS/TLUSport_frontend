import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryCard from '@/components/card/home/CategoryCard';

const GenderSection = ({ categories = [] }) => {
  if (!categories || categories.length === 0) {
    return <div className="text-center py-10 text-neutral-500">Chưa có danh mục nào</div>;
  }

  return (
      <Carousel
        className="w-full "
        opts={{
          align: "start", 
          loop: categories.length > 4, // Chỉ loop khi số lượng item đủ lớn
        }}
      >
        <CarouselContent className="-ml-1 ">
          {categories.map((category, index) => (
            <CarouselItem
              key={category.id || index}
              className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/6"
            >
              <div className="p-1">
                <CategoryCard category={category} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
  );
}

export default GenderSection