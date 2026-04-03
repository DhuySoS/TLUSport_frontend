import React, { memo } from "react";
import { Link } from "react-router-dom";
import CartItemCard from "../card/CartItemCard";
import { ScrollArea } from "../ui/scroll-area";

const HoverCartIcon = ({ isHovered }) => {
  if (!isHovered) {
    return null;
  }
  return (
    <div className="absolute top-full -right-4 pt-5 z-100 animate-none w-120 overflow-y-auto">
      <div className="absolute top-3 right-1 w-10 h-6 bg-white rotate-45 border-t border-l  z-10"></div>
      <div className="relative w-full bg-white shadow-xl border  rounded-lg p-4 z-0">
        <div className="py-4 ">
          <div className="flex justify-between items-center text-sm mb-4 border-b pb-2 ">
            <p className="text-neutral-400">
              Tạm tính: <span className="text-black">0₫</span> (0 sản phẩm)
            </p>
            <Link to={"/cart"} className="text-blue-500 hover:underline">Xem tất cả</Link>
          </div>
          <ScrollArea className="h-100 pr-4">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <CartItemCard key={index} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default HoverCartIcon;
