import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import shippingMethodServices from '@/services/shippingMethodServices';
import { formatCurrency } from '@/lib/formatCurrency';
import { Truck } from 'lucide-react';

const CheckoutShippingMethod = () => {
    const { register, setValue, getValues } = useFormContext();
    const [shippingMethods, setShippingMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const res = await shippingMethodServices.getActiveMethods();
                const methods = res.data || [];
                setShippingMethods(methods);

                const currentVal = getValues("shippingMethodId");
                if (!currentVal && methods.length > 0) {
                    setValue("shippingMethodId", String(methods[0].id));
                }
            } catch (error) {
                console.error("Lỗi tải phương thức vận chuyển:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMethods();
    }, [setValue, getValues]);

    return (
        <div className="my-10 ">
            <h1 className="text-4xl font-medium">Phương thức vận chuyển</h1>
            <div className="mt-5 ">
                <ul className="space-y-4 ">
                    {shippingMethods.map((method) => (
                        <li
                            key={method.id}
                            className="group border-neutral-200 hover:bg-neutral-100 flex items-center gap-4 rounded-xl border px-4 py-3 transition-all cursor-pointer 
          has-checked:bg-neutral-100 has-checked:border-neutral-300"
                        >
                            <label className="flex w-full items-center gap-4 cursor-pointer">
                                <input
                                    type="radio"
                                    className="sr-only peer"
                                    value={method.id}
                                    {...register("shippingMethodId")}
                                />

                                <div
                                    className="h-5 w-5 shrink-0 rounded-full border-2 border-neutral-400 
                        transition-all duration-200
                        peer-checked:border-blue-600 
                        flex items-center justify-center"
                                >
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600 opacity-0 group-has-checked:opacity-100 transition-transform duration-200"></span>
                                </div>
                                <div className="flex items-center justify-between flex-1 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-neutral-600 shrink-0">
                                            <Truck className="size-5" />
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-neutral-800">
                                                {method.name}
                                            </span>
                                            <span className="text-xs font-medium text-neutral-500">
                                                Dự kiến: {method.estimatedDeliveryDays}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600">
                                        {Number(method.cost) === 0 ? "Miễn phí" : formatCurrency(method.cost)}
                                    </span>
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CheckoutShippingMethod;