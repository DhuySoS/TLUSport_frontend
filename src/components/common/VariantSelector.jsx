import React, { useEffect, useRef, useState } from "react";

const VariantSelector = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-medium transition-all
                   hover:bg-neutral-200 active:scale-95 ${isOpen ? "ring-1 ring-black bg-white" : ""}`}
      >
        <span>{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M36 18L24 30L12 18"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-2xl shadow-xl z-100 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="py-2 px-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm rounded-xl transition-colors
                           ${
                             option === label
                               ? "bg-neutral-100 font-bold text-black"
                               : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                           }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
