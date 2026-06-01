import { formatCurrency } from "@/lib/formatCurrency";
import useCartStore from "@/store/useCartStore";
import React from "react";

const VoucherCard = ({ couponData }) => {
  const { appliedCoupon, applyCoupon, unApplyCoupon } = useCartStore();

  const isSelected = appliedCoupon === couponData.code;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSelected) {
      unApplyCoupon();
    } else {
      applyCoupon(couponData.code);
    }

  };

  // Hiển thị mô tả giảm giá đúng format
  const discountLabel =
    couponData?.discountType === "PERCENT"
      ? `Giảm ${couponData?.discountValue}% cho đơn từ ${formatCurrency(couponData?.minOrderValue)}`
      : `Giảm ${formatCurrency(couponData?.discountValue)} cho đơn từ ${formatCurrency(couponData?.minOrderValue)}`;

  const remaining =
    couponData?.usageLimit != null
      ? couponData.usageLimit - couponData.usedCount
      : null;

  return (
    <div className="h-full w-full shrink-0">
      <div onClick={handleToggle}
        className="h-full w-full rounded-lg bg-neutral-100 
    relative after:absolute after:-left-3 after:top-1/2 after:-translate-y-1/2 after:w-6 after:h-6 after:bg-white after:rounded-full "
      >
        <div className="ml-6 border-l border-neutral-300 border-dashed h-full w-full">
          <div className="px-1 py-2 flex flex-col  justify-between h-full w-full relative">
            <div>
              <h2 className="text-lg font-semibold">
                {couponData?.code}
                {remaining != null && (
                  <span className="text-[10px] text-neutral-400 ml-2">(Còn {remaining})</span>
                )}
              </h2>
              <p className="text-sm text-neutral-500">
                {discountLabel}
              </p>
            </div>
            <p className="text-sm text-neutral-500">HSD: {new Date(couponData?.endDate).toLocaleDateString("vi-VN")}</p>
            <div className="absolute bottom-2 right-8 text-center">
              <input type="radio" name="voucher" id="" className="" readOnly checked={isSelected} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
