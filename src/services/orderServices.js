import axiosInstance from "./axiosInstance";

const orderServices = {
  placeOrder: async (data) => {
    try {
      const res = await axiosInstance.post("/orders", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getMyOrders: async (page = 1, size = 10) => {
    try {
      const res = await axiosInstance.get("/orders/my-orders", {
        params: { page, size },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getPreview: async (data) => {
    try {
      const res = await axiosInstance.post("/checkout/preview", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  cancelOrder: async (orderId) => {
    try {
      const res = await axiosInstance.put(`/orders/${orderId}/cancel`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  createReturnRequest: async (orderId, data) => {
    try {
      const res = await axiosInstance.post(`/order-returns/orders/${orderId}`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getReturnByOrderId: async (orderId) => {
    try {
      const res = await axiosInstance.get(`/order-returns/orders/${orderId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  deliverOrder: async (orderId) => {
    try {
      const res = await axiosInstance.put(`/orders/${orderId}/deliver`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default orderServices;
