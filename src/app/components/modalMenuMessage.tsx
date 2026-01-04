import { ChatBubbleLeftRightIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { InterfaceDeleteMessage, interfaceEditMessage } from "../interface/message";
import { deleteMessage } from "./action/deleteMessage";
import { io } from "socket.io-client";
import { useState } from "react";
import { ModalEditMessage } from "./modal";
import content from "./content";
import { number } from "zod";

const socket = io("http://localhost:3000", {
    path: "/api/socket",
});

interface interfaceModalMenu {
    messageId: number;
    content?: string;
    type?: string;
    onOpenEdit?: () => void;
    onCloseEdit?: () => void;
}
const ModalMenuMessage = ({ messageId, content, type, onOpenEdit, onCloseEdit }: interfaceModalMenu) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const formData = new FormData();
        formData.append("messageId", messageId.toString());
        formData.append("type", type ?? "");
        const result = await deleteMessage(formData);
        if (result.status === "success") {
            socket.emit("delete-message", messageId,result.type);
        }
    }
    return (
        <>
            <div className="text-sm mt-2 rounded border border-gray-700 bg-[#0F172A] text-[#E2E8F0] w-32 shadow-lg z-50" >
                <div
                    className="flex items-center gap-2 border-b border-gray-700 px-3 py-2 hover:bg-[#1a253e] cursor-pointer"
                    onClick={handleDelete}
                >
                    <span>Delete </span>
                </div>
                {type !== "file" && (
                    <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a253e] cursor-pointer"
                        onClick={() => {
                            setOpen(true);
                            onOpenEdit?.();      // ← แจ้ง parent ว่า modal เปิดแล้ว
                        }}
                    >
                        <span>Edit</span>
                    </div>
                )}

            </div>
            {open && type !== "file" && (
                <ModalEditMessage title="Edit Message" messageId={messageId} content={content} onClose={() => { setOpen(false); onCloseEdit?.(); }} />
            )}
        </>
    )
}
export default ModalMenuMessage;