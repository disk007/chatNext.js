"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const solid_1 = require("@heroicons/react/16/solid");
const react_1 = require("react");
const modal_1 = __importStar(require("./modal"));
const solid_2 = require("@heroicons/react/16/solid");
const useClickOutside_1 = require("../hook/useClickOutside");
const BntPlus = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [modalOpen, setModalOpen] = (0, react_1.useState)("");
    const menuRef = (0, react_1.useRef)(null);
    (0, useClickOutside_1.useClickOutside)(menuRef, () => setOpen(false));
    const setModal = (type) => {
        console.log(type);
        setModalOpen(type);
        setOpen(false); // ปิด dropdown หลังเลือก
    };
    return (<>
            <div className="relative" ref={menuRef}>
                <div className="cursor-pointer p-2 hover:bg-[#1a253e] transition" onClick={() => setOpen(!open)}>
                    <solid_1.PlusIcon className="w-6 h-6 text-[#38BDF8] hover:text-white transition"/>
                </div>

                {open && (<div className="absolute text-base top-7 right-0 mt-2 rounded border border-gray-700 bg-[#0F172A] text-[#E2E8F0] w-40 shadow-lg z-50">
                    <div className="flex items-center gap-2 border-b border-gray-700 px-3 py-2 hover:bg-[#1a253e] cursor-pointer" onClick={() => setModal("addChat")}>
                        <solid_2.ChatBubbleLeftRightIcon className="w-5 h-5 text-[#38BDF8]"/>
                        <span>Add Chat</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a253e] cursor-pointer" onClick={() => setModal("joinChat")}>
                        <solid_1.UserPlusIcon className="w-5 h-5 text-[#38BDF8]"/>
                        <span>Join Chat</span>
                    </div>
                    </div>)}
                {modalOpen === "addChat" && (<modal_1.default title="Add Chat Room" placeholder="Enter chat room name" onClose={() => setModalOpen("")}/>)}
                {modalOpen === "joinChat" && (<modal_1.ModalJoinChat title="Join Chat Room" placeholder="Enter chat room code" onClose={() => setModalOpen("")}/>)}
            </div>
        </>);
};
exports.default = BntPlus;
