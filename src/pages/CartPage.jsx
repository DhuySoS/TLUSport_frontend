import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import CheckoutStepper from "@/components/common/CheckoutStepper";
import React from "react";
import { useEffect } from "react";
import useCartStore from "@/store/useCartStore";

const CartPage = () => {
  const fetchCoupons = useCartStore((state) => state.fetchCoupons);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <div className="flex-1 min-h-[85vh] flex flex-col w-full md:overflow-hidden">
      <CheckoutStepper currentStep={1} />
      <div className="w-full px-4 md:px-8 lg:px-16 flex-1 md:min-h-0">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6 md:gap-12 pt-4 md:h-full md:min-h-0 w-full">
          <div className="col-span-2 md:h-full md:min-h-0 flex flex-col">
            <CartList />
          </div>
          <div className="col-span-1 md:h-full md:min-h-0 flex flex-col w-full ">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
