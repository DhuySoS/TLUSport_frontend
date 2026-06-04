import React, { useState, useEffect } from "react";
import ListProItemCard from "@/components/card/home/ListProItemCard";
import productServices from "@/services/productServices";
import aiServices from "@/services/aiServices";
import { shuffleArray } from "@/lib/shuffleArray";
import useAuthStore from "@/store/useAuthStore";

const AiRecommendations = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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
          setHasMore(false); // Gợi ý AI không phân trang
        } else {
          // Fallback nếu không có gợi ý từ AI
          const res = await productServices.getAllProducts(pageNumber, 8);
          if (res?.data?.items) {
            setProducts(shuffleArray(res.data.items));
            setHasMore(false);
          }
        }
      } else {
        // Khách chưa đăng nhập: Hiển thị sản phẩm mặc định
        const res = await productServices.getAllProducts(pageNumber, 8);
        if (res?.data?.items) {
          if (pageNumber === 1) {
            setProducts(shuffleArray(res.data.items));
          } else {
            setProducts((prev) => [...prev, ...shuffleArray(res.data.items)]);
          }

          if (
            res.data.items.length < 8 ||
            res.data.currentPage >= res.data.totalPage
          ) {
            setHasMore(false);
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải AI recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchProducts(1);
    }
  }, [user, authLoading]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

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

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`px-8 py-3 rounded-full border cursor-pointer border-neutral-300 text-white font-medium bg-neutral-700 hover:bg-neutral-800 hover:text-white transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Đang tải..." : "Xem thêm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiRecommendations;
