import React from "react";

const CheckoutForm = () => {
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

      </div>
    </div>
  );
};

export default CheckoutForm;
