"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalRoot = void 0;
const react_1 = require("react");
const useModalRoot = () => {
    const [container, setContainer] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let el = document.getElementById("modal-root");
        if (!el) {
            el = document.createElement("div");
            el.id = "modal-root";
            document.body.appendChild(el);
        }
        setContainer(el);
    }, []);
    return container;
};
exports.useModalRoot = useModalRoot;
