import axiosInstance from "./axiosInstance";

const productServices = {
  getAllProducts: async (pageNumber = 1, pageSize = 10) => {
    try {
      const res = await axiosInstance.get("/products/active", {
        params: {
          pageNumber,
          pageSize,
        },
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  searchProducts: async (keyword = "", pageNumber = 1, pageSize = 10) => {
    try {
      const res = await axiosInstance.get("/products/search", {
        params: {
          pageNumber,
          pageSize,
          keyword: keyword.trim(),
        },
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getProductDetail: async (id) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  filterProducts: async (filters) => {
    try {
      const params = {};
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.brandId) params.brandId = filters.brandId;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.pageNumber) params.pageNumber = filters.pageNumber;
      if (filters.pageSize) params.pageSize = filters.pageSize;

      const queryString = new URLSearchParams(params);
      if (filters.attributeValueIds && filters.attributeValueIds.length > 0) {
        filters.attributeValueIds.forEach((id) => {
          queryString.append("attributeValueIds", id);
        });
      }
      const query = queryString.toString();
      const res = await axiosInstance.get(`/products/filter?${query}`, {
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productServices;
