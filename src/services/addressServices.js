import axiosInstance from "./axiosInstance";

const addressServices = {
  /** GET /api/addresses/my-addresses */
  getMyAddresses: async () => {
    const res = await axiosInstance.get("/addresses/my-addresses");
    return res.data;
  },

  /** GET /api/addresses/my-default-address */
  getMyDefaultAddress: async () => {
    const res = await axiosInstance.get("/addresses/my-default-address");
    return res.data;
  },


  /** POST /api/addresses */
  createAddress: async (data) => {
    const res = await axiosInstance.post("/addresses", data);
    return res.data;
  },

  /** PUT /api/addresses/:id */
  updateAddress: async (id, data) => {
    const res = await axiosInstance.put(`/addresses/${id}`, data);
    return res.data;
  },

  /** DELETE /api/addresses/:id */
  deleteAddress: async (id) => {
    const res = await axiosInstance.delete(`/addresses/${id}`);
    return res.data;
  },
};

export default addressServices;
