import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useAuthStore from "@/store/useAuthStore";
import addressServices from "@/services/addressServices";
import AddressSelectionModal from "./AddressSelectionModal";

const CheckoutForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { user } = useAuthStore();
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    if (user) {
      setValue("fullName", `${user.lastName || ""} ${user.firstName || ""}`.trim());
      setValue("phoneNumber", user.phoneNumber || "");
      setValue("email", user.email || "");

      const fetchDefaultAddress = async () => {
        try {
          const res = await addressServices.getMyDefaultAddress();
          if (res && res.data) {
            const addr = res.data;
            const fullAddress = [
              addr.addressLine1,
              addr.addressLine2,
              addr.city,
              addr.state,
              addr.country
            ].filter(Boolean).join(", ");
            setValue("addressDetail", fullAddress);
            setValue("addressObj", addr); // Lưu thông tin địa chỉ tách rời
          }
        } catch (error) {
          console.error("Không tìm thấy địa chỉ mặc định", error);
        }
      };

      fetchDefaultAddress();
    }
  }, [user, setValue]);
  return (
    <div className="mt-10">
      <h1 className="text-4xl font-medium">Thông tin vận chuyển</h1>
      <div className="space-y-4 mt-4">
        <label className=" flex items-center gap-2 group cursor-pointer select-none">
          <input type="checkbox" className="sr-only " defaultChecked />
          <div
            className="w-5 h-5 shrink-0 border-2 border-neutral-500 rounded-sm flex items-center justify-center 
                   transition-all duration-200 group-has-checked:border-blue-700"
          >
            <span className="w-3 h-3 rounded-[1px]  opacity-0  bg-blue-700 group-has-checked:opacity-100 transition-opacity duration-200"></span>
          </div>
          <span className="text-md text-neutral-500 ">
            Bằng việc ấn nút đặt hàng, bạn xác nhận là đã đọc và hiểu về chính
            sách bảo mật dữ liệu cá nhân của TLUSport
          </span>
        </label>
        <div className="max-w-4xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Họ tên */}
            <FormInput
              label="Họ tên"
              name="fullName"
              placeholder="Nhập họ tên của bạn"
              register={register}
              errors={errors}
            />

            {/* Số điện thoại */}
            <FormInput
              label="Số điện thoại"
              name="phoneNumber"
              placeholder="Nhập số điện thoại"
              register={register}
              errors={errors}
            />
          </div>

          {/* email */}
          <FormInput
            label="Email"
            name="email"
            placeholder="Nhập email của bạn"
            register={register}
            errors={errors}
          />

          {/* Địa chỉ cụ thể */}
          <FormInput
            name="addressDetail"
            placeholder="Vui lòng chọn địa chỉ từ sổ địa chỉ"
            register={register}
            errors={errors}
            readOnly={true}
            customLabel={
              <div className="flex justify-between items-center ml-3 mb-1">
                <label className="text-sm font-semibold text-neutral-700">
                  Địa chỉ cụ thể
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5" />
                  </svg>
                  Chọn từ sổ địa chỉ
                </button>
              </div>
            }
          />

          {/* Ghi chú */}
          <FormInput
            label="Ghi chú"
            name="note"
            placeholder="Nhập ghi chú (Nếu có)"
            register={register}
            errors={errors}
          />
        </div>
      </div>

      {/* Modal Sổ Địa Chỉ */}
      {showAddressModal && (
        <AddressSelectionModal
          onClose={() => setShowAddressModal(false)}
          onSelect={(addr) => {
            const fullAddress = [
              addr.addressLine1,
              addr.addressLine2,
              addr.city,
              addr.state,
              addr.country
            ].filter(Boolean).join(", ");
            setValue("addressDetail", fullAddress);
            setValue("addressObj", addr); // Lưu thông tin địa chỉ tách rời
          }}
        />
      )}
    </div>
  );
};

export default CheckoutForm;

const FormInput = ({ label, name, placeholder, register, errors, customLabel, readOnly = false }) => {
  const error = errors[name];
  return (
    <div className="flex flex-col gap-1">
      {customLabel ? (
        customLabel
      ) : (
        label && (
          <label className="text-sm ml-3 mb-1 font-semibold text-neutral-700">
            {label}
          </label>
        )
      )}
      <input
        {...register(name)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`px-5 py-3 border rounded-full outline-none text-md transition-all focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold placeholder-shown:bg-white not-placeholder-shown:border-blue-200 ${readOnly ? "bg-neutral-100 cursor-not-allowed text-neutral-500 pointer-events-none" : ""
          } ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-1 focus:ring-blue-500"
          }`}
      />
      {error && (
        <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
          <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
            !
          </span>
          {error.message}
        </p>
      )}
    </div>
  );
};

