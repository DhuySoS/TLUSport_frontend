import axiosInstance from "./axiosInstance";

const bannerServices = {
  getActiveBanners: async (position = "HOME_MAIN") => {
    try {
      const res = await axiosInstance.get("/banners/active", {
        params: { position },
        headers: { skipAuth: true },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default bannerServices;
