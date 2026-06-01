import axiosInstance from "./axiosInstance";

const couponServices = {
  getAllCoupons: async () => {
    try {
      const res = await axiosInstance.get("/coupons");
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default couponServices;
