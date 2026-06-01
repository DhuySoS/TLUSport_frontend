import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/schemas/authSchema";
import authServices from "@/services/authServices";

const ResetPasswordForm = ({ email, onSuccess, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authServices.resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.", {
        position: "top-right",
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Lỗi khi đặt lại mật khẩu.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-sm font-semibold text-neutral-600 text-center">
        Đặt lại mật khẩu cho tài khoản: <span className="text-blue-700">{email}</span>
      </div>

      {/* OTP Code */}
      <div>
        <div className="relative">
          <input
            type="text"
            id="otp"
            placeholder=" "
            {...register("otp")}
            className={`w-full border rounded-full py-2.5 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
              errors.otp ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-neutral-300"
            }`}
          />
          <label
            htmlFor="otp"
            className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
            peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
            peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
            peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
            peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
            peer-not-placeholder-shown:bg-white"
          >
            Mã OTP xác nhận
          </label>
        </div>
        {errors.otp && (
          <p className="text-red-500 text-xs mt-1 ml-4">{errors.otp.message}</p>
        )}
      </div>

      {/* New Password */}
      <div>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            placeholder=" "
            {...register("newPassword")}
            className={`w-full border rounded-full py-2.5 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
              errors.newPassword ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-neutral-300"
            }`}
          />
          <label
            htmlFor="newPassword"
            className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
            peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
            peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
            peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
            peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
            peer-not-placeholder-shown:bg-white"
          >
            Mật khẩu mới
          </label>
          <span
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-neutral-400 hover:text-neutral-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1 ml-4">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder=" "
            {...register("confirmPassword")}
            className={`w-full border rounded-full py-2.5 px-4 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 ${
              errors.confirmPassword ? "border-red-500 focus:border-red-500 hover:border-red-500" : "border-neutral-300"
            }`}
          />
          <label
            htmlFor="confirmPassword"
            className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
            peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
            peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
            peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
            peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
            peer-not-placeholder-shown:bg-white"
          >
            Xác nhận mật khẩu mới
          </label>
          <span
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-neutral-400 hover:text-neutral-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1 ml-4">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-neutral-800 flex items-center justify-center cursor-pointer text-white py-2.5 rounded-full hover:bg-neutral-900 transition-colors duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Đặt lại mật khẩu"}
      </button>

      <div className="text-center flex justify-between items-center px-4 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-neutral-500 font-bold hover:underline cursor-pointer"
        >
          Nhập lại Email
        </button>
        <button
          type="button"
          onClick={onSuccess}
          className="text-xs text-blue-800 font-bold hover:underline cursor-pointer"
        >
          Đăng nhập
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
