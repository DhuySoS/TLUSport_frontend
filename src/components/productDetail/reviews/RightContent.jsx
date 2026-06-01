import React from "react";
import RenderStars from "@/components/common/RenderStars";
import ReviewItem from "./ReviewItem";

const RightContent = ({
  reviews = [],
  averageRating = 0,
  totalCount = 0,
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
}) => {
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center">
        <p className="text-5xl lg:text-8xl">{averageRating.toFixed(1)}</p>
        <div className="space-y-1 text-3xl lg:text-6xl">
          <RenderStars rating={Math.round(averageRating)} />
          <p className="text-sm lg:text-xl font-medium text-neutral-500">
            Dựa trên {totalCount} đánh giá đến từ khách hàng
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {loading ? (
          <p className="text-neutral-500 text-lg">Đang tải đánh giá...</p>
        ) : reviews.length === 0 ? (
          <p className="text-neutral-500 text-lg">Chưa có đánh giá nào.</p>
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onPageChange(i + 1)}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                page === i + 1
                  ? "bg-blue-700 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightContent;
