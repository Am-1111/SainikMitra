import React, { useEffect } from "react";

// Define a type for the callback function
type CallbackType = (event: MouseEvent | TouchEvent) => void;

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: CallbackType // Use the defined CallbackType
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
