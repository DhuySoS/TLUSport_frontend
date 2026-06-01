import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutMethod from "@/components/checkout/CheckoutMethod";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CheckoutStepper from "@/components/common/CheckoutStepper";
import OrderPreviewModal from "@/components/checkout/OrderPreviewModal";
import { formatCurrency } from "@/lib/formatCurrency";
import { checkoutSchema } from "@/schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useCartStore from "@/store/useCartStore";
import orderServices from "@/services/orderServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CheckoutShippingMethod from "@/components/checkout/CheckoutShippingMethod";
import shippingMethodServices from "@/services/shippingMethodServices";
import paymentMethodServices from "@/services/paymentMethodServices";
export const PAYMENT_METHODS = [
  {
    id: "CASH",
    title: "Thanh toán khi nhận hàng",
    icon: "/deliveryMethod/COD.avif",
  },
  {
    id: "VNPAY",
    title: "Ví điện tử VNPay",
    icon: "/deliveryMethod/VnPay.avif",
  },
  {
    id: "WALLET",
    title: "Thanh toán bằng số dư Ví",
    icon: "/profile/mceclip6_39.png",
  },
];

const CheckoutPage = () => {
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: JSON.parse(sessionStorage.getItem("checkoutForm")),
  });

  useEffect(() => {
    const subscription = methods.watch((value) => {
      sessionStorage.setItem("checkoutForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const { selectedItemIds, getFinalTotal, appliedCoupon } = useCartStore();

  const navigate = useNavigate();
  const [shippingMethods, setShippingMethods] = useState([]);
  const [paymentMethodsDb, setPaymentMethodsDb] = useState([]);
  const selectedShippingId = methods.watch("shippingMethodId");

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingOrderPayload, setPendingOrderPayload] = useState(null);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const [shippingRes, paymentRes] = await Promise.all([
          shippingMethodServices.getActiveMethods(),
          paymentMethodServices.getActiveMethods()
        ]);
        setShippingMethods(shippingRes.data || []);
        setPaymentMethodsDb(paymentRes.data || []);
      } catch (error) {
        console.error("Lỗi tải thông tin phương thức:", error);
      }
    };
    fetchMethods();
  }, []);

  const onSubmit = (formData) => {
    const rawAddress = methods.getValues("addressObj");
    if (!rawAddress || !rawAddress.id) {
      toast.error("Vui lòng chọn địa chỉ giao hàng từ sổ địa chỉ");
      return;
    }

    const selectedCode = formData.paymentMethod || "CASH";
    const pmFromDb = paymentMethodsDb.find(m => m.code === selectedCode);
    
    if (!pmFromDb) {
      toast.error("Phương thức thanh toán không hợp lệ!");
      return;
    }

    const paymentMethodId = pmFromDb.id;
    const orderPayload = {
      cartItemIds: selectedItemIds,
      addressId: rawAddress.id,
      shippingMethodId: Number(formData.shippingMethodId),
      couponCode: appliedCoupon || null,
      paymentMethodId,
    };

    setPendingOrderPayload(orderPayload);
    setPendingFormData(formData);
    setShowPreviewModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    try {
      const res = await orderServices.placeOrder(pendingOrderPayload);
      if (res && res.data) {
        if (res.data.paymentUrl) {
          window.location.href = res.data.paymentUrl;
        } else {
          toast.success("Đặt hàng thành công!", {
            duration: 5000,
            className: "bg-green-500 text-white",
            position: "top-right",
            icon: "✅",
          });
          useCartStore.getState().fetchCart();
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng");
    } finally {
      setIsConfirming(false);
    }
  };

  const selectedPaymentMethod = methods.watch("paymentMethod")
  const currentPaymentMethod =
    PAYMENT_METHODS.find((method) => method.id === selectedPaymentMethod) ||
    PAYMENT_METHODS[0];

  const selectedCount = selectedItemIds?.length || 0;
  const selectedMethod = shippingMethods.find((m) => String(m.id) === String(selectedShippingId));
  const shippingCost = selectedMethod ? Number(selectedMethod.cost) : 0;
  const finalTotal = getFinalTotal() + shippingCost;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="min-h-screen w-full px-4 md:px-8 lg:px-16 mx-auto max-w-full pb-32"
      >
        <CheckoutStepper currentStep={2} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 w-full items-start">
          <div>
            <CheckoutForm />
            <hr className="my-4 border-gray-300" />
            <CheckoutShippingMethod />
            <hr className="my-4 border-gray-300" />
            <CheckoutMethod finalTotal={finalTotal} />
          </div>
          <div className="sticky top-20">
            <CheckoutSummary />
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col md:flex-row min-h-20 items-stretch shadow-2xl bg-white">
          <div className="flex items-center justify-between md:justify-center md:flex-1 py-2 px-4 md:py-0 md:px-0 bg-blue-50 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <img
                src={currentPaymentMethod.icon}
                alt={currentPaymentMethod.title}
                className="w-6 h-6 md:w-10 md:h-10 object-contain"
              />
              <span className="font-semibold text-neutral-800">{currentPaymentMethod.title}</span>
            </div>
            <div className="hidden md:block w-px bg-neutral-900/20 mx-3 h-5"></div>
            <div className="text-blue-600 font-semibold md:font-medium">
              {appliedCoupon ? `Voucher: ${appliedCoupon}` : "Chưa chọn voucher"}
            </div>
          </div>
          <div className="flex items-center justify-between md:flex-1 py-3 px-4 md:py-0 md:px-0 md:pl-4 bg-white border-t md:border-t-0 border-neutral-200">
            <div className="flex-1 text-left md:text-center md:space-y-1">
              <h2 className="text-xs md:text-xl lg:text-2xl font-bold text-neutral-600 md:text-neutral-900">
                Tổng tiền: <span className="md:block text-sm md:text-xl lg:text-2xl font-bold text-blue-500">{formatCurrency(finalTotal)}</span>
              </h2>
            </div>
            <button
              type="submit"
              className="py-3 md:py-8 px-6 text-sm md:text-xl lg:text-2xl font-sans font-medium text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer rounded-lg md:rounded-none"
            >
              Xác nhận đặt hàng
            </button>
          </div>
        </div>
      </form>

      <OrderPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onConfirm={handleConfirmOrder}
        orderPayload={pendingOrderPayload}
        formData={pendingFormData}
        paymentMethod={
          PAYMENT_METHODS.find((m) => m.id === pendingFormData?.paymentMethod) ??
          PAYMENT_METHODS[0]
        }
        isConfirming={isConfirming}
      />
    </FormProvider>
  );
};

export default CheckoutPage;
