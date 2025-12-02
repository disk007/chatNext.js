"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outline_1 = require("@heroicons/react/24/outline");
const outline_2 = require("@heroicons/react/24/outline");
const react_1 = require("react");
const toast_1 = require("../toast/toast");
const addMessage_1 = require("./action/addMessage");
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000", {
    path: "/api/socket",
});
const SendChat = ({ roomId }) => {
    const [message, formAction] = (0, react_1.useActionState)(addMessage_1.addMessage, null);
    const [formValues, setFormValues] = (0, react_1.useState)({
        message: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const resetformValues = () => {
        setFormValues({
            message: "",
        });
    };
    (0, react_1.useEffect)(() => {
        if (message?.status === "success") {
            socket.emit("send-message", {
                roomId,
                message: message.message[message.message.length - 1],
            });
            resetformValues();
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
        else if (message?.status === "validate") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.WARNING, message.message);
        }
    }, [message]);
    return (<>
            {/* ส่วนพิมพ์ข้อความ */}
            <form action={formAction}>
                <div className="p-4 border-t border-[#1E293B] flex items-center space-x-2">
                    {/* ปุ่มอัปโหลดไฟล์ */}
                    <label className="p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors">
                        <outline_2.PaperClipIcon className="w-5 h-5 text-white"/>
                        <input type="file" className="hidden" onChange={(e) => console.log(e.target.files)}/>
                    </label>

                    {/* Input พิมพ์ข้อความ */}
                    <input type="text" placeholder="พิมพ์ข้อความ..." name="message" value={formValues.message} onChange={handleChange} className="flex-1 p-2 bg-[#0F172A] border border-gray-600 rounded-lg text-white outline-none"/>
                    <input type="hidden" name="roomId" value={roomId || ""}/>

                    {/* ปุ่มส่งข้อความ */}
                    <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors" type="submit">
                        <outline_1.PaperAirplaneIcon className="w-5 h-5 text-white"/>
                    </button>
                </div>
            </form>
        </>);
};
exports.default = SendChat;
