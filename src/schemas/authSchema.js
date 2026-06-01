import z from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email hoặc số điện thoại không được để trống")
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(0|84|\+84)[3|5|7|8|9][0-9]{8}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }, {
      message: "Email hoặc số điện thoại không hợp lệ",
    }),
  password: z.string()
    .min(1, "Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),
});

export const registerSchema = z.object({
  firstName: z.string()
    .min(1, "Họ không được để trống")
    .max(50, "Họ không được dài quá 50 ký tự"),
  lastName: z.string()
    .min(1, "Tên không được để trống")
    .max(50, "Tên không được dài quá 50 ký tự"),
  phoneNumber: z.string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^(0|84|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
  email: z.string()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng"),
  password: z.string()
    .min(1, "Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),
});
export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email hoặc số điện thoại không được để trống")
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(0|84|\+84)[3|5|7|8|9][0-9]{8}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }, {
      message: "Email hoặc số điện thoại không hợp lệ",
    }),
});

export const resetPasswordSchema = z.object({
  otp: z.string()
    .min(1, "Mã xác nhận (OTP) không được để trống")
    .min(4, "Mã xác nhận (OTP) phải chứa ít nhất 4 ký tự"),
  newPassword: z.string()
    .min(1, "Mật khẩu mới không được để trống")
    .min(6, "Mật khẩu mới phải chứa ít nhất 6 ký tự"),
  confirmPassword: z.string()
    .min(1, "Xác nhận mật khẩu không được để trống"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});
