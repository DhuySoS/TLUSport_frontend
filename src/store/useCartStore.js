import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import cartServices from "@/services/cartServices";
import {
  getCartSessionId,
  saveCartSessionId,
  clearCartSessionId,
} from "@/lib/cartHelper";
import couponServices from "@/services/couponServices";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      totalAmount: 0,
      sessionId: null,
      isLoading: false,
      error: null,
      selectedItemIds: [],
      appliedCoupon: null,
      coupons: [],

      fetchCoupons: async () => {
        try {
          const res = await couponServices.getAllCoupons();
          const coupons = res.data;
          set({ coupons });
        } catch (error) {
          console.error("Lỗi khi tải voucher:", error);
        }
      },
      applyCoupon: (coupon) => {
        set({ appliedCoupon: coupon });
      },
      unApplyCoupon: () => {
        set({ appliedCoupon: null });
      },

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        const sessionId = getCartSessionId(); // null nếu chưa có
        try {
          const res = await cartServices.getCart(sessionId);
          const cartData = res.data;

          // Backend tạo cart mới → trả về sessionId → FE lưu lại
          if (cartData?.sessionId) {
            saveCartSessionId(cartData.sessionId);
            set({ sessionId: cartData.sessionId });
          }

          const items = cartData?.items ?? [];
          set((state) => {
            // Giữ lại các ID đang được chọn nếu sản phẩm đó vẫn còn trong giỏ hàng và còn hàng (stockQuantity > 0)
            const validSelectedIds = state.selectedItemIds.filter((id) =>
              items.some((item) => item.id === id && (item.stockQuantity ?? 0) > 0)
            );
            return {
              cartItems: items,
              totalAmount: cartData?.totalAmount ?? 0,
              isLoading: false,
              selectedItemIds: validSelectedIds,
            };
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Lỗi khi tải giỏ hàng",
            isLoading: false,
          });
        }
      },

  addToCart: async (skuId, quantity) => {
    set({ isLoading: true, error: null });
    const sessionId = get().sessionId || getCartSessionId();
    try {
      const res = await cartServices.addToCart(skuId, quantity, sessionId);
      const cartData = res.data;

      if (cartData?.sessionId) {
        saveCartSessionId(cartData.sessionId);
        set({ sessionId: cartData.sessionId });
      }

      const items = cartData?.items ?? [];
      set({
        cartItems: items,
        totalAmount: cartData?.totalAmount ?? 0,
        isLoading: false,
        selectedItemIds: items.filter((i) => (i.stockQuantity ?? 0) > 0).map((i) => i.id),
      });
    } catch (error) {
      const msg =
        error.response?.data?.message || "Lỗi khi thêm sản phẩm vào giỏ hàng";
      set({ error: msg, isLoading: false });

      toast.error(msg, {
        position: "top-right",
      });
    }
  },

  updateItem: async (itemId, quantity) => {
    // Nếu qty <= 0 thì xóa luôn
    if (quantity <= 0) {
      return get().removeItem(itemId);
    }
    const sessionId = get().sessionId || getCartSessionId();
    try {
      const res = await cartServices.updateCartItem(
        itemId,
        sessionId,
        quantity,
      );
      const cartData = res.data;
      const items = cartData?.items ?? [];
      set({
        cartItems: items,
        totalAmount: cartData?.totalAmount ?? 0,
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi khi cập nhật số lượng";
      toast.error(msg);
    }
  },

  removeItem: async (itemId) => {
    const sessionId = get().sessionId || getCartSessionId();
    try {
      const res = await cartServices.removeCartItem(itemId, sessionId);
      const cartData = res.data;
      const items = cartData?.items ?? [];
      set((state) => ({
        cartItems: items,
        totalAmount: cartData?.totalAmount ?? 0,
        selectedItemIds: state.selectedItemIds.filter((id) => id !== itemId),
      }));
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi khi xóa sản phẩm";
      toast.error(msg);
    }
  },

  clearCart: async () => {
    const sessionId = get().sessionId || getCartSessionId();
    try {
      await cartServices.clearCart(sessionId);
      set({ cartItems: [], totalAmount: 0, selectedItemIds: [] });
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi khi xóa giỏ hàng";
      toast.error(msg);
    }
  },

  mergeCart: async () => {
    const sessionId = get().sessionId || getCartSessionId();
    if (!sessionId) return; // không có giỏ guest thì bỏ qua
    try {
      const res = await cartServices.mergeCart(sessionId);
      const cartData = res.data;
      // Xóa sessionId khỏi localStorage (giờ dùng userId)
      clearCartSessionId();
      const items = cartData?.items ?? [];
      set({
        cartItems: items,
        totalAmount: cartData?.totalAmount ?? 0,
        sessionId: null,
        selectedItemIds: items.filter((i) => (i.stockQuantity ?? 0) > 0).map((i) => i.id),
      });
    } catch (error) {
      // Merge lỗi thì load lại giỏ user bình thường
      console.error("Lỗi merge cart:", error);
      get().fetchCart();
    }
  },

  clearCartLocal: () => {
    set({
      cartItems: [],
      totalAmount: 0,
      sessionId: null,
      selectedItemIds: [],
      error: null,
    });
  },

  toggleSelectItem: (itemId) => {
    set((state) => {
      const item = state.cartItems.find((i) => i.id === itemId);
      if (item && (item.stockQuantity ?? 0) <= 0) {
        return {}; // Không cho phép chọn sản phẩm hết hàng
      }
      const isSelected = state.selectedItemIds.includes(itemId);
      return {
        selectedItemIds: isSelected
          ? state.selectedItemIds.filter((id) => id !== itemId)
          : [...state.selectedItemIds, itemId],
      };
    });
  },

  toggleSelectAll: () => {
    set((state) => {
      const activeItems = state.cartItems.filter((i) => (i.stockQuantity ?? 0) > 0);
      const allActiveSelected =
        activeItems.length > 0 &&
        activeItems.every((i) => state.selectedItemIds.includes(i.id));
      return {
        selectedItemIds: allActiveSelected
          ? state.selectedItemIds.filter((id) => !activeItems.some((i) => i.id === id))
          : [...new Set([...state.selectedItemIds, ...activeItems.map((i) => i.id)])],
      };
    });
  },

  getSelectedItems: () => {
    const { cartItems, selectedItemIds } = get();
    if (!cartItems || !selectedItemIds) return [];
    return cartItems.filter((item) => selectedItemIds.includes(item.id));
  },

  getSelectedTotal: () => {
    const { cartItems, selectedItemIds } = get();
    if (!cartItems || !selectedItemIds) return 0;
    return cartItems
      .filter((item) => selectedItemIds.includes(item.id))
      .reduce((sum, item) => sum + Number(item.price || 0) * (item.quantity || 0), 0);
  },

  getDiscount: () => {
    const { appliedCoupon, coupons, getSelectedTotal } = get();
    const selectedTotal = getSelectedTotal();
    if (!appliedCoupon) return 0;
    
    const couponObj = coupons?.find((c) => c?.code === appliedCoupon);
    if (!couponObj || selectedTotal < Number(couponObj.minOrderValue || 0)) return 0;

    if (couponObj.discountType === "PERCENT") {
      return Math.min((selectedTotal * Number(couponObj.discountValue || 0)) / 100, selectedTotal);
    }
    return Math.min(Number(couponObj.discountValue || 0), selectedTotal);
  },

  getFinalTotal: () => {
    const { getSelectedTotal, getDiscount } = get();
    return getSelectedTotal() - getDiscount();
  },
}),
  {
    name: "cart-storage",
    partialize: (state) => ({
      selectedItemIds: state.selectedItemIds,
      appliedCoupon: state.appliedCoupon,
    }),
  }
));

export default useCartStore;
