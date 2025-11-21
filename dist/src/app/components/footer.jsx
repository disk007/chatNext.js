"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fi_1 = require("react-icons/fi");
const getProfile_1 = require("../api/profile/getProfile");
const Footer = async () => {
    const profile = await (0, getProfile_1.getProfile)();
    return (<>
            <div className="flex justify-between mt-auto border-t border-[#1E293B] px-4 py-3 text-sm text-[#94A3B8]">
                <div>Username : {profile?.username}</div>
                <fi_1.FiLogOut className="w-6 h-6 hover:text-white cursor-pointer"/>
            </div>
        </>);
};
exports.default = Footer;
