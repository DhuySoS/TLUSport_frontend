import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutMethod from "@/components/checkout/CheckoutMethod";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { formatCurrency } from "@/lib/formatCurrency";
import { checkoutSchema } from "@/schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
export const PAYMENT_METHODS = [
  {
    id: "cod",
    title: "Thanh toán khi nhận hàng",
    icon: "/deliveryMethod/COD.avif",
  },
  {
    id: "momopay",
    title: "Ví Momo",
    icon: "/deliveryMethod/MomoPay.avif",
  },
  {
    id: "vnpay",
    title: "Ví điện tử VNPay",
    icon: "/deliveryMethod/VnPay.avif",
  },
  {
    id: "zalopay",
    title: "Thanh toán qua ZaloPay",
    icon: "/deliveryMethod/ZaloPay.avif",
  },
];

const CheckoutPage = () => {
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      paymentMethod: "cod",
    },
  })
  const onSubmit = (data) => console.log(data);
  const onError = (errors) => {
    console.log("LỖI VALIDATION (Khiến onSubmit không chạy):", errors);
  };
  const selectedPaymentMethod = methods.watch("paymentMethod")
  const currentPaymentMethod =
    PAYMENT_METHODS.find((method) => method.id === selectedPaymentMethod) ||
    PAYMENT_METHODS[0].id;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="min-h-screen w-full px-16 mx-auto max-w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 h-full w-full">
          <div className="h-full">
            <CheckoutForm />
            <hr className="my-10 border-gray-300" />
            <CheckoutMethod />
          </div>
          <CheckoutSummary />
        </div>
        <div className="fixed inset-x-0 bottom-0 z-50 flex min-h-20 items-stretch gap-8 shadow-2xl">
          <div className="flex flex-1 items-center bg-blue-50 ">
            <div className="flex flex-1 items-center justify-center gap-4  ">
              <img
                src={currentPaymentMethod.icon}
                alt={currentPaymentMethod.title}
                className="w-10 h-10 object-contain"
              />
                {currentPaymentMethod.title}
            </div>
            <div className="relative w-px bg-neutral-900/20 mx-3 h-5"></div>
            <div className="flex flex-1 justify-center ">
              voucher
            </div>
          </div>
          <div className="flex flex-1 items-center gap-4 justify-end ">
            <div className="flex-1 text-center space-y-2">
              <h2 className="text-2xl font-bold">Tổng tiền: (2 sản phẩm)</h2>
              <p className="text-2xl font-bold text-blue-500">
                {formatCurrency(1000000)}
              </p>
            </div>
            <button

              type="submit"
              className="py-8 px-6 text-2xl font-sans font-medium text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer  "
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckoutPage;
