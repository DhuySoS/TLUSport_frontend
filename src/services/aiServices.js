import axiosInstance from "./axiosInstance";

const aiServices = {
  chatWithBot: async (query) => {
    try {
      const res = await axiosInstance.post(
        "/chatbot/chat",
        { query },
        {
          headers: { skipAuth: true },
        },
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getRecommendations: async (userId, limit = 8) => {
    try {
      const res = await fetch("http://localhost:5001/api/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, limit }),
      });
      if (!res.ok) {
        throw new Error("Lỗi kết nối AI Server");
      }
      return await res.json();
    } catch (error) {
      throw error;
    }
  },
};

export default aiServices;
