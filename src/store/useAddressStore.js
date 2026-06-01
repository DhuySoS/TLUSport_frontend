import { create } from "zustand";
import { toast } from "sonner";
import addressServices from "@/services/addressServices";

const useAddressStore = create((set, get) => ({
  addresses: [],
  isLoading: false,
  error: null,

  // ── FETCH ─────────────────────────────────────────────────────────────────
  fetchAddresses: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await addressServices.getMyAddresses();
      set({ addresses: res.data ?? [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Lỗi khi tải địa chỉ",
        isLoading: false,
      });
    }
  },

  // ── CREATE ────────────────────────────────────────────────────────────────
  createAddress: async (data) => {
    set({ isLoading: true });
    try {
      const res = await addressServices.createAddress(data);
      // Nếu địa chỉ mới là mặc định → clear cờ của các địa chỉ cũ
      set((state) => {
        let list = state.addresses;
        if (data.isDefault) {
          list = list.map((a) => ({ ...a, isDefault: false }));
        }
        return { addresses: [...list, res.data], isLoading: false };
      });
      toast.success(res.message || "Thêm địa chỉ thành công");
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi khi thêm địa chỉ";
      set({ isLoading: false, error: msg });
      toast.error(msg);
      throw error;
    }
  },

  // ── UPDATE ────────────────────────────────────────────────────────────────
  updateAddress: async (id, data) => {
    set({ isLoading: true });
    try {
      const res = await addressServices.updateAddress(id, data);
      set((state) => {
        let list = state.addresses;
        if (data.isDefault) {
          list = list.map((a) => ({ ...a, isDefault: a.id === id }));
        } else {
          list = list.map((a) => (a.id === id ? res.data : a));
        }
        return { addresses: list, isLoading: false };
      });
      toast.success(res.message || "Cập nhật địa chỉ thành công");
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi khi cập nhật địa chỉ";
      set({ isLoading: false, error: msg });
      toast.error(msg);
      throw error;
    }
  },

  // ── DELETE ────────────────────────────────────────────────────────────────
  deleteAddress: async (id) => {
    set({ isLoading: true });
    try {
      const res = await addressServices.deleteAddress(id);
      set((state) => ({
        addresses: state.addresses.filter((a) => a.id !== id),
        isLoading: false,
      }));
      toast.success(res.message || "Xóa địa chỉ thành công");
    } catch (error) {
      const msg = error.response?.data?.message || "Lỗi khi xóa địa chỉ";
      set({ isLoading: false, error: msg });
      toast.error(msg);
      throw error;
    }
  },
}));

export default useAddressStore;
