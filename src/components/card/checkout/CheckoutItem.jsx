import React from 'react'
import { formatCurrency } from '@/lib/formatCurrency'

const CheckoutItem = ({ item }) => {
  // Tìm variant hiển thị
  const variantLabel = item.attributeValues
    ?.slice()
    .sort((a, b) => (a.attributeId === 3 ? -1 : 1))
    .map((a) => a.valueName)
    .join(" / ");
  return (
    <div className="w-full flex items-center border-t py-3 gap-2 ">
      <div className="flex-1 grid grid-cols-5 gap-3 items-center">
        <div className="col-span-1 rounded-xl overflow-hidden aspect-square self-start ">
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" col-span-3 flex flex-col gap-2 my-2 justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-neutral-800">
              {item.productName}
            </h2>
            <p className="text-sm text-neutral-800/50">{variantLabel}</p>
            <div className="flex items-center text-xs ">
              <p>
                Số lượng: <span>{item.quantity}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-start-5 text-end ">
          <p className="text-lg font-bold text-neutral-800">
            {formatCurrency(Number(item.price) * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem