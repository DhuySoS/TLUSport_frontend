import useAuthStore from "@/store/useAuthStore";
import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";

const AccountSettings = () => {
  const { user } = useAuthStore();
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  return (
    <div>
      <p className="text-2xl sm:text-4xl font-semibold tracking-wide">
        Thông tin tài khoản
      </p>
      <div className="my-6 sm:my-10 space-y-4 sm:space-y-6">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center text-base sm:text-lg font-medium">
          <p className="w-full sm:basis-1/4 text-neutral-500">Họ và tên</p>
          <p className="flex-1 text-neutral-700">
            {user?.firstName + " " + user?.lastName}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center text-base sm:text-lg font-medium">
          <p className="w-full sm:basis-1/4 text-neutral-500">Số điện thoại</p>
          <p className="flex-1 text-neutral-700"> {user?.phoneNumber || "Chưa cập nhật"}</p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center text-base sm:text-lg font-medium">
          <p className="w-full sm:basis-1/4 text-neutral-500">Chiều cao</p>
          <p className="flex-1 text-neutral-700">
            {user?.height ? `${user.height} cm` : "Chưa cập nhật"}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center text-base sm:text-lg font-medium">
          <p className="w-full sm:basis-1/4 text-neutral-500">Cân nặng</p>
          <p className="flex-1 text-neutral-700">
            {user?.weight ? `${user.weight} kg` : "Chưa cập nhật"}
          </p>
        </div>
        <button
          onClick={() => setShowUpdateProfile(true)}
          className="border border-neutral-900 rounded-4xl inline-flex px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-lg uppercase font-medium text-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          Cập nhật
        </button>
      </div>
      <p className="text-xl sm:text-3xl font-semibold tracking-wide mt-6 sm:mt-10">
        Thông tin đăng nhập
      </p>
      <div className="my-6 sm:my-10 space-y-4 sm:space-y-6">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center text-base sm:text-lg font-medium">
          <p className="w-full sm:basis-1/4 text-neutral-500">Email</p>
          <p className="flex-1 text-neutral-700 break-all">{user?.email}</p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center text-base sm:text-lg font-medium">
          <p className="w-full sm:basis-1/4 text-neutral-500">Mật khẩu</p>
          <p className="flex-1 text-neutral-700 tracking-wider">
            .....................
          </p>
        </div>
        <button
          onClick={() => setShowChangePwd(true)}
          className="border border-neutral-900 rounded-4xl inline-flex px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-lg uppercase font-medium text-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          Đổi mật khẩu
        </button>
      </div>

      {/* Modal đổi mật khẩu */}
      {showChangePwd && (
        <ChangePasswordModal onClose={() => setShowChangePwd(false)} />
      )}

      {/* Modal cập nhật thông tin */}
      {showUpdateProfile && (
        <UpdateProfileModal onClose={() => setShowUpdateProfile(false)} />
      )}
    </div>
  );
};

export default AccountSettings;
