const userServices = {
    getMyProfile: async () => {
    const res = await axiosInstance.get("/users/my-profile");
    return res.data;
  },
}

export default userServices;