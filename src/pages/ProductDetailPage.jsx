import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductDescription from "@/components/productDetail/description";
import ProductGallery from "@/components/productDetail/ProductGallery";
import ProductInfo from "@/components/productDetail/info/ProductInfo";
import React, { useEffect, useState, useMemo } from "react";
import ProductRecommendations from "@/components/productDetail/ProductRecommendations";
import ProductReviews from "@/components/productDetail/reviews";
import ProductViewed from "@/components/productDetail/ProductViewed";
import StickyAddToCart from "@/components/productDetail/StickyAddToCart";
import { useParams } from "react-router-dom";
import productServices from "@/services/productServices";
import reviewServices from "@/services/reviewServices";
import useRecentlyViewedStore from "@/store/useRecentlyViewedStore";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";
import { showAddToCartToast } from "@/components/common/AddToCartToast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const addProduct = useRecentlyViewedStore((state) => state.addProduct);

  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // State for selections
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const hasColors = useMemo(() => {
    return productDetail?.skus?.some((sku) =>
      sku.attributeValues?.some((attr) => attr.attributeId === 3)
    ) || false;
  }, [productDetail]);

  const hasSizes = useMemo(() => {
    return productDetail?.skus?.some((sku) =>
      sku.attributeValues?.some((attr) => attr.attributeId === 2)
    ) || false;
  }, [productDetail]);

  useEffect(() => {
    if (!id) return;
    const fetchProductDetail = async () => {
      try {
        const res = await productServices.getProductDetail(id);
        console.log("Res: ", res.data);
        setProductDetail(res.data);
        if (res.data) {
          addProduct(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch product detail:", error);
      }
    };
    fetchProductDetail();
  }, [id, addProduct]);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      reviewServices.getAverageRating(id),
      reviewServices.getReviewCount(id),
    ])
      .then(([avgRes, countRes]) => {
        setAverageRating(Number(avgRes.data?.data) || 0);
        setTotalCount(Number(countRes.data?.data) || 0);
      })
      .catch(console.error);
  }, [id]);

  const { addToCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (hasColors && !selectedColor) {
      toast.error("Vui lòng chọn màu sắc");
      return;
    }
    if (hasSizes && !selectedSize) {
      toast.error("Vui lòng chọn kích cỡ");
      return;
    }

    const activeSku = productDetail?.skus?.find((sku) => {
      const matchesColor = !hasColors || sku.attributeValues?.some(
        (attr) => attr.attributeId === 3 && attr.valueId === selectedColor,
      );
      const matchesSize = !hasSizes || sku.attributeValues?.some(
        (attr) => attr.attributeId === 2 && attr.valueId === selectedSize,
      );
      return matchesColor && matchesSize;
    });

    if (!activeSku) {
      toast.error("Phiên bản này hiện không khả dụng");
      return;
    }

    if (activeSku.stockQuantity < quantity) {
      toast.error("Số lượng trong kho không đủ");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(activeSku.id, quantity);

      const sizeAttr = activeSku.attributeValues?.find(
        (a) => a.attributeId === 2,
      );
      const colorAttr = activeSku.attributeValues?.find(
        (a) => a.attributeId === 3,
      );
      const variantLabel = [colorAttr?.valueName, sizeAttr?.valueName]
        .filter(Boolean)
        .join(" / ");
      const fallbackImage =
        activeSku?.images?.[0]?.imageUrl ||
        productDetail?.skus?.[0]?.images?.[0]?.imageUrl ||
        productDetail?.images?.[0]?.imageUrl ||
        "https://placehold.co/400x600?text=No+Image";

      showAddToCartToast({
        imageUrl: fallbackImage,
        productName: productDetail?.name,
        variantLabel,
        price: activeSku.price ?? productDetail?.basePrice ?? 0,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <StickyAddToCart
        productData={productDetail}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        averageRating={averageRating}
        totalCount={totalCount}
      />
      <div className="px-4 md:px-8 lg:px-12 xl:px-0 xl:w-3/4 mx-auto max-w-360">
        <Breadcrumbs productData={productDetail} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-5">
          <div className="min-w-0 w-full overflow-hidden">
            <ProductGallery
              productData={productDetail}
              selectedColor={selectedColor}
            />
          </div>
          <div className="min-w-0 w-full overflow-hidden">
            <ProductInfo
              productData={productDetail}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              isAdding={isAdding}
              averageRating={averageRating}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <div className="bg-neutral-100">
        <ProductDescription productData={productDetail} />
      </div>
      <ProductRecommendations />
      <div className="bg-neutral-100">
        <ProductReviews averageRating={averageRating} totalCount={totalCount} />
      </div>
      <ProductViewed />
    </div>
  );
};

export default ProductDetailPage;
