import axiosInstance from "./axiosInstance";

const shippingMethodServices = {
  getActiveMethods: async () => {
    try {
      const res = await axiosInstance.get("/shipping-methods", {});
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default shippingMethodServices;
