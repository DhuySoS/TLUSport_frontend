import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { id: 1, title: "GIỎ HÀNG" },
  { id: 2, title: "THANH TOÁN" },
  { id: 3, title: "TRẠNG THÁI ĐƠN HÀNG" },
];
const CheckoutStepper = ({ currentStep }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full py-10 gap-4 bg-white">
      {!isAuthenticated ? (
        <span className="text-xl text-red-500 font-medium h-8">
          Vui lòng đăng nhập để tiến hành thanh toán
        </span>
      ) : (
        <>
          {STEPS.map((step, index) => {
            const isClickable = step.id === 1 && currentStep === 2;
            return (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => {
                    if (isClickable) {
                      navigate("/cart");
                    }
                  }}
                  className={`flex items-center gap-3 ${
                    isClickable ? "cursor-pointer group" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                ${
                  currentStep >= step.id
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 text-neutral-300"
                } ${isClickable ? "group-hover:bg-neutral-700 group-hover:scale-105" : ""}`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`text-xs md:text-sm font-bold tracking-widest transition-all duration-300 hidden md:inline
                ${
                  currentStep >= step.id ? "text-neutral-900" : "text-neutral-300"
                } ${isClickable ? "group-hover:text-neutral-700" : ""}`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-px w-8 md:w-24 transition-all duration-500
                ${currentStep > step.id ? "bg-neutral-900" : "bg-neutral-200"}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CheckoutStepper;
