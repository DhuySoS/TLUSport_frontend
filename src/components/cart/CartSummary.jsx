import { formatCurrency } from "@/lib/formatCurrency";
import React from "react";
import CartVoucher from "./CartVoucher";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { selectedItemIds, getSelectedTotal, getDiscount, getFinalTotal, appliedCoupon } = useCartStore();
  const { isAuthenticated, setIsOpenLogin } = useAuthStore();
  const selectedTotal = getSelectedTotal();
  const discount = getDiscount();
  const finalTotal = getFinalTotal();
  const selectedCount = selectedItemIds?.length || 0;
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (selectedCount === 0) return;
    if (!isAuthenticated) {
      setIsOpenLogin(true);
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="w-full md:h-full md:min-h-0 md:relative">
      <h1 className="text-3xl font-bold">Tóm tắt đơn hàng</h1>
      <div className="space-y-4 my-8">
        <div className="flex justify-between">
          <p className="text-md font-semibold text-neutral-800">
            Tạm tính ({selectedCount} sản phẩm)
          </p>
          <p className="text-md font-semibold text-neutral-800">
            {formatCurrency(selectedTotal)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-md font-semibold text-neutral-800">
            Voucher giảm giá
            {appliedCoupon && <span className="text-xs text-neutral-400 ml-1">({appliedCoupon})</span>}
          </p>
          <p className="text-md font-semibold text-blue-500">- {formatCurrency(discount)}</p>
        </div>
      </div>
      <CartVoucher />
      <div className="flex justify-between items-center border-t pt-6">
        <p className="text-3xl font-bold text-neutral-800">Tổng cộng</p>
        <p className="text-4xl font-bold text-red-500">{formatCurrency(finalTotal)}</p>
      </div>
      <button
        onClick={handleCheckout}
        disabled={selectedCount === 0}
        className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-lg md:absolute md:bottom-0 md:left-0 cursor-pointer duration-300 transition-all ease-in-out mt-8 md:mt-0
          ${selectedCount === 0
            ? "bg-neutral-300 cursor-not-allowed"
            : "bg-neutral-800 hover:bg-neutral-900 hover:scale-105"
          }`}
      >
        {selectedCount === 0 ? "Chọn sản phẩm để thanh toán" : "Thanh toán"}
        {selectedCount > 0 && (
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
              <path
                fill="currentColor"
                d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
              />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
};

export default CartSummary;
