import axiosInstance from "./axiosInstance";

const authServices = {
  login: async (credentials) => {
    // credentials gồm: { email, password }
    const res = await axiosInstance.post("/auth/login", credentials, {
      headers: {
        skipAuth: true,
      },
    });
    return res.data;
  },
  register: async (userData) => {
    // userData gồm: { email, password, firstName, lastName, phoneNumber }
    const res = await axiosInstance.post("/auth/register", userData, {
      headers: {
        skipAuth: true,
      },
    });
    return res.data;
  },
  verify: async (verificationData) => {
    // verificationData gồm: { email, code }
    const res = await axiosInstance.post("/auth/verify", verificationData, {
      headers: {
        skipAuth: true,
      },
    });
    return res.data;
  },
    logout: async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  },
    forgotPassword: async (email) => {
        // email là email của người dùng đã đăng ký, backend sẽ gửi OTP về email này => resetPassword
    const res = await axiosInstance.post("/auth/forgot-password", { email }, {
      headers: {
        skipAuth: true,
      },
    });
    return res.data;
  },
    resetPassword: async (resetData) => {
      // resetData gồm: { email, newPassword, otp }
      const res = await axiosInstance.post("/auth/reset-password", resetData, {
        headers: {
          skipAuth: true,
        },
      });
      return res.data;
    },
  changePassword: async (passwordData) => {
    // passwordData gồm: { currentPassword, newPassword, confirmationPassword }
    const res = await axiosInstance.post("/auth/change-password", passwordData);
    return res.data;
  },

};

export default authServices;
