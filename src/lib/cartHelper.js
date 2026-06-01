const CART_SESSION_KEY = "cartSessionId";

export const getCartSessionId = () => {
  return localStorage.getItem(CART_SESSION_KEY); // null nếu chưa có
};

export const saveCartSessionId = (sessionId) => {
  if (sessionId) {
    localStorage.setItem(CART_SESSION_KEY, sessionId);
  }
};

export const clearCartSessionId = () => {
  localStorage.removeItem(CART_SESSION_KEY);
};
