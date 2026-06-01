import RenderStars from "@/components/common/RenderStars";
import React from "react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const ReviewItem = ({ review }) => {
  const initial = review.userName
    ? review.userName.charAt(0).toUpperCase()
    : "K";

  return (
    <div className="bg-white px-8 py-6 rounded-2xl space-y-4 shadow-sm border border-neutral-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 text-sm border border-neutral-200">
            {initial}
          </div>
          <div>
            <p className="text-lg font-bold text-neutral-900">
              {review.userName || "Khách hàng"}
            </p>
            <p className="text-xs text-neutral-400">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        <div className="text-sm">
          <RenderStars rating={review.rating} />
        </div>
      </div>

      {review.skuAttributes && review.skuAttributes.length > 0 && (
        <p className="text-xs text-neutral-500">
          Phân loại:{" "}
          {review.skuAttributes
            .map((attr) => `${attr.attributeName}: ${attr.valueName}`)
            .join(", ")}
        </p>
      )}

      {review.comment && (
        <p className="text-base font-medium text-neutral-800 whitespace-pre-wrap">
          {review.comment}
        </p>
      )}
    </div>
  );
};

export default ReviewItem;
