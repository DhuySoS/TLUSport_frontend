import React, { useMemo } from "react";
import RenderStars from "../../common/RenderStars";
import { formatCurrency } from "@/lib/formatCurrency";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";
import QuantityAddToCart from "./QuantityAddToCart";
import SizeGuideModal from "./SizeGuideModal";
import useAuthStore from "@/store/useAuthStore";
import WishlistButton from "@/components/common/WishlistButton";

const ProductInfo = ({
  productData,
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
  const { user } = useAuthStore();
  const handleScroll = () => {
    const element = document.getElementById("description-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="p-2">
      <h1 className="text-2xl md:text-3xl font-bold mb-5">
        {productData?.name || "Product Name"}
      </h1>
      <div className="flex gap-2 text-2xl md:text-3xl items-center ">
        {RenderStars({ rating: Math.round(averageRating) })}
        <span className="font-semibold text-xl">({totalCount})</span>
      </div>
      <hr className="my-4" />
      <p className="text-3xl font-bold mb-2">{formatCurrency(price)}</p>
      <div className="flex items-center gap-2 ">
        <p className="text-md font-medium text-neutral-600">
          <span className="text-neutral-900 font-bold">
            {activeSku?.stockQuantity ?? 0}
          </span>{" "}
          sản phẩm trong kho
        </p>
      </div>
      <div className="my-5 space-y-6">
        <ColorPicker
          productData={productData}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <div className="flex  justify-between gap-4">
          <SizePicker
            productData={productData}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
          />
          <SizeGuideModal />
        </div>
        <div className="flex items-stretch gap-3">
          <div className="flex-1 mt-10 flex items-center gap-3 ">
            <QuantityAddToCart
              quantity={quantity}
              setQuantity={setQuantity}
              stock={activeSku?.stockQuantity || 1}
              handleAddToCart={handleAddToCart}
              isAdding={isAdding}
            />
            {user && (
              <WishlistButton
                productId={productData?.id}
                size="lg"
                variant="icon"
                className=" mb-0  shrink-0"
              />
            )}
          </div>
        </div>
      </div>
      <p
        className="text-center text-xl text-neutral-900 font-semibold mb-5 underline cursor-pointer"
        onClick={handleScroll}
      >
        Mô tả sản phẩm
      </p>
      <hr />
      <div className="bg-neutral-100 rounded-xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
          <div className="flex gap-3 items-center">
            <img
              src="/product/free-ship.svg"
              alt="freeship"
              className="h-12 w-12 object-cover"
            />
            <p className="font-medium text-md text-neutral-900">
              Free ship cho đơn từ 200k
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <img
              src="/product/return-60.svg"
              alt="return"
              className="h-12 w-12 object-cover"
            />
            <p className="font-medium text-md text-neutral-900">
              60 ngày đổi trả vì bất kỳ lý do gì
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <img
              src="/product/phone.svg"
              alt="phone"
              className="h-12 w-12 object-cover"
            />
            <p className="font-medium text-md text-neutral-900">
              Hotline 1900.27.27.37 <br /> hỗ trợ từ 8h30 - 22h
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <img
              src="/product/location.svg"
              alt="location"
              className="h-12 w-12 object-cover"
            />
            <p className="font-medium text-md text-neutral-900">
              Đến tận nơi nhận hàng trả, hoàn tiền 2-3 ngày (trừ T7, CN)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
