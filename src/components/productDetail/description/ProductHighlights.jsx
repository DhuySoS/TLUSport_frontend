import React from 'react'

const ProductHighlights = ({ productData }) => {

  const specs = productData?.specs?.length > 0 ? productData.specs : [];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:flex-1">
        <div className="flex items-center justify-around w-full">
          <div className="gap-2 flex flex-col items-center">
            <img
              src="/product/highLight_1.avif"
              alt="hl1"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <p className="text-xl font-bold text-neutral-900">Thấm hút</p>
          </div>
          <div className="gap-2 flex flex-col items-center">
            <img
              src="/product/highLight_2.avif"
              alt="hl2"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <p className="text-xl font-bold text-neutral-900">Siêu nhẹ</p>
          </div>
          <div className="gap-2 flex flex-col items-center">
            <img
              src="/product/highLight_3.avif"
              alt="hl3"
              className="w-20 h-20 rounded-xl object-cover"
            />
            <p className="text-xl font-bold text-neutral-900">Co giãn</p>
          </div>
        </div>
        <ul className="mt-10">
          {specs.map((spec, index) => (
            <li key={index} className=" border-b border-neutral-300 grid grid-cols-3 py-4 gap-4 items-start">
              <span className="text-md font-semibold text-neutral-500 uppercase tracking-wider leading-relaxed">
                {spec.attributeName}
              </span>
              <span className="col-span-2 text-md font-semibold text-neutral-800 whitespace-pre-line leading-relaxed">
                {spec.attributeValue}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <p className="text-2xl font-bold text-neutral-700 ">
            * Proudly Made In Vietnam
          </p>
        </div>
      </div>
      <div className="w-full lg:basis-2/3">
        <img
          src="/product/highLightThumb.avif"
          alt="thumb"
          className="w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}

export default ProductHighlights;