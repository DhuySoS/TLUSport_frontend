import { useState } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebouncValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
