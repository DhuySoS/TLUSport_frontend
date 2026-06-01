import React, { useEffect, useState, useMemo } from "react";
import RenderStars from "../common/RenderStars";
import { formatCurrency } from "@/lib/formatCurrency";
import ColorPicker from "./info/ColorPicker";
import SizePicker from "./info/SizePicker";
import WishlistButton from "@/components/common/WishlistButton";

const StickyAddToCart = ({
  productData = null,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  handleAddToCart,
  isAdding,
  averageRating = 0,
  totalCount = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeSku = useMemo(() => {
    if (productData?.skus) {
      if (selectedColor && selectedSize) {
        return productData.skus.find(
          (sku) =>
            sku.attributeValues?.some(
              (attr) =>
                attr.attributeId === 3 && attr.valueId === selectedColor,
            ) &&
            sku.attributeValues?.some(
              (attr) => attr.attributeId === 2 && attr.valueId === selectedSize,
            ),
        );
      } else if (selectedColor) {
        return productData.skus.find((sku) =>
          sku.attributeValues?.some(
            (attr) => attr.attributeId === 3 && attr.valueId === selectedColor,
          ),
        );
      } else if (selectedSize) {
        return productData.skus.find((sku) =>
          sku.attributeValues?.some(
            (attr) => attr.attributeId === 2 && attr.valueId === selectedSize,
          ),
        );
      }
      return productData.skus[0];
    }
    return null;
  }, [productData, selectedColor, selectedSize]);

  const price = activeSku?.price || productData?.basePrice || 0;
  const stock = activeSku?.stockQuantity || 1;
  const fallbackImage =
    activeSku?.images?.[0]?.imageUrl ||
    productData?.skus?.[0]?.images?.[0]?.imageUrl ||
    productData?.images?.[0]?.imageUrl ||
    "https://placehold.co/400x600?text=No+Image";

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= stock) {
      setQuantity(val);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  if (!productData) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full  bg-white  border-b shadow-md z-100 transition-transform duration-300 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } hidden md:block`}
    >
      <div className="flex gap-6 items-stretch py-4 container mx-auto">
        <div className="flex gap-2 ">
          <img
            src={fallbackImage}
            alt={productData.name}
            className="max-h-30 rounded-lg object-cover w-20"
          />
          <div className="text-lg font-bold space-y-2 mt-2 truncate w-64">
            <p className="truncate" title={productData.name}>
              {productData.name}
            </p>
            <p className="text-red-600">{formatCurrency(price)}</p>
          </div>
        </div>
        <div className="pl-6 text-lg font-medium space-y-2 pt-2 text-neutral-700 border-l">
          <div className="flex items-center gap-2 text-xl">
            {<RenderStars rating={Math.round(averageRating)} />}{" "}
            <span>({totalCount})</span>
          </div>
          <p>Đã bán: {productData.soldCount}</p>
        </div>
        <div className="pl-6 border-l pt-2">
          <ColorPicker
            productData={productData}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <div className="pl-6 border-l pt-2 ">
          <SizePicker
            productData={productData}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
          />
        </div>
        <div className="pl-6 border-l pt-2 flex flex-1 items-center gap-4 ">
          <div className="shrink-0 rounded-full h-15 flex items-center border border-neutral-500 px-2  ">
            <button
              onClick={handleDecrease}
              className="w-5 h-10  text-neutral-900 font-bold text-2xl flex items-center justify-center mx-2 cursor-pointer "
            >
              -
            </button>
            <input
              type="text"
              className="text-neutral-900 text-center text-lg font-medium bg-transparent border-none focus:outline-none w-8"
              value={quantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <button
              onClick={handleIncrease}
              className="w-5 h-10 text-neutral-900 font-bold text-2xl flex items-center justify-center mx-2 cursor-pointer"
            >
              +
            </button>
          </div>
          <div
            className={`rounded-full w-full flex h-15 px-4 cursor-pointer transition-colors duration-300 ${isAdding ? "bg-neutral-500" : "bg-black hover:bg-neutral-800"}`}
            onClick={() => {
              if (!isAdding && handleAddToCart) {
                handleAddToCart();
              }
            }}
          >
            <p className="text-white text-md font-bold mx-auto my-auto flex items-center gap-2 whitespace-nowrap">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M6 6h24l-3 13H9m18 4H10L5 2H2" />
                    <circle cx="25" cy="27" r="2" />
                    <circle cx="12" cy="27" r="2" />
                  </g>
                </svg>
              </span>
              {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyAddToCart;
