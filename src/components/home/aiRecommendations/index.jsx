import React, { useState, useEffect } from "react";
import ListProItemCard from "@/components/card/home/ListProItemCard";
import productServices from "@/services/productServices";
import aiServices from "@/services/aiServices";
import { shuffleArray } from "@/lib/shuffleArray";
import useAuthStore from "@/store/useAuthStore";

const getPaginationRange = (current, total) => {
  const range = [];
  const siblingCount = 1;

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      range.push(i);
    }
    return range;
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < total - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = [];
    for (let i = 1; i <= leftItemCount; i++) {
      leftRange.push(i);
    }
    return [...leftRange, "...", total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = [];
    for (let i = total - rightItemCount + 1; i <= total; i++) {
      rightRange.push(i);
    }
    return [1, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = [];
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      middleRange.push(i);
    }
    return [1, "...", ...middleRange, "...", total];
  }
  return range;
};

const AiRecommendations = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, isLoading: authLoading } = useAuthStore();

  const fetchProducts = async (pageNumber) => {
    if (authLoading) return;
    setLoading(true);
    try {
      if (user?.userId) {
        // Thử nghiệm gọi API recommend từ backend AI (Python)
        const res = await aiServices.getRecommendations(user.userId, 8);
        console.log("Response from AI service:", res);

        if (res?.product_ids && res.product_ids.length > 0) {
          const productDetails = await Promise.all(
            res.product_ids.map(async (id) => {
              try {
                const productRes = await productServices.getProductDetail(id);
                return productRes.data;
              } catch (err) {
                console.error(`Lỗi khi lấy chi tiết sản phẩm ${id}:`, err);
                return null;
              }
            }),
          );
          const validProducts = productDetails.filter(Boolean);
          setProducts(shuffleArray(validProducts));
          setTotalPages(1); // Gợi ý AI không phân trang
        } else {
          // Fallback nếu không có gợi ý từ AI
          const res = await productServices.getAllProducts(pageNumber, 8);
          if (res?.data?.items) {
            setProducts(shuffleArray(res.data.items));
            setTotalPages(res.data.totalPage || 1);
          }
        }
      } else {
        // Khách chưa đăng nhập: Hiển thị sản phẩm mặc định
        const res = await productServices.getAllProducts(pageNumber, 8);
        if (res?.data?.items) {
          setProducts(shuffleArray(res.data.items));
          setTotalPages(res.data.totalPage || 1);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải AI recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      fetchProducts(page);
    }
  }, [page, authLoading, user]);

  return (
    <div className="space-y-15 mb-20">
      {/* <div className="w-full relative ">
        <img
          src="/banner/productBannerAI.jpg"
          alt="productBanner"
          className="w-full object-cover object-center aspect-4/3 md:aspect-19/6"
        />
        <div className="absolute bottom-1/2 left-0 px-15 text-left ">
          <h2 className="text-6xl font-bold text-gray-900 italic">
            AI <span className="text-blue-500">gợi ý </span> cho bạn
          </h2>
          <p className="text-gray-500 mt-4 text-xl">
            Cá nhân hóa phong cách thể thao theo bạn
          </p>
        </div>
      </div> */}
      <div className="px-15">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-medium text-neutral-800 ">
            Gợi ý cho bạn
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
          {products.map((product, index) => (
            <div key={product.id ? `${product.id}-${index}` : index}>
              <ListProItemCard productData={product} />
            </div>
          ))}
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex flex-col gap-4 animate-pulse"
              >
                <div className="bg-neutral-200 rounded-xl aspect-3/4 w-full" />
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-neutral-200 rounded-full" />
                  <div className="w-10 h-6 bg-neutral-200 rounded-full" />
                </div>
                <div className="bg-neutral-200 h-4 w-3/4 rounded" />
                <div className="bg-neutral-200 h-4 w-1/2 rounded" />
              </div>
            ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className={`px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:bg-neutral-100 transition-all duration-300 ${
                page === 1 || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Trước
            </button>

            {getPaginationRange(page, totalPages).map((p, idx) => {
              if (p === "...") {
                return (
                  <span
                    key={`dots-${idx}`}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 select-none font-bold animate-pulse"
                  >
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  disabled={loading}
                  className={`w-10 h-10 rounded-full border text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                    p === page
                      ? "bg-neutral-800 text-white border-neutral-800"
                      : "border-neutral-300 text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className={`px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:bg-neutral-100 transition-all duration-300 ${
                page === totalPages || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiRecommendations;
