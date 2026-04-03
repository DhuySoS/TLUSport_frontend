import { formatCurrency } from "@/lib/formatCurrency";
import React from "react";
import CartVoucher from "./CartVoucher";

const CartSummary = () => {
  return (
    <div className="w-full h-full  min-h-0 relative">
      <h1 className="text-3xl font-bold">Tóm tắt đơn hàng</h1>
      <div className="space-y-4 my-8">
        <div className="flex justify-between">
          <p className="text-md font-semibold text-neutral-800">
            Tạm tính (1 sản phẩm)
          </p>
          <p className="text-md font-semibold text-neutral-800">
            {formatCurrency(160000)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-md font-semibold text-neutral-800">
            Phí vận chuyển
          </p>
          <p className="text-md font-semibold text-blue-500">Miễn phí</p>
        </div>
      </div>
      <CartVoucher />
      <div className="flex justify-between items-center border-t pt-6">
        <p className="text-3xl font-bold text-neutral-800">Tổng cộng</p>
        <p className="text-4xl font-bold text-red-500">
          {formatCurrency(160000)}
        </p>
      </div>
      <div className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-900 text-white font-semibold py-4 rounded-lg absolute bottom-0 left-0 cursor-pointer transition-colors duration-300">
        Thanh toán
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
