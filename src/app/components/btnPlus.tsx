"use client";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/16/solid"
import { useRef, useState } from "react";
import ModalAddChat, { ModalJoinChat } from "./modal";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";
import { useClickOutside } from "../hook/useClickOutside";


const BntPlus = () => {
    const [open,setOpen] = useState(false);
    const [modalOpen,setModalOpen] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, () => setOpen(false));
    const setModal = (type:string) => {
        console.log(type)
        setModalOpen(type);
        setOpen(false); // ปิด dropdown หลังเลือก
    };
    return(
        <>
            <div className="relative" ref={menuRef}>
                <div
                    className="cursor-pointer p-2 hover:bg-[#1a253e] transition"
                    onClick={() => setOpen(!open)}
                >
                    <PlusIcon className="w-6 h-6 text-[#38BDF8] hover:text-white transition" />
                </div>

                {open && (
                    <div className="absolute text-base top-7 right-0 mt-2 rounded border border-gray-700 bg-[#0F172A] text-[#E2E8F0] w-40 shadow-lg z-50">
                    <div className="flex items-center gap-2 border-b border-gray-700 px-3 py-2 hover:bg-[#1a253e] cursor-pointer" onClick={()=>setModal("addChat")}>
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#38BDF8]" />
                        <span>Add Chat</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a253e] cursor-pointer" onClick={()=>setModal("joinChat")}>
                        <UserPlusIcon className="w-5 h-5 text-[#38BDF8]" />
                        <span>Join Chat</span>
                    </div>
                    </div>
                )}
                {modalOpen === "addChat" && (
                    <ModalAddChat
                    title="Add Chat Room"
                    placeholder="Enter chat room name"
                    onClose={()=> setModalOpen("")}
                    />
                )}
                {modalOpen === "joinChat" && (
                    <ModalJoinChat
                    title="Join Chat Room"
                    placeholder="Enter chat room code"
                    onClose={()=> setModalOpen("")}
                    />
                )}
            </div>
        </>
    )
}
export default BntPlus;