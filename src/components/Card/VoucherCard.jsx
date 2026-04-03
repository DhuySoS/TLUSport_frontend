import React from "react";

const VoucherCard = () => {
  return (
    <div className="h-30 w-1/2 shrink-0">
      <div
        className="h-full w-full rounded-lg bg-neutral-100 
    relative after:absolute after:-left-3 after:top-1/2 after:-translate-y-1/2 after:w-6 after:h-6 after:bg-white after:rounded-full "
      >
        <div className="ml-6 border-l border-neutral-300 border-dashed h-full w-full">
          <div className="px-1 py-2 flex flex-col  justify-between h-full w-full relative">
            <div>
              <h2 className="text-lg font-semibold">
                SportNew{" "}
                <span className="text-[10px] text-neutral-400">(Còn 92)</span>
              </h2>
              <p className="text-sm text-neutral-500">
                Giảm 20% tối đa 100k cho đơn hàng từ 500k
              </p>
            </div>
            <p className="text-sm text-neutral-500">HSD: 04/04/2026</p>
            <div className="absolute bottom-2 right-8 text-center">
              <input type="radio" name="voucher" id="" className="" />
              <p className="text-sm text-blue-600">Điều kiện</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
