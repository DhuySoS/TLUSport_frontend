import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosRefresh = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
      return config;
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
        // xử lý sau do chưa có backend
      // const payload = jwtDecode(token);
      // if (payload.exp * 1000 - 10000 < Date.now()) {
      //   try {
      //     const res = await axiosRefresh.post("/auth/refresh-token");
      //     const newAccessToken = res.data.accessToken;
      //     localStorage.setItem("accessToken", newAccessToken);
      //     config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      //   } catch (error) {
      //     console.error("Lỗi refreshing token:", error);
      //     localStorage.removeItem("accessToken");
      //     window.location.href = "/";
      //   }
      // }else {
      // config.headers["Authorization"] = `Bearer ${token}`;
      // }
    // khi có backend thì bỏ comment đoạn trên và xóa dòng dưới
    config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log("Lỗi request interceptor:", err);
    return Promise.reject(err);
  },
);

export default axiosInstance;
