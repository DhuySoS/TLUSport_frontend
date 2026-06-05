import React from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/formatCurrency";
import { useNavigate } from "react-router-dom";

const AddToCartToast = ({ t, imageUrl, productName, variantLabel, price }) => {
  const navigate = useNavigate();

  const handleViewCart = () => {
    toast.dismiss(t);
    navigate("/cart");
  };
  return (
    <div className="flex flex-col items-start gap-3 bg-white border border-neutral-200 rounded-xl shadow-lg p-3 w-80">
      <div className="flex items-center justify-between w-full">
        <span className="text-xl text-neutral-900 font-semibold  ">
          Đã thêm vào giỏ
        </span>
        <button
          onClick={() => toast.dismiss(t)}
          className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors mt-0.5 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <hr className="w-full h-px bg-neutral-200" />
      {/* Nội dung */}
      <div className="flex items-center gap-4 ">
        {/* Ảnh sản phẩm */}
        <img
          src={imageUrl}
          alt={productName}
          className="w-14 h-18 object-cover rounded-lg shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1 mb-1">
            <p className="text-sm font-semibold text-neutral-800 line-clamp-2 leading-tight">
              {productName}
            </p>
          </div>

          {variantLabel && (
            <p className="text-xs text-neutral-500 mb-1">{variantLabel}</p>
          )}

          <p className="text-sm font-bold text-neutral-900 mb-2">
            {formatCurrency(price)}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end ">
        {/* Nút xem giỏ hàng */}
        <button
          onClick={handleViewCart}
          className="shrink-0 text-sm font-semibold cursor-pointer bg-neutral-800 text-white px-3 py-1.5 rounded-lg hover:bg-neutral-900 transition-colors whitespace-nowrap"
        >
          Xem giỏ hàng
        </button>
      </div>
    </div>
  );
};

export const showAddToCartToast = ({
  imageUrl,
  productName,
  variantLabel,
  price,
}) => {
  toast.custom(
    (t) => (
      <AddToCartToast
        t={t}
        imageUrl={imageUrl}
        productName={productName}
        variantLabel={variantLabel}
        price={price}
      />
    ),
    { duration: 6000, position: "top-right" },
  );
};

export default AddToCartToast;
