import React from "react";

/**
 * Reusable premium select dropdown with floating label.
 * Supports React Hook Form ref forwarding and custom change handlers.
 */
const SelectField = React.forwardRef(
  ({ label, name, options = [], error, loading, onChange, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(props.value || props.defaultValue || "");

    const handleChange = (e) => {
      setLocalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    React.useEffect(() => {
      if (props.value !== undefined) {
        setLocalValue(props.value);
      }
    }, [props.value]);

    const hasValue = localValue !== "";

    return (
      <div className="relative">
        <select
          id={name}
          name={name}
          ref={ref}
          value={localValue}
          onChange={handleChange}
          {...props}
          className={`w-full border rounded-full py-3 px-5 peer appearance-none focus:outline-none duration-300 hover:border-neutral-500 focus:border-neutral-500 bg-white ${
            error
              ? "border-red-500 focus:border-red-500 hover:border-red-500"
              : "border-neutral-300"
          } ${props.disabled ? "opacity-50 cursor-not-allowed bg-neutral-50" : ""}`}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.code || opt.id || opt.value} value={opt.name || opt.value}>
              {opt.name || opt.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron icon */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 9l6 6l6-6" />
          </svg>
        </div>

        <label
          htmlFor={name}
          className={`text-neutral-400 font-semibold absolute left-4 -translate-y-1/2 pointer-events-none ml-1 duration-300
              peer-focus:bg-white peer-focus:px-2 peer-focus:pt-1 peer-focus:text-[12px]
              peer-focus:top-0 peer-focus:translate-x-0 peer-focus:scale-90 peer-focus:-translate-y-1/2
              ${
                hasValue
                  ? "top-0 scale-90 text-[12px] px-2 bg-white"
                  : "top-1/2 text-sm"
              }`}
        >
          {loading ? "Đang tải dữ liệu..." : label}
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

SelectField.displayName = "SelectField";

export default SelectField;
