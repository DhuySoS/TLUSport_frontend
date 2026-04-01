import React from "react";

const RenderStars = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => {
        const isFilled = index + 1 <= rating;

        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            key={index}
            className={`${
              isFilled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          >
            <path
              fill="currentColor"
              d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default RenderStars;
