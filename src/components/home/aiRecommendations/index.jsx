import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ListProItemCard from "@/components/card/ListProItemCard";
const AiRecommendations = () => {
  return (
    <div className="space-y-15">
      <div className="w-full relative ">
        <img
          src="/banner/productBannerAI.jpg"
          alt="productBanner"
          className="w-full  object-cover object-center aspect-4/3 md:aspect-19/6  "
        />
        <div className="absolute bottom-1/2 left-0 px-15 text-left ">
          <h2 className="text-6xl  font-bold text-gray-900 italic">
            AI <span className="text-blue-500">gợi ý outfit</span> cho bạn
          </h2>
          <p className="text-gray-500 mt-4 text-xl">
            Cá nhân hóa phong cách thể thao theo bạn
          </p>
        </div>
      </div>
      <div className="px-15">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-medium text-neutral-800 ">
            AI gợi ý cho bạn
          </h2>
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
    </div>
  );
}

export default AiRecommendations