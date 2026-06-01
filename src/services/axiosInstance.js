import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

console.log("DEBUG VITE_API_URL:", import.meta.env.VITE_API_URL);
// const baseURL = "http://localhost:8080/api";
const baseURL = import.meta.env.VITE_API_URL;
const axiosRefresh = axios.create({
  baseURL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL,
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
    const token = localStorage.getItem("accessToken")?.trim();
    if (token) {
      const payload = jwtDecode(token);
      if (payload.exp * 1000 - 10000 < Date.now()) {
        try {
          const rfToken = Cookies.get("refreshToken");
          const res = await axiosRefresh.post("/auth/refresh-token", {
            refreshToken: rfToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = res.data.data;
          localStorage.setItem("accessToken", accessToken.trim());
          Cookies.set("refreshToken", newRefreshToken, { expires: 7 });
          config.headers["Authorization"] = `Bearer ${accessToken.trim()}`;
        } catch (error) {
          console.error("Lỗi refreshing token:", error);
          localStorage.removeItem("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/";
          return Promise.reject(error);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${token.trim()}`;
      }
      // khi có backend thì bỏ comment đoạn trên và xóa dòng dưới
      // config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log("Lỗi request interceptor:", err);
    return Promise.reject(err);
  },
);

export default axiosInstance;
