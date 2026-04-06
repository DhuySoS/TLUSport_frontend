import authServices from "@/services/authServices";
import userServices from "@/services/userServices";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
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
  login: async (credentials) => {
    try {
      const res = await authServices.login(credentials);
      localStorage.setItem("accessToken", res.accessToken);
      await fetchMyProfile();
      return res
    } catch (error) {
    //   console.error("Lỗi login:", error.response?.data?.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }

  },
  fetchMyProfile: async () => {
    try {
        const res = await userServices.getMyProfile();
        console.log(res);
        set({ user: res });
    } catch (error) {
        console.error("Lỗi fetchMyProfile:", error);
    }
    }
}));

export default useAuthStore;
