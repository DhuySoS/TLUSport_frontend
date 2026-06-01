import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ListProItemCard from '../card/home/ListProItemCard';

const ProductListCarousel = ({ title, products }) => {
  const displayProducts = products || [];

  return (
    <div className="px-4 md:px-8 lg:px-15">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-neutral-800 ">{title}</h2>
      </div>
      {displayProducts?.length > 0 ? (
        <Carousel
          className="w-full "
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1 ">
            {displayProducts.map((product, index) => (
              <CarouselItem
                key={product?.id ? `${product.id}-${index}` : index}
                className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/4 carousel-item-element"
              >
                <div className="p-1">
                  <ListProItemCard productData={product?.id ? product : undefined} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      ) : (
        <p className="text-center text-neutral-500">Không có sản phẩm nào</p>
      )}
    </div>
  );
}

export default ProductListCarousel