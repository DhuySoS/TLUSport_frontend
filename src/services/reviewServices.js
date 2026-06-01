import axiosInstance from "./axiosInstance";

const reviewServices = {
  getReviewsByProduct: (productId, page = 1, size = 5) =>
    axiosInstance.get(`/reviews/product/${productId}`, {
      params: { page, size },
      headers: { skipAuth: true },
    }),
  getAverageRating: (productId) =>
    axiosInstance.get(`/reviews/product/${productId}/average-rating`, {
      headers: { skipAuth: true },
    }),
  getReviewCount: (productId) =>
    axiosInstance.get(`/reviews/product/${productId}/count`, {
      headers: { skipAuth: true },
    }),
  createReview: (data) =>
    axiosInstance.post(`/reviews`, data),
  getMyReviews: (page = 1, size = 10) =>
    axiosInstance.get(`/reviews/my-reviews`, {
      params: { page, size },
    }),
};

export default reviewServices;
