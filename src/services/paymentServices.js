import axiosInstance from "./axiosInstance";

const paymentServices = {
  vnPayReturn: async (params) => {
    try {
      const res = await axiosInstance.get("payment/vnpay-return", { params });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentServices;
