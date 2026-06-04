import React, { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";
import { Link } from "react-router-dom";
import WishlistButton from "@/components/common/WishlistButton";
import useCartStore from "@/store/useCartStore";
import { showAddToCartToast } from "@/components/common/AddToCartToast";
import useAuthStore from "@/store/useAuthStore";

const ListProItemCard = ({ productData }) => {
  // console.log("productData", productData);
  const { addToCart } = useCartStore();
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const user = useAuthStore((state) => state.user);
  const handleAddToCart = async (sizeValueId) => {
    // Tìm SKU khớp với color đang chọn + size được click
    const matchedSku = productData?.skus?.find((sku) => {
      const hasSize =
        sizeValueId !== undefined
          ? sku.attributeValues?.some(
              (attr) => attr.attributeId === 2 && attr.valueId === sizeValueId,
            )
          : true;
      const hasColor = selectedColor
        ? sku.attributeValues?.some(
            (attr) => attr.attributeId === 3 && attr.valueId === selectedColor,
          )
        : true;
      return hasSize && hasColor;
    });

    if (!matchedSku) return;

    // Lấy thông tin variant để hiển thị trong toast
    const sizeAttr = matchedSku.attributeValues?.find(
      (a) => a.attributeId === 2,
    );
    const colorAttr = matchedSku.attributeValues?.find(
      (a) => a.attributeId === 3,
    );
    const variantLabel = [colorAttr?.valueName, sizeAttr?.valueName]
      .filter(Boolean)
      .join(" / ");

    setIsAdding(true);
    try {
      await addToCart(matchedSku.id, 1);

      // Custom toast với thông tin sản phẩm + nút xem giỏ hàng
      showAddToCartToast({
        imageUrl: firstImage,
        productName: productData?.name,
        variantLabel,
        price: matchedSku.price ?? productData?.basePrice ?? 0,
      });
    } catch {
      // Lỗi đã được handle trong store
    } finally {
      setIsAdding(false);
    }
  };

  const activeSku = useMemo(() => {
    if (selectedColor) {
      const skuWithColor = productData?.skus?.find((sku) =>
        sku.attributeValues?.some(
          (attr) => attr.attributeId === 3 && attr.valueId === selectedColor,
        ),
      );
      if (skuWithColor) return skuWithColor;
    }
    return productData?.skus?.[0];
  }, [productData, selectedColor]);

  // Fallback images
  const firstImage =
    activeSku?.images?.[0]?.imageUrl ||
    productData?.images?.[0]?.imageUrl ||
    "https://placehold.co/400x600?text=No+Image";
  const secondImage =
    activeSku?.images?.[1]?.imageUrl ||
    productData?.images?.[1]?.imageUrl ||
    firstImage;

  // Extract unique sizes and colors
  const { sizes, colors } = useMemo(() => {
    const s = [];
    const c = [];
    productData?.skus?.forEach((sku) => {
      sku.attributeValues?.forEach((attr) => {
        // attributeId 2 is Size, 3 is Color
        if (
          attr.attributeId === 2 &&
          !s.some((x) => x.valueId === attr.valueId)
        ) {
          s.push(attr);
        }
        if (
          attr.attributeId === 3 &&
          !c.some((x) => x.valueId === attr.valueId)
        ) {
          c.push(attr);
        }
      });
    });
    const sizeOrder = [
      "XXS",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "2XL",
      "3XL",
      "4XL",
    ];

    return {
      sizes: s.sort((a, b) => {
        const idxA = sizeOrder.indexOf(a.valueName?.toUpperCase());
        const idxB = sizeOrder.indexOf(b.valueName?.toUpperCase());

        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;

        const numA = parseFloat(a.valueName);
        const numB = parseFloat(b.valueName);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;

        return a.valueName.localeCompare(b.valueName);
      }),
      colors: c,
    };
  }, [productData]);

  // Sizes available for the selected color
  const availableSizeIds = useMemo(() => {
    if (!selectedColor) return sizes.map((s) => s.valueId);

    const available = [];
    productData?.skus?.forEach((sku) => {
      const hasColor = sku.attributeValues?.some(
        (attr) => attr.attributeId === 3 && attr.valueId === selectedColor,
      );
      if (hasColor && sku.isActive !== false && sku.stockQuantity > 0) {
        const sizeAttr = sku.attributeValues?.find(
          (attr) => attr.attributeId === 2,
        );
        if (sizeAttr && !available.includes(sizeAttr.valueId)) {
          available.push(sizeAttr.valueId);
        }
      }
    });
    return available;
  }, [productData, selectedColor, sizes]);

  return (
    <div className="space-y-4 block  ">
      <div className="relative overflow-hidden w-full cursor-pointer group">
        <Link to={`/product-detail/${productData?.id}/${productData?.slug}`}>
          <img
            src={firstImage}
            alt={productData?.name || "Product"}
            className="rounded-xl w-full object-cover h-full aspect-3/4 object-top transition-opacity duration-300 group-hover:opacity-0"
          />
          <img
            src={secondImage}
            alt={productData?.name || "Product"}
            className="rounded-xl w-full object-cover h-full aspect-3/4 object-top absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        {isAdding && (
          <div className="absolute inset-0 rounded-xl bg-black/50 flex flex-col items-center justify-center z-30 backdrop-blur-[2px] transition-all duration-300">
            <svg
              className="animate-spin w-10 h-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-white text-sm font-semibold mt-3 tracking-wide">
              Đang thêm...
            </p>
          </div>
        )}

        {/* Nút yêu thích nổi góc trên phải */}
        {/* {user && (
          <div className="absolute top-2 right-2 z-20">
            <WishlistButton
              product={{
                id: productData?.id,
                name: productData?.name,
                price: productData?.basePrice || 0,
                image: firstImage
              }}
              size="sm"
              variant="icon"
              className="shadow-md"
            />
          </div>
        )} */}
        <div
          className={`opacity-0 group-hover:opacity-100 absolute bottom-2 left-2 bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 w-[calc(100%-1rem)] transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 ${sizes.length === 0 ? "cursor-pointer min-h-15 flex items-center justify-center hover:bg-neutral-200" : ""}`}
          onClick={(e) => {
            if (sizes.length === 0 && !isAdding) {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }
          }}
        >
          <div className="flex justify-center items-center gap-2 text-sx font-medium text-neutral-800">
            Thêm nhanh vào giỏ hàng{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
            </svg>{" "}
          </div>
          {sizes.length > 0 && (
            <ul className="flex flex-wrap gap-2 items-center justify-center mt-2">
              {sizes.map((size) => {
                const isAvailable = availableSizeIds.includes(size.valueId);
                return (
                  <li key={size.valueId}>
                    <button
                      type="button"
                      disabled={!isAvailable || isAdding}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isAvailable && !isAdding)
                          handleAddToCart(size.valueId);
                      }}
                      className={`relative px-2 min-w-9 rounded-xl h-9 inline-flex items-center justify-center font-medium transition-colors duration-300 ${
                        !isAvailable || isAdding
                          ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                          : "bg-white text-neutral-900 hover:bg-neutral-800 hover:text-white cursor-pointer"
                      }`}
                    >
                      {size.valueName}
                      {!isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                          <div className="w-full h-px bg-neutral-400 rotate-[-30deg]"></div>
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          {colors.length > 0 &&
            colors.map((color) => (
              <button
                key={color.valueId}
                title={color.valueName}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColor(color.valueId);
                }}
                type="button"
                className={`w-10 min-w-5 rounded-full h-6 cursor-pointer ring-1 ring-offset-1 transition-all duration-300 ${selectedColor === color.valueId ? "ring-neutral-800 scale-110" : "ring-neutral-300 hover:scale-110"}`}
                style={{ backgroundColor: color.description || "#000" }}
              ></button>
            ))}
        </div>
        <h2 className="text-sx text-neutral-800 font-medium hover:text-blue-500 transition-colors duration-300 cursor-pointer w-full truncate ">
          <Link to={`/product-detail/${productData?.id}/${productData?.slug}`}>
            {productData?.name}
          </Link>
        </h2>
        <div className="flex justify-start items-center gap-2 font-bold">
          <p className="text-sx text-neutral-900 ">
            {formatCurrency(productData?.basePrice || 0)}
          </p>
          {/* Mute discount for now as it's not in the data model yet */}
          {/* <p className="text-sx text-red-500 ">-10%</p>
          <p className="text-sm text-neutral-500 line-through">
            {formatCurrency(100000)}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ListProItemCard;
