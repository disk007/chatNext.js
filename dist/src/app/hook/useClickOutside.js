"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = useClickOutside;
const react_1 = require("react");
/**
 * Detects click outside a referenced element and runs a callback.
 * @param ref - React ref to the element you want to detect clicks outside of.
 * @param handler - Function to run when clicked outside.
 */
function useClickOutside(ref, handler) {
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handler]);
}
