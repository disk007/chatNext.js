import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { useActionState, useEffect, useState } from "react";
import { showToast, ToastStatusEnum } from "../toast/toast";
import { addMessage } from "./action/addMessage";
import { io } from "socket.io-client";
import { useDetailChat } from "../hook/useDetailChat";

type SendChatProps = {
  roomId: string | null;
};
const socket = io("http://localhost:3000", {
  path: "/api/socket",
});

const SendChat = ({roomId}:SendChatProps) => {
    const [message, formAction] = useActionState(addMessage,null);
    const [formValues, setFormValues] = useState({
        message: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    }
    const resetformValues = () => {
        setFormValues({
            message: "",
        });
    }
    useEffect(() => {
        if (message?.status === "success") {
            socket.emit("send-message", {
                roomId, 
                message: formValues.message,
            });
            console.log("Message sent via socket:",formValues.message);
            resetformValues();
        } else if (message?.status === "error") {
            showToast(ToastStatusEnum.ERROR, message.message);
        } else if (message?.status === "validate") {
            showToast(ToastStatusEnum.WARNING, message.message);
        }
    }, [message]);
    return(
        <>
            {/* ส่วนพิมพ์ข้อความ */}
            <form action={formAction}>
                <div className="p-4 border-t border-[#1E293B] flex items-center space-x-2">
                    {/* ปุ่มอัปโหลดไฟล์ */}
                    <label className="p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors">
                        <PaperClipIcon className="w-5 h-5 text-white" />
                        <input type="file" className="hidden" onChange={(e) => console.log(e.target.files)} />
                    </label>

                    {/* Input พิมพ์ข้อความ */}
                    <input
                        type="text"
                        placeholder="พิมพ์ข้อความ..."
                        name="message"
                        value={formValues.message}
                        onChange={handleChange}
                        className="flex-1 p-2 bg-[#0F172A] border border-gray-600 rounded-lg text-white outline-none"
                    />
                    <input type="hidden" name="roomId" value={roomId || ""} />

                    {/* ปุ่มส่งข้อความ */}
                    <button
                        className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
                        type="submit"
                    >
                        <PaperAirplaneIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </form>
        </>
    )
}
export default SendChat;