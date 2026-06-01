import { PAYMENT_METHODS } from "@/pages/CheckoutPage";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import walletServices from "@/services/walletServices";
import useAuthStore from "@/store/useAuthStore";
import { formatCurrency } from "@/lib/formatCurrency";

const CheckoutMethod = ({ finalTotal = 0 }) => {
  const { register, watch, setValue } = useFormContext();
  const { user } = useAuthStore();
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (user) {
      walletServices
        .getMyWallet()
        .then((res) => setWalletBalance(res.data?.data?.balance || 0))
        .catch(console.error);
    }
  }, [user]);

  // If wallet is selected but insufficient balance, fallback to CASH
  const currentMethod = watch("paymentMethod");
  useEffect(() => {
    if (currentMethod === "WALLET" && finalTotal > walletBalance) {
      setValue("paymentMethod", "CASH");
    }
  }, [finalTotal, walletBalance, currentMethod, setValue]);

  return (
    <div className="mt-10 sticky top-24">
      <h1 className="text-4xl font-medium">Hình thức thanh toán</h1>
      <div className="mt-5 ">
        <ul className="space-y-4 pb-40">
          {PAYMENT_METHODS.map((method) => {
            const isWallet = method.id === "WALLET";
            const disabled = isWallet && finalTotal > walletBalance;

            return (
              <li
                key={method.id}
                className={`group border-neutral-200 flex items-center gap-4 rounded-xl border px-4 py-3 transition-all ${
                  disabled
                    ? "opacity-50 bg-neutral-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-neutral-100 has-checked:bg-neutral-100 has-checked:border-neutral-300"
                }`}
              >
                <label
                  className={`flex w-full items-center gap-4 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    className="sr-only peer"
                    value={method.id}
                    disabled={disabled}
                    {...register("paymentMethod")}
                  />

                  <div
                    className={`h-5 w-5 shrink-0 rounded-full border-2 
                          transition-all duration-200
                          flex items-center justify-center
                          ${disabled ? "border-neutral-300 bg-neutral-200" : "border-neutral-400 peer-checked:border-blue-600"}`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600 opacity-0 group-has-checked:opacity-100 transition-transform duration-200"></span>
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={method.icon}
                      alt={method.title}
                      className={`w-10 h-10 object-contain ${disabled ? "grayscale" : ""}`}
                    />

                    <div className="flex flex-1 items-center justify-between">
                      <span
                        className={`text-sm font-bold  ${disabled ? "text-neutral-500" : "text-neutral-800"}`}
                      >
                        {method.title}
                      </span>
                      {isWallet && (
                        <span
                          className={`text-xs ${disabled ? "text-red-500 font-medium" : "text-neutral-500"}`}
                        >
                          Số dư: {formatCurrency(walletBalance)}
                          {disabled && " (Không đủ số dư)"}
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CheckoutMethod;
