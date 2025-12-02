"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fi_1 = require("react-icons/fi");
const useAuth_1 = require("../\u0E35useConText/useAuth");
const Footer = () => {
    const { user } = (0, useAuth_1.useAuth)();
    return (<>
            <div className="flex justify-between mt-auto border-t border-[#1E293B] px-4 py-3 text-sm text-[#94A3B8]">
                <div>Username : {user?.username}</div>
                <fi_1.FiLogOut className="w-6 h-6 hover:text-white cursor-pointer"/>
            </div>
        </>);
};
exports.default = Footer;
