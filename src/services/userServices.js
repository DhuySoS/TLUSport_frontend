import axiosInstance from "./axiosInstance";

const userServices = {
    getMyProfile: async () => {
    const res = await axiosInstance.get("/users/my-profile");
    return res.data;
  },
  updateProfile: async (profileData) => {
    const res = await axiosInstance.put("/users/my-profile", profileData);
    return res.data;
  },
};

export default userServices;