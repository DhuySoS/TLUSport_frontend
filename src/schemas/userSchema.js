import z from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string()
    .min(1, "Họ không được để trống")
    .max(50, "Họ không được dài quá 50 ký tự"),
  lastName: z.string()
    .min(1, "Tên không được để trống")
    .max(50, "Tên không được dài quá 50 ký tự"),
  phoneNumber: z.string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^(0|84|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
  height: z
    .preprocess(
      (val) => (val === "" || val === null || val === undefined ? null : Number(val)),
      z.number({ invalid_type_error: "Chiều cao phải là số" }).positive("Chiều cao phải là số dương (cm)").nullable()
    )
    .optional(),
  weight: z
    .preprocess(
      (val) => (val === "" || val === null || val === undefined ? null : Number(val)),
      z.number({ invalid_type_error: "Cân nặng phải là số" }).positive("Cân nặng phải là số dương (kg)").nullable()
    )
    .optional(),
});

export const addressSchema = z.object({
  addressLine1: z.string()
    .min(1, "Vui lòng nhập địa chỉ dòng 1"),
  addressLine2: z.string().optional().nullable().or(z.literal("")),
  city: z.string()
    .min(1, "Vui lòng nhập thành phố"),
  state: z.string()
    .min(1, "Vui lòng nhập tỉnh / thành phố"),
  country: z.string()
    .min(1, "Vui lòng nhập quốc gia"),
  postalCode: z.string()
    .min(1, "Vui lòng nhập mã bưu chính")
    .regex(/^[A-Za-z0-9\s-]{3,20}$/, "Mã bưu chính không hợp lệ (3-20 ký tự)"),
  isDefault: z.boolean().optional().default(false),
});
