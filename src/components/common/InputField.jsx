import React from "react";

/**
 * Reusable premium input field with floating label.
 * Supports both React Hook Form ref forwarding and standard React state.
 */
const InputField = React.forwardRef(
  ({ label, name, type = "text", step, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          step={step}
          placeholder=""
          ref={ref}
          {...props}
          className={`w-full border rounded-full py-3 px-5 peer placeholder-transparent duration-300 hover:border-neutral-500 focus:border-neutral-500 outline-none ${
            error
              ? "border-red-500 focus:border-red-500 hover:border-red-500"
              : "border-neutral-300"
          }`}
        />
        <label
          htmlFor={name}
          className="text-neutral-400 text-sm font-semibold absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ml-1
              peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
              peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 duration-300 
              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:translate-x-0 
              peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:px-2 
              peer-not-placeholder-shown:bg-white"
        >
          {label}
        </label>
        {error && (
          <p className="text-xs text-red-500 font-medium mt-1 ml-4">
            {typeof error === "string" ? error : error?.message}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
