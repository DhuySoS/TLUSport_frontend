import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/schemas/userSchema";
import userServices from "@/services/userServices";
import useAuthStore from "@/store/useAuthStore";
import InputField from "@/components/common/InputField";
import { toast } from "sonner";

/**
 * UpdateProfileModal — Modal cập nhật thông tin cá nhân
 * @param {function} onClose — Callback đóng modal
 */
const UpdateProfileModal = ({ onClose }) => {
  const { user, fetchMyProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      height: user?.height !== null && user?.height !== undefined ? String(user.height) : "",
      weight: user?.weight !== null && user?.weight !== undefined ? String(user.weight) : "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phoneNumber: data.phoneNumber.trim(),
        height: data.height !== "" ? parseFloat(data.height) : null,
        weight: data.weight !== "" ? parseFloat(data.weight) : null,
      };

      await userServices.updateProfile(payload);
      toast.success("Cập nhật thông tin thành công!");
      await fetchMyProfile();
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      const msg = error.response?.data?.message || "Cập nhật thông tin thất bại";
      toast.error(msg);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
                className="text-neutral-700"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              Cập nhật thông tin
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4rem"
              height="1.4rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-5">
          <div className="flex gap-4">
            <div className="flex-1">
              <InputField
                label="Họ"
                name="firstName"
                {...register("firstName")}
                error={errors.firstName}
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Tên"
                name="lastName"
                {...register("lastName")}
                error={errors.lastName}
              />
            </div>
          </div>

          <InputField
            label="Số điện thoại"
            name="phoneNumber"
            {...register("phoneNumber")}
            error={errors.phoneNumber}
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <InputField
                label="Chiều cao (cm)"
                name="height"
                type="number"
                step="0.1"
                {...register("height")}
                error={errors.height}
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Cân nặng (kg)"
                name="weight"
                type="number"
                step="0.1"
                {...register("weight")}
                error={errors.weight}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? "Đang lưu..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
