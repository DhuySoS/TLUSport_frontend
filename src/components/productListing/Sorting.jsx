import React from "react";

const Sorting = ({ sortBy, setSortBy, selectedAttributes = [], setSelectedAttributes, availableFilters }) => {
  const allFilters = [...(availableFilters?.sizes || []), ...(availableFilters?.colors || [])];

  const handleRemoveFilter = (valueId) => {
    if (setSelectedAttributes) {
      setSelectedAttributes(prev => prev.filter(id => id !== valueId));
    }
  };

  const handleClearAll = () => {
    if (setSelectedAttributes) {
      setSelectedAttributes([]);
    }
  };

  return (
    <div className="pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {selectedAttributes.map(valueId => {
          const filter = allFilters.find(f => f.valueId === valueId);
          if (!filter) return null;
          return (
            <div key={valueId} className="flex items-center justify-between py-1 px-2 rounded-lg border text-neutral-600 text-md border-neutral-200 bg-white">
              {filter.valueName}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="cursor-pointer ml-1 text-neutral-800"
                onClick={() => handleRemoveFilter(valueId)}
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </div>
          );
        })}
        {selectedAttributes.length > 0 && (
          <p 
            onClick={handleClearAll}
            className="text-blue-500 text-md font-bold cursor-pointer hover-underline-animation after:bg-blue-500"
          >
            Xóa lọc
          </p>
        )}
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
        <span className="text-neutral-600 text-md md:text-lg font-bold hidden sm:inline">Phân loại</span>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-neutral-100 rounded-full py-2.5 md:py-4 px-3 text-sm md:text-md font-semibold text-neutral-500 focus:outline-none bg-neutral-100 w-full sm:w-auto cursor-pointer"
        >
          <option value="newest" >Mới nhất</option>
          <option value="price_asc">Giá: Thấp đến cao</option>
          <option value="price_desc">Giá: Cao đến thấp</option>
          <option value="name_asc">Tên A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default Sorting;
