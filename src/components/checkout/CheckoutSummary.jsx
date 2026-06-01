import React, { useEffect, useState } from "react";
import CheckoutItem from "../card/checkout/CheckoutItem";
import { formatCurrency } from "@/lib/formatCurrency";
import useCartStore from "@/store/useCartStore";
import { useFormContext } from "react-hook-form";
import shippingMethodServices from "@/services/shippingMethodServices";

const CheckoutSummary = () => {
  const { getSelectedItems, getSelectedTotal, getDiscount, getFinalTotal, appliedCoupon } = useCartStore();
  const { watch } = useFormContext();
  const selectedItems = getSelectedItems();
  const subTotal = getSelectedTotal();
  const discount = getDiscount();
  const baseTotal = getFinalTotal();

  const [shippingMethods, setShippingMethods] = useState([]);
  const selectedShippingId = watch("shippingMethodId");

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await shippingMethodServices.getActiveMethods();
        setShippingMethods(res.data || []);
      } catch (error) {
        console.error("Lỗi tải phí vận chuyển:", error);
      }
    };
    fetchMethods();
  }, []);

  const selectedMethod = shippingMethods.find((m) => String(m.id) === String(selectedShippingId));
  const shippingCost = selectedMethod ? Number(selectedMethod.cost) : 0;
  const finalTotal = baseTotal + shippingCost;

  return (
    <div className="mt-10 mb-20 ">
      <h1 className="text-5xl font-medium">Đơn hàng của bạn</h1>
      <div className="mt-5">

        <div className="mt-3 border-b max-h-[400px] overflow-y-auto pr-2">
          {selectedItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="px-4 py-8 ">
        <h1 className="text-2xl font-medium">Chi tiết thanh toán</h1>
        <div className="mt-4">
          <ul className="text-lg font-semibold text-neutral-600">
            <li className="border-b py-3">
              <div className="flex justify-between items-center">
                <p>Tạm tính</p>
                <p>{formatCurrency(subTotal)}</p>
              </div>
            </li>
            <li className="border-b py-4">
              <div className="flex justify-between items-center">
                <p>
                  Voucher giảm giá
                  {appliedCoupon && <span className="text-sm font-normal text-neutral-500 ml-2">({appliedCoupon})</span>}
                </p>
                <p className="text-blue-500">- {formatCurrency(discount)}</p>
              </div>
            </li>
            <li className="border-b py-4">
              <div className="flex justify-between items-center">
                <p>Phí giao hàng</p>
                <p>{shippingCost === 0 ? "Miễn phí" : formatCurrency(shippingCost)}</p>
              </div>
            </li>
            <li className="border-b py-4">
              <div className="flex justify-between items-center text-black">
                <p className="text-2xl">Thành tiền</p>
                <div className="space-y-2 text-end">
                  <p className="text-xl text-red-500 font-bold">{formatCurrency(finalTotal)}</p>
                  {discount > 0 && (
                    <p className="text-sm text-neutral-500 font-normal">
                      Đã giảm {formatCurrency(discount)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
