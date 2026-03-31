import CategoryCard from '@/components/card/CategoryCard'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const GenderSection = () => {
  return (
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
              className="pl-1 md:pl-2 lg:basis-1/4 xl:basis-1/6 "
            >
              <div className="p-1">
                <CategoryCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  );
}

export default GenderSection