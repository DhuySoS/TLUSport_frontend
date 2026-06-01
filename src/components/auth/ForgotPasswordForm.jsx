import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { forgotPasswordSchema } from "@/schemas/authSchema";
import authServices from "@/services/authServices";
import InputField from "@/components/common/InputField";

const ForgotPasswordForm = ({ onSuccess, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authServices.forgotPassword(data.email);
      toast.success("Mã OTP cấp lại mật khẩu đã được gửi đến email của bạn!", {
        position: "top-right",
      });
      if (onSuccess) {
        onSuccess(data.email);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Lỗi khi gửi yêu cầu cấp lại mật khẩu.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email/SĐT của bạn"
        name="email"
        {...register("email")}
        error={errors.email}
      />

      <button
        type="submit"
        className="w-full bg-neutral-800 flex items-center justify-center cursor-pointer text-white py-2.5 rounded-full hover:bg-neutral-900 transition-colors duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Gửi yêu cầu"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-blue-800 font-bold hover:underline cursor-pointer"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
