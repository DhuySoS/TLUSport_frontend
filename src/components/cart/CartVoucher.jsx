import React from 'react'
import VoucherCard from '../card/cart/VoucherCard'
import useCartStore from '@/store/useCartStore'

const CartVoucher = () => {
  const coupons = useCartStore((state) => state.coupons);

  return (
    <div className=" border-t border-b py-6 space-y-6 w-full">
      <h2 className="text-lg font-bold text-neutral-800">Mã giảm giá</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full border rounded-lg px-4 py-2 outline-none focus:border-neutral-500"
          placeholder="Nhập mã giảm giá"
        />
        <button className="text-sm text-nowrap font-semibold text-white cursor-pointer bg-neutral-800 hover:bg-neutral-900 py-2 px-4 rounded-lg">
          Áp dụng
        </button>
      </div>
      <div className="flex items-center gap-4 overflow-x-auto w-full pb-3">
        {coupons?.filter((coupon) => coupon.isActive === true).map((coupon) => (
          <div key={coupon.id} className="w-1/2 shrink-0 h-30">
            <VoucherCard couponData={coupon} />
          </div>
        ))}

      </div>
    </div>
  );
}

export default CartVoucher