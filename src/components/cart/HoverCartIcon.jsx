import React, { memo } from "react";
import { Link } from "react-router-dom";
import CartItemCard from "../card/home/CartItemCard";
import { ScrollArea } from "../ui/scroll-area";
import useCartStore from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";

const HoverCartIcon = ({ isHovered }) => {
  const { cartItems, totalAmount } = useCartStore();

  if (!isHovered) {
    return null;
  }

  return (
    <div className="absolute top-full -right-4 pt-5 z-100 animate-none w-120 ">
      <div className="absolute top-3 right-1 w-10 h-6 bg-white rotate-45 border-t border-l z-10" />
      <div className="relative w-full bg-white shadow-xl border rounded-lg p-4 z-0">
        <div className="pb-4 pt-2">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-neutral-400 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96L6.6 14L3 6H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2z"
                />
              </svg>
              <p className="text-sm max-w-70 text-center">
                Người ta có đôi có cặp, còn giỏ hàng của bạn thì… trống trơn
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-[15px] mb-4 pb-2 border-b ">
                <p className="text-neutral-500 font-medium ">
                  Tạm tính:{" "}
                  <span className="text-black font-semibold">
                    {formatCurrency(totalAmount)}
                  </span>{" "}
                  ({cartItems.length} sản phẩm)
                </p>
                <Link
                  to="/cart"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Xem tất cả
                </Link>
              </div>
              <ScrollArea className="max-h-75  overflow-y-auto pr-4">
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(HoverCartIcon);
