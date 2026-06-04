// const baseURL = "http://localhost:5001/api";
const baseURL = import.meta.env.VITE_AI_URL;

const aiServices = {
  chatWithBot: async (message, sessionId = null, userId = null) => {
    try {
      const res = await fetch(`${baseURL}/ai/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          session_id: sessionId,
          user_id: userId,
        }),
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  getRecommendations: async (userId, limit = 8) => {
    try {
      const res = await fetch(`${baseURL}/ai/recommend`, {
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
