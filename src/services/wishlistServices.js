import axiosInstance from "./axiosInstance";

const wishlistServices = {
  getWishlist: (page = 1, size = 50) =>
    axiosInstance.get("/wishlist", { params: { page, size } }),

  addToWishlist: (productId) =>
    axiosInstance.post(`/wishlist/${productId}`),

  removeFromWishlist: (productId) =>
    axiosInstance.delete(`/wishlist/${productId}`),

  checkInWishlist: (productId) =>
    axiosInstance.get(`/wishlist/check/${productId}`),
};

export default wishlistServices;
