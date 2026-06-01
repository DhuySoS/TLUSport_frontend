// Hàm xáo trộn mảng chuẩn Fisher-Yates
export const shuffleArray = (array) => {
  if (!array || array.length === 0) return [];

  const shuffled = [...array]; // Tạo bản sao
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Hoán đổi vị trí
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
