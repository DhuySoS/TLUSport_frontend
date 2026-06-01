import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecentlyViewedStore = create(
  persist(
    (set, get) => ({
      viewedProducts: [],
      
      addProduct: (product) => {
        const currentProducts = get().viewedProducts;
        // Xóa sản phẩm nếu đã tồn tại để đẩy lên đầu
        const filteredProducts = currentProducts.filter(p => p.id !== product.id);
        
        // Thêm sản phẩm mới lên đầu và giới hạn giữ lại 10 sản phẩm
        const newProducts = [product, ...filteredProducts].slice(0, 10);
        
        set({ viewedProducts: newProducts });
      },
      
      clearHistory: () => set({ viewedProducts: [] })
    }),
    {
      name: 'recently-viewed-storage', // Tên key lưu dưới localStorage
    }
  )
);

export default useRecentlyViewedStore;
