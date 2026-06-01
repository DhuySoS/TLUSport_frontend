import React, { useState } from "react";

const ProductRichText = ({ productData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!productData) return null;

  return (
    <div className=" mx-auto   pt-20 ">
      <h2 className="text-xl md:text-3xl font-bold text-center text-neutral-800 mb-6">
        {productData.name}
      </h2>
      <div
        className={`relative transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? "max-h-fit" : "max-h-[300px]"
          }`}
      >
        <div
          className="text-neutral-500 text-md md:text-lg leading-relaxed text-start space-y-4"
          dangerouslySetInnerHTML={{ __html: productData.description || "<p>Đang cập nhật mô tả sản phẩm.</p>" }}
        />
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-neutral-100 to-transparent z-10" />
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-10 py-3 border border-neutral-800 rounded-full text-lg font-bold uppercase hover:bg-black hover:text-white transition-all duration-300 bg-white cursor-pointer"
        >
          {isExpanded ? "THU GỌN" : "XEM THÊM"}
        </button>
      </div>
    </div>
  );
};

export default ProductRichText;
