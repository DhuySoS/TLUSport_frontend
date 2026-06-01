import React from "react";

const ConfirmDialog = ({
  onConfirm,
  onCancel,
  title = "Bạn có chắc không?",
  description = "Hành động này không thể hoàn tác.",
  confirmLabel = "Xác nhận",
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    />
    {/* Dialog box */}
    <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-80 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-red-500">
          <path
            fill="currentColor"
            d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center">
        <h3 className="text-base font-bold text-neutral-800 mb-1">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-colors cursor-pointer"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
