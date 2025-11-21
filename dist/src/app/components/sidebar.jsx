"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outline_1 = require("@heroicons/react/24/outline");
const footer_1 = __importDefault(require("./footer"));
const btnPlus_1 = __importDefault(require("./btnPlus"));
const listChat_1 = __importDefault(require("./listChat"));
const Sidebar = () => {
    return (<>
        <div className="h-screen w-[450px] bg-[#0F172A] text-[#E2E8F0] flex flex-col fixed border-r-1 border-[#1E293B]">
            <div className="pt-5 pb-2 text-2xl font-bold flex items-center justify-between px-3">
                <div className=" text-[#38BDF8]">
                    Meassage
                </div>
                <btnPlus_1.default />
            </div>
            <div className="flex items-center py-1 px-2 bg-[#1E293B] rounded-lg mx-3 mb-5 ring-0 focus-within:ring-2 focus-within:ring-[#F97316] transition-all">
                <outline_1.MagnifyingGlassIcon className="w-5 h-5 text-[#38BDF8] mr-2"/>
                <input type="text" placeholder="Search..." className="bg-[#1E293B] placeholder-[#94A3B8] text-[#E2E8F0] focus:outline-none w-full p-2"/>
            </div>
            <listChat_1.default />
            <footer_1.default />
        </div>
        </>);
};
exports.default = Sidebar;
