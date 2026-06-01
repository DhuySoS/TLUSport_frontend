import axiosInstance from "./axiosInstance";

const walletServices = {
  getMyWallet: () => axiosInstance.get("/wallet"),
  getTransactions: (page = 1, size = 10) =>
    axiosInstance.get("/wallet/transactions", { params: { page, size } }),
  depositVnpay: (amount) =>
    axiosInstance.post("/wallet/deposit/vnpay", { amount }),
};

export default walletServices;
