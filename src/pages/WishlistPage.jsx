import React, { useState } from "react";
import WishlistContent from "@/components/wishlist/WishlistContent";

const WishlistPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full bg-neutral-50">
      <div className="xl:w-3/4 mx-auto max-w-360 px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Danh sách yêu thích
          </h1>
          <p className="text-neutral-500 mt-2">
            {count > 0
              ? `Bạn đang có ${count} sản phẩm yêu thích`
              : "Những sản phẩm bạn đã đánh dấu yêu thích sẽ xuất hiện ở đây"}
          </p>
        </div>

        {/* Divider */}
        <hr className="mb-8 border-neutral-200" />

        {/* Content */}
        <WishlistContent onCountChange={setCount} />
      </div>
    </div>
  );
};

export default WishlistPage;
