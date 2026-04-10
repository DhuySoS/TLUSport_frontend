import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutMethod from "@/components/checkout/CheckoutMethod";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { formatCurrency } from "@/lib/formatCurrency";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen w-full px-16 mx-auto max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 h-full w-full">
        <div>
          <CheckoutForm />
          <CheckoutMethod/>
        </div>
        <CheckoutSummary />
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex min-h-20 items-stretch gap-8 shadow-2xl">
        <div className="flex flex-1 items-center bg-blue-50 ">
          <div className="flex flex-1 items-center justify-center gap-1  ">
            Checkoutpage
          </div>
          <div class="relative w-px bg-neutral-900/20 mx-3 h-5"></div>
          <div className="flex flex-1 justify-center ">Checkoutpage</div>
        </div>
        <div className="flex flex-1 items-center gap-4 justify-end ">
          <div className="flex-1 text-center space-y-2">
            <h2 className="text-2xl font-bold">Tổng tiền: (2 sản phẩm)</h2>
            <p className="text-2xl font-bold text-blue-500">{formatCurrency(1000000)}</p>
          </div>
          <button
            type="button"
            className="py-8 px-6 text-2xl font-sans font-medium text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer  "
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
