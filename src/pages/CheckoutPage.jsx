import CheckoutForm from "@/components/checkout/checkoutForm";
import CheckoutSummary from "@/components/checkout/checkoutSummary";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen w-full px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 h-full w-full">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
