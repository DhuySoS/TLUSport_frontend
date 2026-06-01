import React, { useState, useMemo, useEffect } from "react";

const ProductGallery = ({ productData, selectedColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImages = useMemo(() => {
    let images = [];
    if (productData?.skus) {
      const activeSku = selectedColor 
        ? productData.skus.find(sku => sku.attributeValues?.some(attr => attr.attributeId === 3 && attr.valueId === selectedColor))
        : productData.skus[0];
      
      if (activeSku?.images && activeSku.images.length > 0) {
        images = activeSku.images.map(img => img.imageUrl);
      }
    }
    
    if (images.length === 0 && productData?.images && productData.images.length > 0) {
      images = productData.images.map(img => img.imageUrl);
    }
    
    if (images.length === 0) {
      images = ["https://placehold.co/400x600?text=No+Image"];
    }
    return images;
  }, [productData, selectedColor]);

  // Reset index when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [currentImages]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="w-full flex gap-3">
      <div className="w-18 shrink-0 hidden md:flex flex-col gap-2">
        {currentImages.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-full h-22 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-300 ${
              currentIndex === index
                ? "border-neutral-500"
                : "border-transparent hover:border-neutral-300 "
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                currentIndex === index
                  ? "opacity-100  scale-105" 
                  : "opacity-70  hover:opacity-80"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 relative rounded-md overflow-hidden">
        <img
          src={currentImages[0]}
          alt="Placeholder"
          className="w-full h-auto opacity-0 pointer-events-none"
        />

        {currentImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Main Product ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
        <div className="absolute right-0 bottom-0 m-2 flex gap-3 items-center z-20">
          <button
            onClick={handlePrev}
            className="bg-neutral-400/50  p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="bg-neutral-400/50 p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
