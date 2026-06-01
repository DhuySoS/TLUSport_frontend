import axiosInstance from "./axiosInstance";

const cartServices = {
  // Lấy giỏ hàng — nếu sessionId null thì body rỗng, backend sẽ tạo cart mới
  getCart: async (sessionId) => {
    const res = await axiosInstance.post("/cart/detail", sessionId ? { sessionId } : {});
    return res.data;
  },

  // Thêm sản phẩm vào giỏ
  addToCart: async (skuId, quantity, sessionId) => {
    const res = await axiosInstance.post(
      "/cart/add",
      sessionId ? { sessionId } : {},
      { params: { skuId, quantity } },
    );
    return res.data;
  },

  // Cập nhật số lượng 1 item
  updateCartItem: async (itemId, sessionId, quantity) => {
    const res = await axiosInstance.put(
      `/cart/item/${itemId}`,
      sessionId ? { sessionId } : {},
      { params: { quantity } },
    );
    return res.data;
  },

  // Xóa 1 item khỏi giỏ
  removeCartItem: async (itemId, sessionId) => {
    const res = await axiosInstance.delete(`/cart/item/${itemId}`, {
      data: sessionId ? { sessionId } : {},
    });
    return res.data;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async (sessionId) => {
    const res = await axiosInstance.delete("/cart/clear", {
      data: sessionId ? { sessionId } : {},
    });
    return res.data;
  },

  // Merge giỏ guest vào giỏ user sau khi đăng nhập
  mergeCart: async (sessionId) => {
    const res = await axiosInstance.post("/cart/merge", null, {
      params: { sessionId },
    });
    return res.data;
  },
};

export default cartServices;
