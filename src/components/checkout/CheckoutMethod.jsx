import { PAYMENT_METHODS } from '@/pages/CheckoutPage';
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';

const CheckoutMethod = () => {
  const { register } = useFormContext();
  
  return (
    <div className="mt-10 ">
      <h1 className="text-4xl font-medium">Hình thức thanh toán</h1>
      <div className="mt-5 ">
        <ul className="space-y-4 pb-40">
          {PAYMENT_METHODS.map((method) => (
            <li
              key={method.id}
              className="group border-neutral-200 hover:bg-neutral-100 flex items-center gap-4 rounded-xl border px-4 py-3 transition-all cursor-pointer 
          has-checked:bg-neutral-100 has-checked:border-neutral-300"
            >
              <label className="flex w-full items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  className="sr-only peer"
                  value={method.id}
                  {...register("paymentMethod")}
                />

                <div
                  className="h-5 w-5 shrink-0 rounded-full border-2 border-neutral-400 
                        transition-all duration-200
                        peer-checked:border-blue-600 
                        flex items-center justify-center"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600 opacity-0  group-has-checked:opacity-100 transition-transform duration-200"></span>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={method.icon}
                    alt={method.title}
                    className="w-10 h-10 object-contain"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800">
                      {method.title}
                    </span>
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CheckoutMethod