import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import paymentServices from '../services/paymentServices';
import useCartStore from '../store/useCartStore';
import orderServices from '@/services/orderServices';
import { formatCurrency } from '@/lib/formatCurrency';

const PaymentResultPage = () => {
    const location = useLocation();
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('');
    const [orderId, setOrderId] = useState(null);
    const called = useRef(false);
    const { fetchCart } = useCartStore();
    const [curOrderData, setCurOrderData] = useState([]);

    useEffect(() => {
        const checkPayment = async () => {
            const params = new URLSearchParams(location.search);
            const queryObj = Object.fromEntries(params.entries());

            if (Object.keys(queryObj).length === 0) {
                setStatus('error');
                setMessage('Không tìm thấy thông tin thanh toán.');
                return;
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                const data = await paymentServices.vnPayReturn(queryObj);

                if (data.code === 200) {
                    setStatus('success');
                    setMessage(data.message);
                    fetchCart();

                    const match = data.message?.match(/#(\d+)/);
                    if (match && match[1]) {
                        setOrderId(match[1]);
                        const curOrder = await orderServices.getMyOrders();
                        const currentOrder = curOrder.data?.items?.find(order => order.orderId == match[1]);
                        if (currentOrder) {
                            setCurOrderData(currentOrder);
                        }
                    }
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Thanh toán không thành công.');
                }
            } catch (error) {
                console.error('Lỗi xác thực thanh toán:', error);
                setStatus('error');
                setMessage(error.response?.data?.message || 'Có lỗi xảy ra khi xác thực thanh toán.');
            }
        };

        if (!called.current) {
            called.current = true;
            checkPayment();
        }
    }, [location.search, fetchCart]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                <h2 className="text-xl font-medium text-gray-700">Đang xác thực thanh toán...</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center  min-h-[calc(100vh-200px)] bg-gray-50">
            <div className="max-w-2xl w-full mx-auto px-6 py-12">

                {status === 'success' ? (
                    <div className="text-center">
                        <CheckCircle className="w-28 h-28 text-green-500 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Thanh toán thành công!</h2>
                        <p className="text-gray-600 mb-8 text-lg">{message || "Đơn hàng của bạn đã được xác nhận."}</p>
                        {curOrderData && curOrderData.items && curOrderData.items.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 text-left max-w-lg mx-auto">
                                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
                                    Thông tin đơn hàng của bạn
                                </h3>

                                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
                                    {curOrderData.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="w-16 h-16 shrink-0 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                                                    {item.productName}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">Số lượng: {item.quantity}</p>
                                            </div>
                                            <div className="text-right pl-2">
                                                <p className="text-sm font-bold text-gray-900">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-dashed border-gray-200 mt-5 pt-5 flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-500">Tổng thanh toán</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {formatCurrency(curOrderData.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {new URLSearchParams(location.search).get("vnp_TxnRef")?.includes("WALLET") || message?.includes("ví") || message?.includes("Ví") ? (
                                <a
                                    href="/my-profile/wallet"
                                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-all shadow-sm text-center"
                                >
                                    Quay lại Ví của tôi
                                </a>
                            ) : (
                                <Link
                                    to="/my-profile/order-history"
                                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-all shadow-sm text-center"
                                >
                                    {orderId ? (
                                        <>
                                            <span className="mr-2">#</span>
                                            <span>Xem chi tiết đơn hàng </span>
                                        </>
                                    ) : (
                                        <span>Xem lịch sử đơn hàng</span>
                                    )}
                                </Link>
                            )}
                            <Link
                                to="/"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all text-center"
                            >
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <XCircle className="w-28 h-28 text-red-500 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Thanh toán không thành công</h2>
                        <p className="text-gray-600 mb-8 text-lg">{message || "Đơn hàng của bạn chưa được xác nhận."}</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {new URLSearchParams(location.search).get("vnp_TxnRef")?.includes("WALLET") || message?.includes("ví") || message?.includes("Ví") ? (
                                <a
                                    href="/my-profile/wallet"
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all shadow-sm text-center"
                                >
                                    Quay lại Ví của tôi
                                </a>
                            ) : (
                                <Link
                                    to="/cart"
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all shadow-sm text-center"
                                >
                                    Quay lại giỏ hàng
                                </Link>
                            )}
                            <Link
                                to="/"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
                            >
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentResultPage;