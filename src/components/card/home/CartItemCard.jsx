import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { slugify } from "@/lib/utils";

const CartItemCard = ({ item }) => {
  const { removeItem } = useCartStore();

  // Tìm variant hiển thị
  const variantLabel = item.attributeValues
    ?.slice()
    .sort((a, b) => (a.attributeId === 3 ? -1 : 1))
    .map((a) => a.valueName)
    .join(" / ");

  return (
    <div className="flex items-start gap-3">
      <Link
        to={`/product-detail/${item.productId}/${slugify(item.productName)}`}
        className="overflow-hidden shrink-0"
      >
        <img
          src={item.imageUrl || "/product/default.jpg"}
          alt={item.productName}
          className="w-25 h-30 object-center aspect-square  rounded-xl hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="flex-1">
        <div className="flex justify-between items-start text-neutral-800 mb-1 gap-2">
          <Link
            to={`/product-detail/${item.productId}/${slugify(item.productName)}`}
            className="font-bold text-[15px] hover:underline line-clamp-2"
          >
            {item.productName}
          </Link>
          <button
            onClick={() => removeItem(item.id)}
            className="shrink-0 hover:text-red-500 transition-colors cursor-pointer"
          >
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
          </button>
        </div>
        {variantLabel && (
          <p className="text-xs text-neutral-600">{variantLabel}</p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <p className="text-sm font-semibold text-neutral-900">
            {formatCurrency(Number(item.price))}
          </p>
        </div>
        <p className="text-sm text-neutral-600 mt-1">
          Số lượng:{" "}
          <span className="font-semibold text-neutral-900">
            {item.quantity}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
