import categoryServices from "@/services/categoryServices";
import { create } from "zustand";

const useCategoryStore = create((set, get) => ({
  categories: [],
  categoryTree: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await categoryServices.getAllCategories();
      const rawData = res.data || res;
      const sortedData = Array.isArray(rawData)
        ? [...rawData].sort((a, b) => a.id - b.id)
        : rawData;
      set({
        categories: sortedData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Lỗi fetchCategories:", error);
      set({
        error: error.response?.data?.message || "Lỗi khi tải danh mục",
        isLoading: false,
      });
    }
  },

  fetchCategoryTree: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await categoryServices.getCategoryTree();
      const rawData = res.data || res;

      const sortedData = Array.isArray(rawData)
        ? [...rawData].sort((a, b) => a.id - b.id)
        : rawData;

      if (Array.isArray(sortedData)) {
        sortedData.forEach((cat) => {
          if (cat.subCategories && Array.isArray(cat.subCategories)) {
            cat.subCategories.sort((a, b) => a.id - b.id);
          }
        });
      }
      set({
        categoryTree: sortedData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Lỗi fetchCategoryTree:", error);
      set({
        error: error.response?.data?.message || "Lỗi khi tải cây danh mục",
        isLoading: false,
      });
    }
  },
  fetchCategoryById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await categoryServices.getCategoryById(id);
      const rawData = res.data || res;
      const sortedData = Array.isArray(rawData)
        ? [...rawData].sort((a, b) => a.id - b.id)
        : rawData;
      set({
        categories: sortedData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Lỗi fetchCategories:", error);
      set({
        error: error.response?.data?.message || "Lỗi khi tải danh mục",
        isLoading: false,
      });
    }
  },
}));

export default useCategoryStore;
