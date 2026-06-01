import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import wishlistServices from "@/services/wishlistServices";
import { formatCurrency } from "@/lib/formatCurrency";
import { Link } from "react-router-dom";
import WishlistButton from "@/components/common/WishlistButton";

const WishlistContent = ({ onCountChange }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistServices
      .getWishlist()
      .then((res) => setWishlist(res.data?.data?.items || []))
      .catch(() => setWishlist([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onCountChange?.(wishlist.length);
  }, [wishlist.length, onCountChange]);

  const handleToggle = useCallback((productId, newState) => {
    if (!newState) {
      setWishlist((prev) => prev.filter((i) => i.productId !== productId));
    }
  }, []);

  const handleClearAll = async () => {
    await Promise.all(
      wishlist.map((item) =>
        wishlistServices.removeFromWishlist(item.productId).catch(() => {}),
      ),
    );
    setWishlist([]);
    toast.success("Đã xóa toàn bộ danh sách yêu thích");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4rem"
              height="4rem"
              viewBox="0 0 24 24"
              className="text-red-300"
            >
              <path
                fill="currentColor"
                d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3m-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05"
              />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-xl">
            😢
          </div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-neutral-800">
            Danh sách yêu thích trống
          </h2>
          <p className="text-neutral-500 text-base max-w-sm">
            Hãy thêm những sản phẩm bạn yêu thích để dễ dàng tìm lại sau nhé!
          </p>
        </div>
        <Link
          to="/"
          className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-neutral-800 transition-colors duration-300"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-neutral-500 text-sm">
          {wishlist.length} sản phẩm yêu thích
        </p>
        <button
          onClick={handleClearAll}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors duration-200 cursor-pointer"
        >
          Xóa tất cả
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlist.map((item) => (
          <WishlistCard key={item.id} item={item} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
};

const WishlistCard = ({ item, onToggle }) => {
  return (
    <div className="group space-y-3">
      <div className="relative overflow-hidden rounded-xl">
        <Link to={`/product-detail/${item.productId}/${item.productSlug}`}>
          <img
            src={
              item?.skus?.[0]?.images?.[0]?.imageUrl ||
              "/product/product_1/picInHome_1.jpg"
            }
            alt={item.productName}
            className="w-full h-64 object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 z-10">
          <WishlistButton
            productId={item.productId}
            size="sm"
            variant="icon"
            className="shadow-md"
            initialWishlisted={true}
            onToggle={onToggle}
          />
        </div>
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Link
            to={`/product-detail/${item.productId}/${item.productSlug}`}
            className="flex justify-center items-center gap-2 text-sm font-semibold text-neutral-800"
          >
            Xem chi tiết
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="space-y-1 px-1">
        <h3 className="text-sm font-medium text-neutral-800 truncate hover:text-blue-600 transition-colors duration-200 cursor-pointer">
          {item.productName}
        </h3>
        <p className="text-sm font-bold text-neutral-900">
          {formatCurrency(item.productBasePrice)}
        </p>
      </div>
    </div>
  );
};

export default WishlistContent;
