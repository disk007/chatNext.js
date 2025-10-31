import { useEffect } from "react";

/**
 * Detects click outside a referenced element and runs a callback.
 * @param ref - React ref to the element you want to detect clicks outside of.
 * @param handler - Function to run when clicked outside.
 */
export function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
