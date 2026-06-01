import React, { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const SidebarFilter = ({ availableFilters, selectedAttributes, setSelectedAttributes, selectedCategoryId, setSelectedCategoryId, minPrice, setMinPrice, maxPrice, setMaxPrice, isMobile = false }) => {
  const priceRanges = [
    { label: "Tất cả", min: "", max: "" },
    { label: "Dưới 100.000đ", min: "0", max: "100000" },
    { label: "100.000đ - 200.000đ", min: "100000", max: "200000" },
    { label: "200.000đ - 500.000đ", min: "200000", max: "500000" },
    { label: "Trên 500.000đ", min: "500000", max: "" },
  ];

  const handlePriceSelect = (range) => {
    setMinPrice(range.min);
    setMaxPrice(range.max);
  };
  const handleToggle = (valueId) => {
    if (!setSelectedAttributes) return;
    setSelectedAttributes(prev => {
      if (prev.includes(valueId)) {
        return prev.filter(id => id !== valueId);
      }
      return [...prev, valueId];
    });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategoryId(prev => prev === catId ? null : catId);
    setSelectedAttributes([]);
  };

  const sizes = availableFilters?.sizes || [];
  const colors = availableFilters?.colors || [];
  const categories = availableFilters?.categories || [];

  return (
    <div className={isMobile ? "w-full pb-10" : "w-100 sticky top-28 pr-5 self-start"}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-neutral-900 font-medium">Bộ lọc</h2>
      </div>
      <hr className="bg-neutral-900/20 my-4" />
      <Accordion
        type="multiple"
        defaultValue={["category", "price", "size", "color"]}
        className="max-w-lg space-y-4"
      >
        {categories.length > 0 && (
          <AccordionItem value="category" key="category">
            <AccordionTrigger className="font-bold text-md text-neutral-900 cursor-pointer hover:no-underline">
              Danh mục
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 mt-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${selectedCategoryId === cat.id
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}


        {sizes.length > 0 && (
          <AccordionItem value="size" key={"size"}>
            <AccordionTrigger className="font-bold text-md text-neutral-900 cursor-pointer hover:no-underline">
              Kích thước
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3 mt-2">
                {sizes.map(size => (
                  <label key={size.valueId} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
                      checked={selectedAttributes?.includes(size.valueId) || false}
                      onChange={() => handleToggle(size.valueId)}
                    />
                    <span className="text-md font-medium text-neutral-700">{size.valueName}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {colors.length > 0 && (
          <AccordionItem value="color" key={"color"}>
            <AccordionTrigger className="font-bold text-md text-neutral-900 cursor-pointer hover:no-underline">
              Màu sắc
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-4 mt-2 px-2">
                {colors.map(color => {
                  const isSelected = selectedAttributes?.includes(color.valueId) || false;
                  const colorCode = color.description || '#000';
                  return (
                    <div
                      key={color.valueId}
                      className={`w-14 h-8 rounded-full  cursor-pointer transition-all ${isSelected ? "ring-2 ring-offset-2 ring-neutral-900" : "ring-1 ring-neutral-200"
                        }`}
                      style={{ backgroundColor: colorCode }}
                      onClick={() => handleToggle(color.valueId)}
                      title={color.valueName}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price" key="price">
          <AccordionTrigger className="font-bold text-md text-neutral-900 cursor-pointer hover:no-underline">
            Mức giá
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 mt-2 px-1">
              {priceRanges.map((range, idx) => {
                const isActive = (minPrice || "") === range.min && (maxPrice || "") === range.max;
                return (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="priceRange"
                      className="w-5 h-5 border-gray-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
                      checked={isActive}
                      onChange={() => handlePriceSelect(range)}
                    />
                    <span className={`text-md transition-colors ${isActive ? "text-neutral-900 font-bold" : "text-neutral-700 font-medium group-hover:text-neutral-900"}`}>
                      {range.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}

export default SidebarFilter;