import { formatCurrency } from "@/lib/formatVND";
import React from "react";

const ProductList = () => {
  return (
    <div className="px-15">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-medium text-neutral-800 ">Đồ thể thao</h2>
        <button className="text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors duration-300 cursor-pointer">
          Xem thêm
        </button>
      </div>
      <div className="grid grid-cols-4">
        <div className="space-y-4 block  ">
          <div className="relative overflow-hidden w-full cursor-pointer group">
            <img
              src="/product/product_1/picInHome_1.jpg"
              alt="picInHome"
              className="rounded-xl w-full object-cover h-full object-top"
            />
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 left-2 bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 w-[calc(100%-1rem)] transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
              <div className="flex justify-center items-center gap-2 text-sx font-medium text-neutral-800">
                Thêm nhanh vào giỏ hàng{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                  />
                </svg>{" "}
              </div>
              <ul className="flex flex-wrap gap-2 items-center justify-center mt-2">
                <li>
                  <button
                    type="button"
                    className="w-15 min-w-9 rounded-xl h-9 bg-white inline-flex items-center justify-center font-medium hover:bg-neutral-800 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    M
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-15 min-w-9 rounded-xl h-9 bg-white inline-flex items-center justify-center font-medium hover:bg-neutral-800 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    L
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-15 min-w-9 rounded-xl h-9 bg-white inline-flex items-center justify-center font-medium hover:bg-neutral-800 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    XL
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-15 min-w-9 rounded-xl h-9 bg-white inline-flex items-center justify-center font-medium hover:bg-neutral-800 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    XXL
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <button
                type="button"
                className="w-15 min-w-9 rounded-full h-9 bg-red-500 ring-2 ring-offset-1 ring-red-500 cursor-pointer"
              ></button>
              <button
                type="button"
                className="w-15 min-w-9 rounded-full h-9 bg-blue-500 cursor-pointer"
              ></button>
              <button
                type="button"
                className="w-15 min-w-9 rounded-full h-9 bg-black cursor-pointer"
              ></button>
            </div>
            <h2 className="text-sx text-neutral-700 font-medium hover:text-blue-500 transition-colors duration-300 cursor-pointer w-full truncate ">
              Short nam 6inch Pickleball Smash Shot Short nam 6inch Pickleball
              Smash Shot{" "}
            </h2>
            <p className="text-sx text-neutral-900 font-bold">
              {formatCurrency(100000)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
