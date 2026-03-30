import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = () => {
  return (
    <div className="flex items-start gap-3">
      <Link className="overflow-hidden">
        <img
          src="/cart/example.jpg"
          alt="cart"
          className="w-25 h-30 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="flex-1">
        <div className="flex justify-between items-center text-neutral-800 mb-1">
          <Link className="font-semibold text-sm hover:underline">
            Áo thun nam tay ngắn cổ tròn in hình TLUSport
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-xs text-neutral-800/50">Trắng / XL</p>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-sm font-semibold text-neutral-800">10₫</p>
          <p className="text-sm font-semibold text-neutral-800/50 line-through">
            0₫
          </p>
        </div>
        <p className="text-sm text-neutral-800 mt-2">
          Số lượng: <span className="text-neutral-800">1</span>
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
