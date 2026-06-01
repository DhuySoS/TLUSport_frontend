import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import reviewServices from "@/services/reviewServices";

const PAGE_SIZE = 5;

const ProductReviews = ({ averageRating = 0, totalCount = 0 }) => {
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    reviewServices
      .getReviewsByProduct(productId, page, PAGE_SIZE)
      .then((res) => {
        const apiResponse = res.data;
        const data = apiResponse.data || {};
        setReviews(data.items ?? []);
        setTotalPages(data.totalPage ?? 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId, page]);

  const handleRatingSelect = (rating) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews;

  return (
    <div className="px-4 md:px-8 lg:px-20 py-10 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="w-full lg:basis-1/5 lg:sticky lg:top-45 lg:self-start">
          <LeftContent
            averageRating={averageRating}
            totalCount={totalCount}
            selectedRating={selectedRating}
            onRatingSelect={handleRatingSelect}
          />
        </div>
        <div className="flex-1">
          <RightContent
            reviews={filteredReviews}
            averageRating={averageRating}
            totalCount={totalCount}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
