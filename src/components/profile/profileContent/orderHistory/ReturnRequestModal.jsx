import React, { useState } from "react";
import { toast } from "sonner";
import orderServices from "@/services/orderServices";
import { formatCurrency } from "@/lib/formatCurrency";

const ReturnRequestModal = ({ isOpen, onClose, order, onSubmitSuccess }) => {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error("Vui lòng nhập lý do trả hàng");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await orderServices.createReturnRequest(order.orderId, {
        reason: reason.trim(),
      });
      toast.success(res?.message || "Gửi yêu cầu hoàn hàng thành công!");
      setReason("");
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Gửi yêu cầu hoàn hàng thất bại!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">
            Yêu cầu Trả hàng / Hoàn tiền
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-neutral-50 p-4 rounded-xl space-y-2 text-sm border border-neutral-100">
            <div className="flex justify-between">
              <span className="text-neutral-500 font-medium">
                Số tiền hoàn trả:
              </span>
              <span className="font-bold text-red-500 text-base">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-normal">
              * Tiền sẽ được hoàn lại vào Ví số dư của bạn sau khi yêu cầu được
              cửa hàng duyệt thành công.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-700">
              Lý do trả hàng <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do chi tiết (ví dụ: size không vừa, hàng bị lỗi đường may, sai màu sắc...)"
              className="w-full min-h-25 p-3 text-sm border border-neutral-300 rounded-xl outline-none focus:border-neutral-900 resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-all cursor-pointer text-sm"
              disabled={isSubmitting}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-800 transition-all cursor-pointer text-sm disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnRequestModal;
