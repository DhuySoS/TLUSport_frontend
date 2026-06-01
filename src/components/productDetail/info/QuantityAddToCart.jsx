import React from 'react'

const QuantityAddToCart = ({ quantity = 1, setQuantity, stock = 1, handleAddToCart, isAdding }) => {
  const handleIncrease = (e) => {
    e.stopPropagation();
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= stock) {
      setQuantity(val);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div 
      className={`w-full flex flex-col sm:flex-row gap-3 md:block md:relative md:rounded-full md:h-19 md:transition-colors md:duration-300 ${
        isAdding ? "md:bg-neutral-500" : "md:bg-neutral-900 md:hover:bg-neutral-800"
      }`}
    >
      {/* Quantity Picker: first in mobile DOM, absolute on desktop */}
      <div 
        className="flex items-center justify-between border border-neutral-300 rounded-full px-4 h-14 bg-neutral-100 w-full sm:w-auto md:absolute md:z-20 md:left-0 md:top-0 md:rounded-full md:h-full md:bg-neutral-600/80 md:border-none md:px-4 md:gap-2" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleDecrease}
          className="w-10 h-10 text-neutral-600 font-bold text-2xl flex items-center justify-center mx-2 cursor-pointer hover:text-black md:text-neutral-300 md:hover:text-white"
        >
          -
        </button>
        <input 
          type="text" 
          className="text-neutral-900 text-center text-lg font-medium bg-transparent border-none focus:outline-none w-8 md:text-white" 
          value={quantity} 
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <button 
          onClick={handleIncrease}
          className="w-10 h-10 text-neutral-600 font-bold text-2xl flex items-center justify-center mx-2 cursor-pointer hover:text-black md:text-neutral-300 md:hover:text-white"
        >
          +
        </button>
      </div>

      {/* Add to Cart Action Wrapper */}
      <div 
        className={`w-full flex h-14 rounded-full cursor-pointer items-center justify-center transition-colors duration-300 md:w-auto md:h-auto md:bg-transparent md:absolute md:inset-0 md:flex md:items-center md:justify-center md:rounded-full ${
          isAdding 
            ? "bg-neutral-500 md:bg-transparent" 
            : "bg-neutral-900 hover:bg-neutral-800 md:bg-transparent md:hover:bg-transparent"
        }`}
        onClick={() => {
          if (!isAdding && handleAddToCart) {
            handleAddToCart();
          }
        }}
      >
        <p className="text-white text-xl font-bold flex items-center gap-2 md:pl-28">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M6 6h24l-3 13H9m18 4H10L5 2H2" />
                <circle cx="25" cy="27" r="2" />
                <circle cx="12" cy="27" r="2" />
              </g>
            </svg>
          </span>
          {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng"}
        </p>
      </div>
    </div>
  );
}

export default QuantityAddToCart;