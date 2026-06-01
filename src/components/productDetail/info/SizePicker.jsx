import React, { useMemo, useEffect } from 'react'

const SizePicker = ({ productData, selectedSize, setSelectedSize, selectedColor }) => {
  const sizes = useMemo(() => {
    const s = [];
    productData?.skus?.forEach(sku => {
      sku.attributeValues?.forEach(attr => {
        if (attr.attributeId === 2 && !s.some(x => x.valueId === attr.valueId)) {
          s.push(attr);
        }
      });
    });
    return s.sort((a, b) => a.valueName.localeCompare(b.valueName));
  }, [productData]);

  const availableSizeIds = useMemo(() => {
    if (!selectedColor) return sizes.map(s => s.valueId);

    const available = [];
    productData?.skus?.forEach(sku => {
      const hasColor = sku.attributeValues?.some(attr => attr.attributeId === 3 && attr.valueId === selectedColor);
      // Ensure SKU exists for this color and has stock
      if (hasColor && sku.isActive !== false && sku.stockQuantity > 0) {
        const sizeAttr = sku.attributeValues?.find(attr => attr.attributeId === 2);
        if (sizeAttr && !available.includes(sizeAttr.valueId)) {
          available.push(sizeAttr.valueId);
        }
      }
    });
    return available;
  }, [productData, selectedColor, sizes]);

  // Default select first available size if none is selected or current is unavailable
  useEffect(() => {
    if (sizes.length > 0) {
      if (!selectedSize || !availableSizeIds.includes(selectedSize)) {
        if (availableSizeIds.length > 0) {
          setSelectedSize(availableSizeIds[0]);
        }
      }
    }
  }, [sizes, availableSizeIds, selectedSize, setSelectedSize]);

  const selectedSizeName = sizes.find(s => s.valueId === selectedSize)?.valueName || "Đang cập nhật";

  if (sizes.length === 0) return null;

  return (
    <div className="flex flex-wrap items-baseline justify-between ">
      <div className="space-y-3">
        <p className="text-xl text-neutral-900 font-semibold">
          Kích thước: <span className="text-neutral-500">{selectedSizeName}</span>
        </p>
        <ul className="flex flex-wrap gap-2 items-center  mt-2">
          {sizes.map((size) => {
            const isAvailable = availableSizeIds.includes(size.valueId);
            return (
              <li key={size.valueId}>
                <button
                  onClick={() => isAvailable && setSelectedSize(size.valueId)}
                  disabled={!isAvailable}
                  type="button"
                  className={`relative w-20 min-w-9 rounded-xl h-13 text-xl inline-flex items-center justify-center font-medium transition-all duration-300 ${!isAvailable
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                    : selectedSize === size.valueId
                      ? "bg-black text-white hover:bg-neutral-800 cursor-pointer"
                      : "bg-neutral-200 text-neutral-900 hover:bg-neutral-800 hover:text-white cursor-pointer"
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
      </div>

    </div>
  );
}

export default SizePicker;