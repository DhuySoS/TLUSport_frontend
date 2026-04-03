import React, { useState } from "react";
import VariantSelector from "../common/VariantSelector";

const CartItem = () => {
  const handleQuantityChange = (newQuantity) => {
    // Xử lý logic thay đổi số lượng sản phẩm
    console.log("Số lượng mới:", newQuantity);
  }
  const [selectedColor, setSelectedColor] = useState("Trắng");
  const [selectedSize, setSelectedSize] = useState("XL");

  return (
    <div className="w-full flex items-center border-t py-4 gap-2">
      <input
        type="checkbox"
        name="selectedItems"
        id=""
        className="cursor-pointer h-4 w-4"
      />
      <div className="flex-1 grid grid-cols-4 gap-4 items-center">
        <div className="col-span-1 rounded-xl overflow-hidden aspect-square self-start">
          <img
            src="/product/product_1/picInHome_1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" col-span-2 flex flex-col gap-2 my-2 justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-neutral-800">
              Short nam 6inch Pickleball Smash Shot
            </h2>
            <p className="text-sm text-neutral-800/50">{selectedColor} / {selectedSize}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <VariantSelector
                  label={selectedColor}
                  options={["Trắng", "Đen", "Xanh Evergreen"]}
                  onSelect={setSelectedColor}
                />

                <VariantSelector
                  label={selectedSize}
                  options={["L", "XL", "2XL", "3XL"]}
                  onSelect={setSelectedSize}
                />
              </div>
              <div className="flex items-center text-sm border rounded-full w-fit px-1 py-2 ">
                <button className=" w-6 h-6 flex items-center justify-center cursor-pointer">
                  -
                </button>
                <input
                  type="text"
                  className="w-9 border-none outline-none text-center"
                  defaultValue={1}
                />
                <button className=" w-6 h-6 flex items-center justify-center cursor-pointer">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-1 items-center text-sm text-red-500 cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"
              />
            </svg>
            Xóa
          </div>
        </div>
        <div className="col-start-4 text-end mr-12">
          <p className="text-lg font-bold text-neutral-800">606.000₫</p>
          <p className="text-sm font-semibold text-neutral-800/50 line-through">
            0₫
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
