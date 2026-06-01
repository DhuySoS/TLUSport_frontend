import React from "react";

/**
 * Reusable modal overlay component.
 * Handles background click dismissal, backdrop blurring, headers, and standard layout wrappers.
 */
const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b">
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4rem"
              height="1.4rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
