import React from "react";
import { formatCurrency } from "@/lib/formatCurrency";

const ReturnDetailsModal = ({ isOpen, onClose, returnDetail }) => {
  if (!isOpen || !returnDetail) return null;

  const getStatusLabelAndCls = (status) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Đang chờ duyệt",
        };
      case "APPROVED":
        return {
          label: "Đã đồng ý & hoàn tiền",
        };
      case "REJECTED":
        return {
          label: "Đã từ chối hoàn hàng",
        };
      default:
        return {
          label: status,
        };
    }
  };

  const statusConfig = getStatusLabelAndCls(returnDetail.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">
            Chi tiết yêu cầu Trả hàng
          </h3>
        </div>

        <div className="space-y-3.5 text-sm">
          {/* Trạng thái */}
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Trạng thái:</span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold border`}
            >
              {statusConfig.label}
            </span>
          </div>

          {/* Số tiền hoàn */}
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">
              Số tiền hoàn trả:
            </span>
            <span className="font-bold text-red-500 text-base">
              {formatCurrency(returnDetail.refundAmount)}
            </span>
          </div>

          {/* Lý do */}
          <div className="space-y-1 pb-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium block">
              Lý do từ bạn:
            </span>
            <p className="text-neutral-800 font-medium leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
              {returnDetail.reason}
            </p>
          </div>

          {/* Phản hồi từ Admin */}
          {(returnDetail.status === "APPROVED" ||
            returnDetail.status === "REJECTED") && (
            <div className="space-y-2">
              <span className="text-neutral-500 font-medium block">
                Phản hồi từ cửa hàng:
              </span>
              <div className="bg-neutral-50/55 p-3 rounded-xl border border-neutral-150 space-y-1.5">
                <p className="text-neutral-800 font-semibold leading-relaxed">
                  {returnDetail.adminNote || "Đã xử lý yêu cầu hoàn hàng."}
                </p>
                <div className="text-[11px] text-neutral-450 flex justify-between">
                  <span>
                    Duyệt bởi: {returnDetail.processedByName || "Hệ thống"}
                  </span>
                  <span>
                    {new Date(returnDetail.processedAt).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] text-neutral-400">
            Yêu cầu được gửi ngày:{" "}
            {new Date(returnDetail.createdAt).toLocaleString("vi-VN")}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-neutral-950 text-white font-semibold hover:bg-neutral-800 transition-all cursor-pointer text-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnDetailsModal;
