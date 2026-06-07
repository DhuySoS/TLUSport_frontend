import React, { useEffect, useState } from "react";
import orderServices from "@/services/orderServices";
import { formatCurrency } from "@/lib/formatCurrency";
import { Link } from "react-router-dom";
import { Store, Truck } from "lucide-react";
import ReviewModal from "./ReviewModal";
import ConfirmCancelModal from "./ConfirmCancelModal";
import ReturnRequestModal from "./ReturnRequestModal";
import ReturnDetailsModal from "./ReturnDetailsModal";
import { toast } from "sonner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [activeTab, setActiveTab] = useState("ALL");
  const [reviewingOrder, setReviewingOrder] = useState(null);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [returningOrder, setReturningOrder] = useState(null);
  const [viewingReturnDetail, setViewingReturnDetail] = useState(null);
  const [returnDetailLoading, setReturnDetailLoading] = useState(false);

  const tabs = [
    { id: "ALL", label: "Tất cả" },
    { id: "PENDING", label: "Chờ xác nhận" },
    { id: "PROCESSING", label: "Đang xử lý" },
    { id: "SHIPPED", label: "Đang giao" },
    { id: "DELIVERED", label: "Đã giao" },
    { id: "RETURNS", label: "Trả hàng/Hoàn tiền" },
    { id: "CANCELLED", label: "Đã hủy" },
  ];

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Truyền size lớn (ví dụ 1000) để lấy toàn bộ đơn hàng 1 lần
      const res = await orderServices.getMyOrders(1, 1000);
      console.log("orders", res);

      if (res && res.data) {
        setOrders(res.data.items || []);
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch sử đơn hàng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getOrderStatus = (status) => {
    const statusMap = {
      PENDING: {
        label: "Chờ xác nhận",
        color: "text-yellow-600 bg-yellow-100",
      },
      PROCESSING: { label: "Đang xử lý", color: "text-blue-600 bg-blue-100" },
      SHIPPED: {
        label: "Đang giao hàng",
        color: "text-purple-600 bg-purple-100",
      },
      DELIVERED: { label: "Đã giao", color: "text-green-600 bg-green-100" },
      CANCELLED: { label: "Đã hủy", color: "text-red-600 bg-red-100" },
      RETURN_REQUESTED: {
        label: "Chờ duyệt trả hàng",
        color: "text-orange-600 bg-orange-100",
      },
      RETURNED: {
        label: "Đã trả hàng",
        color: "text-emerald-600 bg-emerald-100",
      },
      RETURN_REJECTED: {
        label: "Từ chối trả hàng",
        color: "text-rose-600 bg-rose-100",
      },
    };
    return (
      statusMap[status] || { label: status, color: "text-gray-600 bg-gray-100" }
    );
  };
  const handleDeliverOrder = async (orderId) => {
    try {
      const res = await orderServices.deliverOrder(orderId);
      toast.success(res?.message || "Xác nhận nhận hàng thành công!", {
        position: "top-right",
      });
      fetchOrders(); // Tải lại danh sách đơn hàng
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Xác nhận nhận hàng thất bại!",
        {
          position: "top-right",
        },
      );
    }
  };
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await orderServices.cancelOrder(orderId);
      toast.success(res?.message || "Hủy đơn hàng thành công!", {
        position: "top-right",
      });
      fetchOrders(); // Tải lại danh sách đơn hàng
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Hủy đơn hàng thất bại!", {
        position: "top-right",
      });
    }
  };

  const handleViewReturnDetails = async (order) => {
    setReturnDetailLoading(true);
    try {
      const res = await orderServices.getReturnByOrderId(order.orderId);
      if (res && res.data) {
        setViewingReturnDetail(res.data);
      } else {
        toast.error("Không tìm thấy thông tin hoàn trả hàng.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Lỗi khi tải thông tin hoàn trả hàng.",
      );
    } finally {
      setReturnDetailLoading(false);
    }
  };

  const filteredOrders =
    activeTab === "ALL"
      ? orders
      : activeTab === "RETURNS"
        ? orders.filter((order) =>
            ["RETURN_REQUESTED", "RETURNED", "RETURN_REJECTED"].includes(
              order.orderStatus,
            ),
          )
        : orders.filter((order) => order.orderStatus === activeTab);

  if (isLoading) {
    return (
      <div className="w-full text-center py-20 animate-pulse">
        Đang tải lịch sử đơn hàng...
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full pb-20">
      <div className="sticky top-0 z-20 bg-white pt-4 pb-2 space-y-6">
        <p className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Lịch sử đơn hàng
        </p>
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-neutral-200 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm transition-all border-b-2 outline-none cursor-pointer ${
                activeTab === tab.id
                  ? "border-neutral-900 text-neutral-900 bg-neutral-50"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="w-full text-center py-10">
          <p className="text-lg font-medium text-neutral-500">
            Chưa có đơn hàng nào
          </p>
          <div className="flex flex-col items-center mt-10 gap-4">
            <img
              src="/cart/emptyCart.png"
              alt="Empty"
              className="w-64 opacity-50"
            />
            <Link
              to="/"
              className="px-8 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="w-full text-center py-20">
          <p className="text-lg font-medium text-neutral-500">
            Không có đơn hàng nào trong trạng thái này
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => {
            const statusConfig = getOrderStatus(order.orderStatus);

            return (
              <div
                key={order.orderId}
                className="border border-neutral-200 bg-white mb-4"
              >
                {/* Header đơn hàng */}
                <div className="p-4 border-b border-neutral-100 flex flex-wrap justify-between items-center gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-neutral-900 text-base flex items-center gap-2">
                      <Store size={18} /> TLUSport
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                      # {String(order.orderId).padStart(6, "0")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {order.orderStatus === "DELIVERED" && (
                      <>
                        <span className="text-base font-semibold flex items-center gap-1 text-green-600">
                          <Truck size={18} />
                          {statusConfig.label}
                        </span>

                        <span className="text-neutral-300">|</span>
                      </>
                    )}
                    <span className="text-red-500 font-bold uppercase text-base">
                      {order.orderStatus === "DELIVERED"
                        ? "HOÀN THÀNH"
                        : statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Phần chi tiết sản phẩm */}
                <div className="p-4 bg-white">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 mb-4 last:mb-0 border-b border-neutral-50 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="w-20 h-20 bg-neutral-50 border border-neutral-100 shrink-0">
                        <img
                          src={
                            item.imageUrl ||
                            "https://placehold.co/100x100?text=No+Image"
                          }
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="flex flex-col justify-start">
                          <div>
                            <h4 className="text-sm sm:text-lg font-medium text-neutral-900 line-clamp-2">
                              {item.productName}
                            </h4>
                          </div>
                          <div className="flex gap-2">
                            {item?.attributeValues?.map((i, idx) => (
                              <span
                                key={idx}
                                className="text-xs sm:text-sm font-normal text-neutral-500 mt-1"
                              >
                                {i.attributeName}: {i.valueName}
                                {idx !== item.attributeValues.length - 1 &&
                                  ", "}
                              </span>
                            ))}
                            <span className="text-xs sm:text-sm font-normal text-neutral-500 mt-1">
                              SL: x{item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex items-center sm:items-start gap-2">
                          <p className="text-sm sm:text-lg font-medium text-red-500">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Thành tiền */}
                <div className="p-4 bg-red-50/10 border-t border-neutral-100 border-dashed text-right flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="text-xs sm:text-sm font-medium text-neutral-600 text-left">
                    Ngày mua:{" "}
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                    <span className="text-sm sm:text-base font-medium text-neutral-700 sm:mr-2">
                      Thành tiền:
                    </span>
                    <span className="text-xl sm:text-3xl font-bold text-red-500">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Footer buttons */}
                {order.orderStatus !== "CANCELLED" && (
                  <div className="p-4 bg-white border-t border-neutral-100 flex flex-wrap justify-end items-center gap-4">
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      {order.orderStatus === "PENDING" && (
                        <button
                          onClick={() => setCancelOrderId(order.orderId)}
                          className="w-full sm:w-auto text-center justify-center px-5 py-2.5 border border-neutral-300 bg-white text-neutral-700 text-sm font-bold rounded hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          Hủy đơn
                        </button>
                      )}

                      {order.orderStatus === "SHIPPED" && (
                        <button
                          onClick={() => handleDeliverOrder(order.orderId)}
                          className="w-full sm:w-auto text-center justify-center px-6 py-2.5 bg-neutral-800 text-white text-sm font-bold rounded hover:bg-neutral-900 transition-colors cursor-pointer"
                        >
                          Đã nhận được hàng
                        </button>
                      )}

                      {order.orderStatus === "DELIVERED" && (
                        <>
                          <button
                            onClick={() => setReviewingOrder(order)}
                            className="w-full sm:w-auto text-center justify-center px-6 py-2.5 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            Đánh giá
                          </button>
                          <button
                            onClick={() => setReturningOrder(order)}
                            className="w-full sm:w-auto text-center justify-center px-5 py-2.5 border border-neutral-300 bg-white text-neutral-700 text-sm font-bold rounded hover:bg-neutral-50 transition-colors cursor-pointer"
                          >
                            Yêu Cầu Trả Hàng/Hoàn Tiền
                          </button>
                        </>
                      )}

                      {[
                        "RETURN_REQUESTED",
                        "RETURNED",
                        "RETURN_REJECTED",
                      ].includes(order.orderStatus) && (
                        <button
                          onClick={() => handleViewReturnDetails(order)}
                          className="w-full sm:w-auto text-center justify-center px-5 py-2.5 border border-neutral-300 bg-white text-neutral-700 text-sm font-bold rounded hover:bg-neutral-50 transition-colors cursor-pointer"
                          disabled={returnDetailLoading}
                        >
                          Chi Tiết Trả Hàng
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Đánh giá */}
      <ReviewModal
        isOpen={!!reviewingOrder}
        onClose={() => setReviewingOrder(null)}
        order={reviewingOrder}
      />

      {/* Modal Xác nhận Hủy Đơn */}
      <ConfirmCancelModal
        isOpen={!!cancelOrderId}
        onClose={() => setCancelOrderId(null)}
        onConfirm={() => {
          const id = cancelOrderId;
          setCancelOrderId(null);
          handleCancelOrder(id);
        }}
      />

      {/* Modal Yêu Cầu Trả Hàng */}
      <ReturnRequestModal
        isOpen={!!returningOrder}
        onClose={() => setReturningOrder(null)}
        order={returningOrder}
        onSubmitSuccess={fetchOrders}
      />

      {/* Modal Chi Tiết Trả Hàng */}
      <ReturnDetailsModal
        isOpen={!!viewingReturnDetail}
        onClose={() => setViewingReturnDetail(null)}
        returnDetail={viewingReturnDetail}
      />
    </div>
  );
};

export default OrderHistory;
