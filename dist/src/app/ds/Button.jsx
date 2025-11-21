"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_dom_1 = require("react-dom");
const Button = ({ className, type, text, disabled = false, onClick }) => {
    // code
    const { pending } = (0, react_dom_1.useFormStatus)();
    const isDisabled = pending || disabled;
    return (<button disabled={isDisabled} type={type} onClick={onClick} className={`${className} capitalize ${isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}>
      {pending ? "Please wait..." : text}
    </button>);
};
exports.Button = Button;
