import z from "zod";

const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
export const checkoutSchema = z.object({
  // policy: z.literal(true, {
  //   errorMap: () => ({ message: "Bạn cần đồng ý với chính sách bảo mật" }),
  // }),
  fullName: z
    .string()
    .min(1, "Họ tên không được để trống")
    .min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(phoneRegex, "Số điện thoại không hợp lệ"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng"),

  addressDetail: z.string().min(1, "Địa chỉ không được để trống"),
  // province: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố"),
  // district: z.string().min(1, "Vui lòng chọn Quận/Huyện"),
  // ward: z.string().min(1, "Vui lòng chọn Phường/Xã"),

  note: z.string().optional(),
  paymentMethod: z.enum(["cod", "momopay", "vnpay", "zalopay"], {
    errorMap: () => ({ message: "Vui lòng chọn một phương thức thanh toán" }),
  }),
});
