import axiosInstance from "./axiosInstance";

const paymentMethodServices = {
  getActiveMethods: async () => {
    try {
      const res = await axiosInstance.get("/payment-methods/active");
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

export default paymentMethodServices;
