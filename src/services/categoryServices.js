import axiosInstance from "./axiosInstance";

const categoryServices = {
  getAllCategories: async () => {
    try {
      const res = await axiosInstance.get("/categories", {
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getCategoryTree: async () => {
    try {
      const res = await axiosInstance.get("/categories/tree", {
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getCategoryById: async (id) => {
    try {
      const res = await axiosInstance.get(`/categories/${id}`, {
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryServices;
