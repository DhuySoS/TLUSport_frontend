import RenderStars from "@/components/common/RenderStars";
import React from "react";

const LeftContent = ({
  averageRating = 0,
  totalCount = 0,
  selectedRating,
  onRatingSelect,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-800 uppercase tracking-wider">
        Đánh giá <br className="hidden md:block" />
        sản phẩm
      </h2>
      <div className="mt-6  items-center gap-4 hidden md:flex">
        <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
          {averageRating.toFixed(1)}
        </p>
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl">
            <RenderStars rating={Math.round(averageRating)} />
          </div>
          <p className="text-sm sm:text-base text-neutral-500 mt-1">
            {totalCount} đánh giá
          </p>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-neutral-500 text-lg font-semibold mb-5">
          Phân loại xếp hạng
        </p>
        <div className="space-y-3 lg:space-y-6 text-lg lg:text-3xl font-medium text-neutral-900">
          {[...Array(5)].map((_, index) => {
            const star = 5 - index;
            const isSelected = selectedRating === star;
            return (
              <button
                key={index}
                type="button"
                onClick={() => onRatingSelect(star)}
                className="flex items-center gap-3 cursor-pointer select-none w-full"
              >
                <div
                  className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
                    isSelected ? "border-blue-700" : "border-neutral-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-[1px] bg-blue-700 transition-opacity duration-200 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <span>{star}</span>
                <span>
                  <RenderStars rating={star} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-blue-700 font-semibold text-sm lg:text-md mt-4 lg:mt-8">
        Các review đều đến từ khách hàng đã thực sự mua hàng tại TLUSport
      </p>
    </div>
  );
};

export default LeftContent;
