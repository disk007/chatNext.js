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

const SendChat = ({ roomId }: SendChatProps) => {
    const [message, formAction] = useActionState(addMessage, null);
    const [files, setFiles] = useState<File[]>([]);
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
        setFiles([]);
    }
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        setFiles((prev) => {
            const prevNames = new Set(prev.map((f) => f.name));

            const newFiles = Array.from(selectedFiles).filter(
            (file) => !prevNames.has(file.name)
            );

            return [...prev, ...newFiles];
        });
    }
    useEffect(() => {
        if (message?.status === "success") {
            console.log("ส่งข้อความสำเร็จ:", message.message);
            socket.emit("send-message", {
                roomId,
                message: message.message,
            });
            resetformValues();
        } else if (message?.status === "error") {
            showToast(ToastStatusEnum.ERROR, message.message);
        } else if (message?.status === "validate") {
            showToast(ToastStatusEnum.WARNING, message.message);
        }
    }, [message]);
    return (
        <>
            {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 px-4">
                    {files.map((file, index) => {
                        const isImage = file.type.startsWith("image");

                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-[#0F172A] border border-gray-700 px-3 py-2 rounded-xl shadow-sm"
                            >
                                {/* icon */}
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1E293B] text-[#38BDF8]">
                                    {isImage ? "🖼️" : "📎"}
                                </div>

                                {/* filename */}
                                <div className="flex flex-col w-40">
                                    <span className="text-sm text-white truncate">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </span>
                                </div>

                                {/* remove */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFiles((prev) => prev.filter((_, i) => i !== index))
                                    }
                                    className="ml-2 text-gray-400 hover:text-red-400 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* ส่วนพิมพ์ข้อความ */}
            <form action={formAction}>
                <div className="p-4 border-t border-[#1E293B] flex items-center space-x-2">
                    {/* ปุ่มอัปโหลดไฟล์ */}
                    <label className="p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors">
                        <PaperClipIcon className="w-5 h-5 text-white" />
                        <input
                            type="file"
                            name="file"
                            className="hidden"
                            multiple
                            onChange={handleFileUpload}
                        />
                    </label>
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