import React from "react";
import CartItem from "../card/CartItem";
import { ScrollArea } from "../ui/scroll-area";

const CartList = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 min-h-0">
      <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            name=""
            id="selectAll"
            className="cursor-pointer h-4 w-4"
          />
          <label htmlFor="selectAll">Chọn tất cả sản phẩm</label>
        </div>
        <button className="text-sm font-semibold text-red-500 cursor-pointer hover-underline-animation after:bg-red-500 ">
          Xóa tất cả
        </button>
      </div>
      <ScrollArea className="overflow-y-auto flex-1 min-h-0 ">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        
      </ScrollArea>
    </div>
  );
};

export default CartList;
