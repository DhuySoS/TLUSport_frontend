import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import orderServices from "@/services/orderServices";
import { formatCurrency } from "@/lib/formatCurrency";
import { Truck } from "lucide-react";

const OrderPreviewModal = ({
  isOpen,
  onClose,
  onConfirm,
  orderPayload,
  formData,
  paymentMethod,
  isConfirming,
}) => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !orderPayload) return;
    setIsLoading(true);
    setError(null);
    setPreview(null);
    const delay = new Promise((resolve) => setTimeout(resolve, 800));
    Promise.all([orderServices.getPreview(orderPayload), delay])
      .then(([res]) => setPreview(res?.data ?? res))
      .catch(() => setError("Không thể tải thông tin xác nhận. Vui lòng thử lại."))
      .finally(() => setIsLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const items = preview?.items ?? preview?.orderItems ?? [];
  const subtotal = preview?.subtotalAmount ?? preview?.subtotal ?? 0;
  const discount = preview?.discountAmount ?? preview?.discount ?? 0;
  const shippingCost = preview?.shippingFee ?? preview?.shippingCost ?? 0;
  const total = preview?.totalAmount ?? preview?.total ?? 0;
  const couponCode = preview?.couponCode ?? orderPayload?.couponCode;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="absolute inset-0" onClick={!isConfirming ? onClose : undefined} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">

          <div>
            <h2 className="text-xl font-bold text-neutral-900">Xác nhận đơn hàng</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {isLoading && <PreviewSkeleton />}

          {error && !isLoading && (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-red-500">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z" />
                </svg>
              </div>
              <p className="text-sm text-neutral-600">{error}</p>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setError(null);
                  orderServices
                    .getPreview(orderPayload)
                    .then((res) => setPreview(res?.data ?? res))
                    .catch(() => setError("Không thể tải thông tin xác nhận. Vui lòng thử lại."))
                    .finally(() => setIsLoading(false));
                }}
                className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          )}

          {!isLoading && !error && preview && (
            <>
              <section>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                  Sản phẩm ({items.length})
                </h3>
                <div className="divide-y rounded-xl border overflow-hidden">
                  {items.length > 0 ? (
                    items.map((item, idx) => <PreviewItem key={idx} item={item} />)
                  ) : (
                    <p className="text-sm text-neutral-500 px-4 py-3">Không có sản phẩm.</p>
                  )}
                </div>
              </section>

              {/* Delivery info */}
              <section className="rounded-xl border p-4 space-y-2">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                  Thông tin giao hàng
                </h3>
                <InfoRow label="Người nhận" value={formData?.fullName} />
                <InfoRow label="Số điện thoại" value={formData?.phoneNumber} />
                <InfoRow label="Địa chỉ" value={formData?.addressDetail} />
                {formData?.note && <InfoRow label="Ghi chú" value={formData.note} />}
              </section>

              {/* Payment */}
              <section className="rounded-xl border p-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                  Phương thức thanh toán
                </h3>
                {paymentMethod && (
                  <div className="flex items-center gap-3">
                    <img
                      src={paymentMethod.icon}
                      alt={paymentMethod.title}
                      className="w-9 h-9 object-contain rounded"
                    />
                    <span className="text-sm font-semibold text-neutral-800">
                      {paymentMethod.title}
                    </span>
                  </div>
                )}
              </section>
              <section className="rounded-xl border p-4">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                  Phương thức giao hàng
                </h3>
                {preview?.shippingMethod && (
                  <div className="flex items-center justify-between flex-1 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 rounded-full text-neutral-600 shrink-0">
                        <Truck className="size-5" />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-neutral-800">
                          {preview?.shippingMethod?.name}
                        </span>
                        <span className="text-xs font-medium text-neutral-500">
                          Dự kiến: {preview?.shippingMethod?.estimatedDeliveryDays}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-600">
                      {Number(preview?.shippingMethod?.cost) === 0 ? "Miễn phí" : formatCurrency(preview?.shippingMethod?.cost)}
                    </span>
                  </div>
                )}
              </section>

              {/* Pricing summary */}
              <section className="rounded-xl border overflow-hidden">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide px-4 pt-4 mb-2">
                  Chi tiết thanh toán
                </h3>
                <ul className="divide-y text-sm px-4 pb-2">
                  <PriceRow label="Tạm tính" value={formatCurrency(subtotal)} />
                  {discount > 0 && (
                    <PriceRow
                      label={`Voucher giảm giá${couponCode ? ` (${couponCode})` : ""}`}
                      value={`- ${formatCurrency(discount)}`}
                      valueClass="text-blue-500"
                    />
                  )}
                  <PriceRow
                    label="Phí giao hàng"
                    value={shippingCost === 0 ? "Miễn phí" : formatCurrency(shippingCost)}
                  />
                </ul>
                <div className="flex justify-between items-center px-4 py-4 bg-neutral-50 border-t">
                  <span className="font-bold text-neutral-900">Thành tiền</span>
                  <div className="text-right space-y-0.5">
                    <p className="text-xl font-bold text-red-500">{formatCurrency(total)}</p>
                    {discount > 0 && (
                      <p className="text-xs text-neutral-500">Đã giảm {formatCurrency(discount)}</p>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t shrink-0 flex gap-3">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="flex-1 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading || !!error || isConfirming}
            className="flex-1 py-3 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isConfirming ? (
              <>
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Đang xử lý...
              </>
            ) : (
              "Đặt hàng ngay"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

const PreviewItem = ({ item }) => {
  const variantLabel = item.attributeValues
    ?.slice()
    .sort((a, b) => (a.attributeId === 3 ? -1 : 1))
    .map((a) => a.valueName)
    .join(" / ");

  const lineTotal =
    item.subtotal ?? item.lineTotal ?? Number(item.price) * (item.quantity ?? 1);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white">
      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border">
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-800 truncate">{item.productName}</p>
        {variantLabel && (
          <p className="text-xs text-neutral-500 mt-0.5">{variantLabel}</p>
        )}
        <p className="text-xs text-neutral-500 mt-0.5">Số lượng: {item.quantity}</p>
      </div>
      <p className="text-sm font-bold text-neutral-900 shrink-0">{formatCurrency(lineTotal)}</p>
    </div>
  );
};

const InfoRow = ({ label, value }) =>
  value ? (
    <div className="flex gap-2 text-sm">
      <span className="text-neutral-500 shrink-0 w-28">{label}</span>
      <span className="text-neutral-800 font-medium">{value}</span>
    </div>
  ) : null;

const PriceRow = ({ label, value, valueClass = "text-neutral-800" }) => (
  <li className="flex justify-between items-center py-2.5">
    <span className="text-neutral-600">{label}</span>
    <span className={`font-semibold ${valueClass}`}>{value}</span>
  </li>
);

const PreviewSkeleton = () => (
  <div className="space-y-5 animate-pulse">
    <div className="space-y-2">
      <div className="h-4 w-24 bg-neutral-200 rounded" />
      <div className="rounded-xl border divide-y overflow-hidden">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className="w-14 h-14 rounded-lg bg-neutral-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-neutral-200 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 rounded w-1/2" />
            </div>
            <div className="h-4 w-16 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl border p-4 space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-3.5 bg-neutral-200 rounded w-full" />
      ))}
    </div>
    <div className="rounded-xl border p-4 space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-3.5 bg-neutral-200 rounded w-full" />
      ))}
    </div>
  </div>
);

export default OrderPreviewModal;
