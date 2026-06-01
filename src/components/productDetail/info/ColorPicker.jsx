import React, { useMemo, useEffect } from 'react'

const ColorPicker = ({ productData, selectedColor, setSelectedColor }) => {
  const colors = useMemo(() => {
    const c = [];
    productData?.skus?.forEach(sku => {
      sku.attributeValues?.forEach(attr => {
        if (attr.attributeId === 3 && !c.some(x => x.valueId === attr.valueId)) {
          c.push(attr);
        }
      });
    });
    return c;
  }, [productData]);

  // Default select first color if none is selected
  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0].valueId);
    }
  }, [colors, selectedColor, setSelectedColor]);

  const selectedColorName = colors.find(c => c.valueId === selectedColor)?.valueName || "Đang cập nhật";

  if (colors.length === 0) return null;

  return (
    <div className='space-y-3'>
      <p className="text-xl text-neutral-900 font-semibold">
        Màu sắc: <span className="text-neutral-500">{selectedColorName}</span>
      </p>
      <div className="flex gap-4 items-center flex-wrap">
        {colors.map(color => (
          <button
            key={color.valueId}
            onClick={() => setSelectedColor(color.valueId)}
            title={color.valueName}
            type="button"
            className={`w-9 min-w-9 rounded-full h-9 cursor-pointer ring-2 ring-offset-2 transition-all duration-300 ${selectedColor === color.valueId ? "ring-neutral-800 scale-110" : "ring-transparent hover:ring-neutral-300 hover:scale-105"}`}
            style={{ backgroundColor: color.description || "#000" }}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;