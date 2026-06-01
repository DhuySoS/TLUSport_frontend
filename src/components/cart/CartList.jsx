import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import CartItem from "../card/cart/CartItem";
import useCartStore from "@/store/useCartStore";
import ConfirmDialog from "./ClearCartConfirmDialog";


const CartItemSkeleton = () => (
  <div className="w-full flex items-center border-t py-4 gap-2 animate-pulse">
    <div className="w-5 h-5 shrink-0 bg-neutral-200 rounded-sm" />
    <div className="flex-1 grid grid-cols-4 gap-4 items-center">
      <div className="col-span-1 rounded-xl bg-neutral-200 aspect-square self-start" />
      <div className="col-span-2 flex flex-col gap-3">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 rounded w-1/2" />
        <div className="h-8 bg-neutral-200 rounded w-full" />
      </div>
      <div className="col-start-4 flex flex-col gap-2 items-end">
        <div className="h-5 bg-neutral-200 rounded w-24" />
      </div>
    </div>
  </div>
);

const CartList = () => {
  const { cartItems, isLoading, selectedItemIds, toggleSelectAll, clearCart } = useCartStore();
  const allSelected = cartItems.length > 0 && selectedItemIds.length === cartItems.length;
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCart = () => {
    setShowConfirm(false);
    clearCart();
  };

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          title="Xóa toàn bộ giỏ hàng?"
          description="Tất cả sản phẩm trong giỏ sẽ bị xóa. Hành động này không thể hoàn tác."
          confirmLabel="Xóa tất cả"
          onConfirm={handleClearCart}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div className="w-full md:h-full flex flex-col gap-4 md:min-h-0">
        <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 group cursor-pointer select-none relative">
            <input
              type="checkbox"
              className="absolute opacity-0 w-0 h-0"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            <div
              className={`w-5 h-5 shrink-0 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${allSelected ? "border-blue-700" : "border-neutral-500"
                }`}
            >
              <span
                className={`w-3 h-3 rounded-[1px] bg-blue-700 transition-opacity duration-200 ${allSelected ? "opacity-100" : "opacity-0"
                  }`}
              />
            </div>
            <span className="text-sm font-semibold">Chọn tất cả sản phẩm</span>
          </label>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm font-semibold text-red-500 cursor-pointer hover-underline-animation after:bg-red-500"
          >
            Xóa tất cả
          </button>
        </div>

        <ScrollArea className="md:overflow-y-auto md:flex-1 md:min-h-0 w-full">
          {isLoading ? (
            <>
              <CartItemSkeleton />
              <CartItemSkeleton />
              <CartItemSkeleton />
            </>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96L6.6 14L3 6H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2z"
                />
              </svg>
              <p className="text-lg font-semibold">Giỏ hàng của bạn đang trống</p>
              <p className="text-sm">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </ScrollArea>
      </div>
    </>
  );
};

export default CartList;
