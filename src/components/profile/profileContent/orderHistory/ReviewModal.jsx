import React, { useState, useEffect } from "react";
import { Star, Camera, Video, HelpCircle } from "lucide-react";
import reviewServices from "@/services/reviewServices";
import { toast } from "sonner";

const ReviewModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const [reviews, setReviews] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (order && order.items) {
      const initial = {};
      order.items.forEach((item) => {
        initial[item.orderItemId] = {
          productId: item.productId,
          orderItemId: item.orderItemId,
          rating: 5,
          comment: "",
        };
      });
      setReviews(initial);
    }
  }, [order]);

  const handleRatingChange = (orderItemId, rating) => {
    setReviews((prev) => ({
      ...prev,
      [orderItemId]: { ...prev[orderItemId], rating },
    }));
  };

  const handleCommentChange = (orderItemId, comment) => {
    setReviews((prev) => ({
      ...prev,
      [orderItemId]: { ...prev[orderItemId], comment },
    }));
  };
  const getRatingText = (rating) => {
    switch (rating) {
      case 5:
        return "Tuyệt vời";
      case 4:
        return "Tốt";
      case 3:
        return "Bình thường";
      case 2:
        return "Kém";
      case 1:
        return "Rất kém";
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const reviewPromises = Object.values(reviews).map(
        (reviewData) =>
          reviewServices.createReview({
            productId: reviewData.productId,
            orderItemId: reviewData.orderItemId,
            rating: reviewData.rating,
            comment: reviewData.comment,
          }),
      );

      await Promise.all(reviewPromises);
      toast.success("Đã gửi đánh giá thành công!", {
        position: "top-right",
      });
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      toast.error(
        "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.",
        {
          position: "top-right",
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="bg-white w-full max-w-3xl rounded shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-xl font-medium text-neutral-800">
            Đánh Giá Sản Phẩm
          </h2>
        </div>

        <div className="overflow-y-auto bg-neutral-50 flex-1 p-6 space-y-6">
          {order.items.map((item, index) => {
            const currentReview = reviews[item.orderItemId] || {
              rating: 5,
              comment: "",
            };

            return (
              <div
                key={index}
                className="bg-white p-6 rounded shadow-sm border border-neutral-100"
              >
                <div className="flex gap-4 mb-6">
                  <img
                    src={
                      item.imageUrl ||
                      "https://placehold.co/100x100?text=No+Image"
                    }
                    alt={item.productName}
                    className="w-14 h-14 border border-neutral-200 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-neutral-800 line-clamp-2">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Phân loại hàng: Mặc định
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <span className="text-sm text-neutral-700 w-32">
                    Chất lượng sản phẩm
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          handleRatingChange(item.orderItemId, star)
                        }
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star
                          size={28}
                          className={
                            star <= currentReview.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-neutral-200 text-neutral-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-yellow-500">
                    {getRatingText(currentReview.rating)}
                  </span>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 p-4">
                  <textarea
                    className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm text-neutral-700 h-28 placeholder:text-neutral-400 outline-none"
                    placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                    value={currentReview.comment}
                    onChange={(e) =>
                      handleCommentChange(item.orderItemId, e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-neutral-200 bg-white flex justify-end items-center gap-6">
          <button
            onClick={onClose}
            className="text-sm text-neutral-600 hover:text-neutral-900 uppercase"
          >
            Trở lại
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-[#EE4D2D] text-white text-sm font-medium rounded-sm hover:bg-[#D73211] uppercase transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Đang gửi..." : "Hoàn thành"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
