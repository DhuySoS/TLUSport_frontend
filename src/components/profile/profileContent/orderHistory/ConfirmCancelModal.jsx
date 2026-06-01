import React from "react";

const ConfirmCancelModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 text-red-600">
          <h3 className="text-lg font-bold text-neutral-900">
            Xác nhận hủy đơn
          </h3>
        </div>
        <p className="text-neutral-500 text-sm leading-relaxed">
          Bạn có chắc chắn muốn hủy đơn hàng này?
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-2xl border border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors cursor-pointer text-sm"
          >
            Đóng
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer text-sm"
          >
            Hủy đơn
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCancelModal;
