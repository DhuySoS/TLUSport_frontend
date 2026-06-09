import productServices from "@/services/productServices";
import aiServices from "@/services/aiServices";
import { create } from "zustand";

const useProductStore = create((set, get) => ({
  products: [],
  productDetail: null,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalElements: 0,
    totalPage: 0,
  },
  isLoading: false,
  error: null,

  fetchProducts: async (pageNumber = 1, pageSize = 10) => {
    set({ isLoading: true, error: null });
    try {
      const res = await productServices.getAllProducts(pageNumber, pageSize);
      set({
        products: res.data?.items,
        pagination: {
          currentPage: res.data?.currentPage,
          pageSize: res.data?.pageSize,
          totalElements: res.data?.totalElements,
          totalPage: res.data?.totalPage,
        },
        isLoading: false,
      });
      // console.log("Products in Store: ", get().products);
    } catch (error) {
      console.error("Lỗi fetchProducts:", error);
      set({
        error: error.response?.data?.message || "Lỗi khi tải sản phẩm",
        isLoading: false,
      });
    }
  },

  searchResults: [],
  isSearching: false,

  searchProducts: async (keyword = "", pageNumber = 1, pageSize = 4) => {
    set({ isSearching: true, error: null });
    try {
      const res = await productServices.searchProducts(
        keyword,
        pageNumber,
        pageSize,
      );
      set({
        searchResults: res.data?.items || [],
        isSearching: false,
      });
    } catch (error) {
      console.error("Lỗi searchProducts:", error);
      set({
        error: error.response?.data?.message || "Lỗi khi tìm kiếm sản phẩm",
        isSearching: false,
      });
    }
  },

  searchProductsWithAI: async (keyword = "", pageNumber = 1, pageSize = 4) => {
    set({ isSearching: true, error: null });
    try {
      const aiRes = await aiServices.smartSearch(keyword, null, pageSize);
      const productIds = aiRes.product_ids || [];

      if (productIds.length === 0) {
        set({ searchResults: [], isSearching: false });
        return;
      }

      const details = await Promise.all(
        productIds.map(async (id) => {
          try {
            const detailRes = await productServices.getProductDetail(id);
            return detailRes.data;
          } catch (err) {
            console.error(`Failed to fetch detail for product ${id}:`, err);
            return null;
          }
        })
      );

      const validProducts = details.filter((p) => p !== null);
      set({
        searchResults: validProducts,
        isSearching: false,
      });
    } catch (error) {
      console.error("Lỗi searchProductsWithAI:", error);
      set({
        error: error.message || "Lỗi khi tìm kiếm sản phẩm bằng AI",
        isSearching: false,
        searchResults: [],
      });
    }
  },
}));

export default useProductStore;
