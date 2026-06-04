import React, { useState } from "react";
import useCartStore from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import ConfirmDialog from "@/components/cart/ClearCartConfirmDialog";
import { Link } from "react-router-dom";
import { slugify } from "@/lib/utils";

const CartItem = ({ item }) => {
  const { updateItem, removeItem, toggleSelectItem, selectedItemIds } =
    useCartStore();
  const isSelected = selectedItemIds.includes(item.id);
  const isOutOfStock = (item.stockQuantity ?? 0) === 0;

  const colorAttr = item.attributeValues?.find(
    (a) =>
      a.attributeName?.toLowerCase() === "color" ||
      a.attributeName?.toLowerCase() === "màu sắc",
  );
  const sizeAttr = item.attributeValues?.find(
    (a) =>
      a.attributeName?.toLowerCase() === "size" ||
      a.attributeName?.toLowerCase() === "kích thước",
  );

  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const [confirmConfig, setConfirmConfig] = useState(null);

  const closeConfirm = () => setConfirmConfig(null);

  const doUpdate = async (newQty) => {
    if (isUpdating) return;
    setIsUpdating(true);
    await updateItem(item.id, newQty);
    setIsUpdating(false);
  };

  const handleQuantityChange = (newQty) => {
    const validated = Math.max(0, newQty);

    // Khi giảm về 0 → hỏi xác nhận xóa
    if (validated === 0) {
      setConfirmConfig({
        title: "Xóa sản phẩm?",
        description: `"${item.productName}" sẽ bị xóa khỏi giỏ hàng.`,
        confirmLabel: "Xóa",
        onConfirm: async () => {
          closeConfirm();
          await removeItem(item.id);
        },
      });
      return;
    }

    setQuantity(validated);
    doUpdate(validated);
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setQuantity(val);
  };

  const handleInputBlur = () => {
    handleQuantityChange(quantity);
  };

  const handleRemoveClick = () => {
    setConfirmConfig({
      title: "Xóa sản phẩm?",
      description: `"${item.productName}" sẽ bị xóa khỏi giỏ hàng.`,
      confirmLabel: "Xóa",
      onConfirm: async () => {
        closeConfirm();
        await removeItem(item.id);
      },
    });
  };

  return (
    <>
      {confirmConfig && (
        <ConfirmDialog
          title={confirmConfig.title}
          description={confirmConfig.description}
          confirmLabel={confirmConfig.confirmLabel}
          onConfirm={confirmConfig.onConfirm}
          onCancel={closeConfirm}
        />
      )}

      <div
        className={`w-full flex items-center border-t py-4 gap-2 transition-opacity duration-200 ${isOutOfStock ? "opacity-50 select-none" : ""}`}
      >
        <label
          className={`flex items-center gap-2 select-none relative ${isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <input
            type="checkbox"
            className="absolute opacity-0 w-0 h-0"
            checked={isSelected}
            onChange={() => !isOutOfStock && toggleSelectItem(item.id)}
            disabled={isOutOfStock}
          />
          <div
            className={`w-5 h-5 shrink-0 border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
              isOutOfStock
                ? "border-neutral-300 bg-neutral-100"
                : isSelected
                  ? "border-blue-700"
                  : "border-neutral-500"
            }`}
          >
            <span
              className={`w-3 h-3 rounded-[1px] bg-blue-700 transition-opacity duration-200 ${
                !isOutOfStock && isSelected ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </label>

        <div className="flex-1 flex md:grid md:grid-cols-4 gap-3 md:gap-4 items-center">
          {/* Ảnh sản phẩm */}
          <div className="relative w-20 h-20 md:w-auto md:h-auto md:col-span-1 shrink-0 rounded-xl overflow-hidden aspect-square self-start">
            <Link
              to={`/product-detail/${item.productId}/${slugify(item.productName)}`}
              className="overflow-hidden shrink-0"
            >
              <img
                src={item.imageUrl || "/product/default.jpg"}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </Link>
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/45 flex items-center justify-center backdrop-blur-[1px]">
                <span className="text-white text-xs md:text-sm font-bold px-2 py-0.5 rounded bg-red-600/90 border border-red-500 shadow-md whitespace-nowrap">
                  HẾT HÀNG
                </span>
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-span-2 flex-1 md:flex-initial flex flex-col gap-2 my-2 justify-between min-w-0">
            <div className="flex flex-col gap-1.5 md:gap-3">
              <div className="flex justify-between items-start gap-2 w-full">
                <h2 className="font-bold text-neutral-800 line-clamp-2 text-sm md:text-base leading-tight md:leading-normal">
                  <Link
                    to={`/product-detail/${item.productId}/${slugify(item.productName)}`}
                    className="font-bold text-[15px] hover:underline line-clamp-2"
                  >
                    {item.productName}
                  </Link>
                </h2>
                {/* Mobile Price */}
                <div className="text-right md:hidden shrink-0">
                  <p className="text-sm font-bold text-neutral-800">
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    {formatCurrency(Number(item.price))} / cái
                  </p>
                </div>
              </div>

              {/* Variant tags */}
              <div className="flex gap-1.5 flex-wrap items-center">
                {colorAttr && (
                  <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full border">
                    {colorAttr.valueName}
                  </span>
                )}
                {sizeAttr && (
                  <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full border">
                    {sizeAttr.valueName}
                  </span>
                )}
                {!colorAttr &&
                  !sizeAttr &&
                  item.attributeValues?.map((a) => (
                    <span
                      key={a.valueId}
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full border"
                    >
                      {a.valueName}
                    </span>
                  ))}
              </div>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-start md:gap-3 mt-1 md:mt-0">
              {/* Quantity control */}
              <div
                className={`flex items-center text-xs md:text-sm border rounded-full w-fit px-1 py-0.5 ${isOutOfStock ? "bg-neutral-100 text-neutral-400" : "bg-white"}`}
              >
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={isUpdating || isOutOfStock}
                  className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full transition-colors ${
                    isOutOfStock
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:bg-neutral-100"
                  }`}
                >
                  −
                </button>
                <input
                  type="text"
                  className="w-7 md:w-9 border-none outline-none text-center bg-transparent"
                  value={quantity}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  disabled={isOutOfStock}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isUpdating || isOutOfStock}
                  className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full transition-colors ${
                    isOutOfStock
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:bg-neutral-100"
                  }`}
                >
                  +
                </button>
              </div>

              {/* Xóa */}
              <button
                onClick={handleRemoveClick}
                className="flex gap-1 items-center text-xs md:text-sm text-red-500 cursor-pointer hover:text-red-600 transition-colors w-fit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                >
                  <path
                    fill="currentColor"
                    d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"
                  />
                </svg>
                Xóa
              </button>
            </div>
          </div>

          {/* Giá (Desktop) */}
          <div className="hidden md:block col-start-4 text-end mr-4">
            <p className="text-lg font-bold text-neutral-800">
              {formatCurrency(Number(item.price) * item.quantity)}
            </p>
            <p className="text-xs text-neutral-500">
              {formatCurrency(Number(item.price))} / cái
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
