import React, { useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import bannerServices from "@/services/bannerServices";

const BannerSection = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await bannerServices.getActiveBanners("HOME_MAIN");
        if (res && res.data) {
          setBanners(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải banner:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const renderBannerItem = (banner) => {
    const content = (
      <div className="w-full h-62.5 sm:h-100 md:h-125 lg:h-[calc(100vh-80px)] lg:min-h-150 overflow-hidden relative group">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10 pointer-events-none"></div>
        <img
          src={banner.imageUrl}
          alt={banner.title || "Banner"}
          className="w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
        />
      </div>
    );

    return banner.targetUrl ? (
      <Link to={banner.targetUrl} className="block w-full h-full">
        {content}
      </Link>
    ) : (
      content
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-62.5 sm:h-100 md:h-125 lg:h-[calc(100vh-80px)] lg:min-h-150 bg-neutral-200 animate-pulse" />
    );
  }

  if (banners.length === 0) return null;

  return (
    <div className="w-full h-full">
      <Carousel className="w-full h-full relative" plugins={[plugin.current]}>
        <CarouselContent className="h-full w-full">
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="h-full w-full">
              {renderBannerItem(banner)}
            </CarouselItem>
          ))}
        </CarouselContent>
        {banners.length > 1 && (
          <>
            <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BannerSection;
