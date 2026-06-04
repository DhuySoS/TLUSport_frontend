import authServices from "@/services/authServices";
import userServices from "@/services/userServices";
import { create } from "zustand";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useCartStore from "@/store/useCartStore";
const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isOpenLogin: false,
  setIsOpenLogin: (isOpen) => set({ isOpenLogin: isOpen }),
  clearState: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  setUser: (userData) => {
    set({ user: userData, isAuthenticated: true, isLoading: false });
  },
  checkAuth: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      get().clearState();
      return;
    }
    set({ isLoading: true });
    try {
      const res = await userServices.getMyProfile();
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Lỗi checkAuth:", error);
      localStorage.removeItem("accessToken");
      get().clearState();
    }
  },
  fetchMyProfile: async () => {
    try {
      const res = await userServices.getMyProfile();
      console.log(res);
      set({ user: res.data });
    } catch (error) {
      console.error("Lỗi fetchMyProfile:", error);
    }
  },
  login: async (credentials) => {
    try {
      set({ isLoading: true });
      const res = await authServices.login(credentials);
      console.log(res);
      localStorage.setItem("accessToken", res.data.accessToken);
      Cookies.set("refreshToken", res.data.refreshToken, { expires: 7 });
      set({ isAuthenticated: true });
      await get().fetchMyProfile();
      // Merge giỏ hàng guest vào tài khoản sau khi đăng nhập
      await useCartStore.getState().mergeCart();
      return res;
    } catch (error) {
      console.error("Lỗi login:", error.response?.data?.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      const rfToken = Cookies.get("refreshToken");
      if (rfToken) {
        await authServices.logout(rfToken);
      }
      toast.success("Đăng xuất thành công!", { position: "top-right" });
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
      toast.error("Có lỗi xảy ra khi đăng xuất!", { position: "top-right" });
    } finally {
      localStorage.removeItem("accessToken");
      Cookies.remove("refreshToken");
      // Reset giỏ hàng ở FE (không gọi API)
      useCartStore.getState().clearCartLocal();
      // Xoá session chatbot
      sessionStorage.removeItem("chatbot_session_id");
      sessionStorage.removeItem("chatbot_messages");
      set({ user: null, isAuthenticated: false });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  },
  register: async (userData) => {
    try {
      const res = await authServices.register(userData);
      console.log(res);
    } catch (error) {
      console.error("Lỗi register:", error);
      throw error;
    }
  },
  verify: async (verificationData) => {
    try {
      const res = await authServices.verify(verificationData);
      console.log(res);
      toast.success(res.message, { position: "top-right" });
      return res;
    } catch (error) {
      console.error("Lỗi verify:", error);
      toast.error(error.response?.data?.message, { position: "top-right" });
      throw error;
    }
  },
}));

export default useAuthStore;
