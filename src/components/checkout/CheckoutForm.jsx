import React from "react";
import {  useFormContext } from "react-hook-form";

const CheckoutForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-10">
      <h1 className="text-4xl font-medium">Thông tin vận chuyển</h1>
      <div className="space-y-4 mt-4">
        <label className=" flex items-center gap-2 group cursor-pointer select-none">
          <input type="checkbox" className="sr-only " />
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
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-3 font-semibold text-neutral-700">
                Họ tên
              </label>
              <input
                {...register("fullName")}
                placeholder="Nhập họ tên của bạn"
                className={`px-5 py-3 border rounded-full outline-none text-md transition-all 
                  focus:ring-1 focus:ring-neutral-600 
                placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold
                placeholder-shown:bg-white
             not-placeholder-shown:bg-blue-50
             not-placeholder-shown:border-blue-200"
        ${
          errors.fullName
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
              />
              {errors.fullName && (
                <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    !
                  </span>
                  {errors.fullName.message}
                </p>
              )}
            </div>
            {/* Số điện thoại */}
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-3 font-semibold text-neutral-700">
                Số điện thoại
              </label>
              <input
                {...register("phoneNumber")}
                placeholder="Nhập số điện thoại"
                className={`px-5 py-3 border rounded-full outline-none text-md transition-all 
                  focus:ring-1 focus:ring-neutral-600 
                placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold
                placeholder-shown:bg-white
             not-placeholder-shown:bg-blue-50
             not-placeholder-shown:border-blue-200"
        ${
          errors.phoneNumber
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    !
                  </span>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          {/* email */}
          <div className="space-y-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-3 font-semibold text-neutral-700">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Nhập email của bạn"
                className={`px-5 py-3 border rounded-full outline-none text-md transition-all 
                  focus:ring-1 focus:ring-neutral-600 
                placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold
                placeholder-shown:bg-white
             not-placeholder-shown:bg-blue-50
             not-placeholder-shown:border-blue-200"
        ${
          errors.email
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    !
                  </span>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          {/* Địa chỉ cụ thể */}
          <div className="space-y-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-3 font-semibold text-neutral-700">
                Địa chỉ cụ thể
              </label>
              <input
                {...register("addressDetail")}
                placeholder="Nhập địa chỉ cụ thể"
                className={`px-5 py-3 border rounded-full outline-none text-md transition-all 
                  focus:ring-1 focus:ring-neutral-600 
                placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold
                placeholder-shown:bg-white
             not-placeholder-shown:bg-blue-50
             not-placeholder-shown:border-blue-200"
        ${
          errors.addressDetail
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
              />
              {errors.addressDetail && (
                <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    !
                  </span>
                  {errors.addressDetail.message}
                </p>
              )}
            </div>
          </div>
          {/* Thành phố/ xã */}
          <div className="space-y-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-3 font-semibold text-neutral-700">
                Địa chỉ cụ thể
              </label>
              <input
                {...register("addressDetail")}
                placeholder="Nhập địa chỉ cụ thể"
                className={`px-5 py-3 border rounded-full outline-none text-md transition-all 
                  focus:ring-1 focus:ring-neutral-600 
                placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold
                placeholder-shown:bg-white
             not-placeholder-shown:bg-blue-50
             not-placeholder-shown:border-blue-200"
        ${
          errors.addressDetail
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
              />
              {errors.addressDetail && (
                <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    !
                  </span>
                  {errors.addressDetail.message}
                </p>
              )}
            </div>
          </div>
          {/* Ghi chú */}
          <div className="space-y-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-3 font-semibold text-neutral-700">
                Ghi chú
              </label>
              <input
                {...register("note")}
                placeholder="Nhập ghi chú (Nếu có)"
                className={`px-5 py-3 border rounded-full outline-none text-md transition-all 
                  focus:ring-1 focus:ring-neutral-600 
                placeholder:text-neutral-400 placeholder:text-md placeholder:font-semibold
                placeholder-shown:bg-white
             not-placeholder-shown:bg-blue-50
             not-placeholder-shown:border-blue-200"
        ${
          errors.note
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
              />
              {errors.note && (
                <p className="text-red-600 text-xs flex items-center gap-1 font-semibold mt-1 ml-3">
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    !
                  </span>
                  {errors.note.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
