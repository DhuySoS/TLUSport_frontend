import React, { useState, useEffect, useRef } from "react";
import useProductStore from "@/store/useProductStore";

const SearchBar = () => {
  const {
    fetchProducts,
    searchProducts,
    searchKeyword,
    setSearchKeyword,
    pagination,
    isLoading,
  } = useProductStore();

  const [inputValue, setInputValue] = useState(searchKeyword || "");
  const debounceRef = useRef(null);

  // Debounce search: 400ms sau khi người dùng ngừng gõ
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmed = inputValue.trim();
      if (trimmed) {
        searchProducts(trimmed, 1, pagination.pageSize || 10);
      } else {
        setSearchKeyword("");
        fetchProducts(1, pagination.pageSize || 10);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [inputValue]);

  const handleClear = () => {
    setInputValue("");
    setSearchKeyword("");
    fetchProducts(1, pagination.pageSize || 10);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClear();
  };

  const hasKeyword = inputValue.trim().length > 0;

  return (
    <div className="mb-5">
      {/* Search Input */}
      <div
        className="relative flex items-center"
        style={{
          background: "#f8fafc",
          borderRadius: "16px",
          border: "2px solid",
          borderColor: hasKeyword ? "#3b82f6" : "#e2e8f0",
          boxShadow: hasKeyword
            ? "0 0 0 4px rgba(59,130,246,0.10), 0 2px 8px rgba(59,130,246,0.08)"
            : "0 1px 4px rgba(0,0,0,0.06)",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
      >
        {/* Search Icon */}
        <span
          className="flex items-center justify-center pl-4"
          style={{
            color: hasKeyword ? "#3b82f6" : "#94a3b8",
            transition: "color 0.25s",
          }}
        >
          {isLoading ? (
            // Loading spinner
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="31.4"
                strokeDashoffset="10"
                strokeLinecap="round"
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </span>

        {/* Input */}
        <input
          id="product-search-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none px-3 py-3.5 text-[15px] font-medium text-slate-800 tracking-tight"
        />

        {/* Clear button */}
        {hasKeyword && (
          <button
            onClick={handleClear}
            type="button"
            title="Xóa tìm kiếm"
            className="flex items-center justify-center mr-2.5 w-7.5 h-7.5 rounded-full bg-slate-200 border-none cursor-pointer text-slate-500 transition-colors duration-200 shrink-0"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fee2e2";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e2e8f0";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Search hint */}
      {hasKeyword && !isLoading && (
        <p className="mt-2 text-[13px] text-slate-400 pl-1">
          Kết quả cho{" "}
          <span style={{ color: "#3b82f6", fontWeight: 700 }}>
            &ldquo;{inputValue.trim()}&rdquo;
          </span>{" "}
          — {/* Result count badge */}
          {hasKeyword && !isLoading && (
            <kbd className="rounded-xl text-sm ">
              {pagination.totalElements ?? 0} kết quả
            </kbd>
          )}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
