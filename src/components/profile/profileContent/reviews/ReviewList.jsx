import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reviewServices from "@/services/reviewServices";
import { Star } from "lucide-react";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewServices
      .getMyReviews()
      .then((res) => {
        setReviews(res.data?.data?.items || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 w-full">
      <p className="text-2xl sm:text-4xl font-semibold tracking-wide">
        Đánh giá và phản hồi
      </p>

      {loading ? (
        <p className="text-lg font-medium text-neutral-700">
          Đang tải đánh giá...
        </p>
      ) : reviews.length === 0 ? (
        <div className="w-full">
          <p className="text-lg font-medium text-neutral-700">
            Bạn chưa có đánh giá nào...
          </p>
          <div className="w-full flex flex-col items-center mt-10 gap-4">
            <img
              src="/profile/notRated.png"
              alt="0"
              className="w-1/3 object-cover"
            />
            <p className="text-xl font-semibold text-neutral-600 text-center">
              Ý kiến của bạn giúp chúng tôi và cộng đồng mua sắm tốt hơn. <br />{" "}
              Hãy chia sẻ đánh giá đầu tiên!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 sm:p-6 border border-neutral-200 rounded-xl bg-white shadow-sm flex flex-col gap-4 transition-all hover:shadow-md"
            >
              {/* Product Info (except user, since it's current user's profile) */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center border-b border-neutral-100 pb-4">
                <div className="flex gap-4 flex-1 min-w-0">
                  <img
                    src={review.skuImage || review.productImage || "https://placehold.co/60x60?text=No+Image"}
                    alt={review.productName}
                    className="w-16 h-16 object-cover border border-neutral-200 rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-800 truncate">
                      {review.productName}
                    </h4>
                    {review.skuAttributes && review.skuAttributes.length > 0 && (
                      <p className="text-[10px] sm:text-xs text-neutral-500 mt-1">
                        Phân loại:{" "}
                        {review.skuAttributes
                          .map((attr) => `${attr.attributeName}: ${attr.valueName}`)
                          .join(", ")}
                      </p>
                    )}
                    {review.skuPrice && (
                      <p className="text-xs font-semibold text-rose-500 mt-1">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(review.skuPrice)}
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  to={`/product-detail/${review.productId}/${review.productSlug}`}
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-full px-4 py-2 hover:bg-neutral-50 shrink-0 self-start sm:self-auto text-center w-full sm:w-auto"
                >
                  Xem sản phẩm
                </Link>
              </div>

              {/* Review Details */}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-neutral-200 text-neutral-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-500">
                  Ngày đánh giá:{" "}
                  {new Date(review.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-neutral-800 whitespace-pre-wrap text-xs sm:text-sm">
                  {review.comment || "Không có bình luận"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
