import React from "react";
import Sorting from "./Sorting";
import ListProItemCard from "../card/home/ListProItemCard";

// Skeleton card khi đang load
const SkeletonCard = () => (
  <div className="space-y-3 animate-pulse">
    <div
      style={{
        borderRadius: "12px",
        background: "#e2e8f0",
        aspectRatio: "3/4",
        width: "100%",
      }}
    />
    <div
      style={{
        height: "12px",
        borderRadius: "6px",
        background: "#e2e8f0",
        width: "60%",
      }}
    />
    <div
      style={{
        height: "12px",
        borderRadius: "6px",
        background: "#e2e8f0",
        width: "40%",
      }}
    />
  </div>
);

const ListProductSection = ({
  isLoading,
  products,
  pagination,
  sortBy,
  setSortBy,
  selectedAttributes,
  setSelectedAttributes,
  availableFilters,
  onLoadMore,
  isAddingMore,
}) => {
  const displayProducts = products?.items || [];
  const isEmpty = !isLoading && displayProducts.length === 0;

  return (
    <div className="flex-1 w-full">
      <Sorting
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        availableFilters={availableFilters}
      />

      {/* Product Grid */}
      {isLoading && displayProducts.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-4 grid-cols-2 gap-y-8">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center p-16 gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "#475569" }}>
            Không tìm thấy sản phẩm
          </p>
        </div>
      ) : (
        // Product grid
        <div
          className={`grid gap-4 md:grid-cols-4 grid-cols-2 gap-y-8 transition-opacity duration-300 ${
            isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {displayProducts.map((product, index) => (
            <ListProItemCard key={product.id ?? index} productData={product} />
          ))}
        </div>
      )}

      {/* Pagination info */}
      {!isLoading && !isEmpty && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            Hiển thị {displayProducts.length} /{" "}
            {pagination?.totalElements ?? displayProducts.length} sản phẩm
          </p>
          {pagination?.currentPage < pagination?.totalPage && (
            <button
              onClick={onLoadMore}
              disabled={isAddingMore}
              className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isAddingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-300 border-t-white rounded-full animate-spin" />
                  Đang tải...
                </>
              ) : (
                "Xem thêm"
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListProductSection;
