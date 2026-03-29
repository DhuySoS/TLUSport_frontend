import React, { useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
const BannerSection = () => {
    const plugin = useRef(
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true, 
      }),
    );
  return (
    <div className="w-full h-full">
      <Carousel className="w-full h-full relative " plugins={[plugin.current]}>
        <CarouselContent className="h-full w-full ">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index} className="h-full w-full ">
              <div className="w-full  xl:h-[80vh] lg:h-[65vh]  overflow-hidden">
                <img
                  src={`/banner/banner-${index + 1}.jpg`}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover  transition-transform duration-700
                    scale-105 hover:scale-100"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}

export default BannerSection