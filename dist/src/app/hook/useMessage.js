'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessage = useMessage;
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const getMessage_1 = require("../api/messages/getMessage");
const socket = (0, socket_io_client_1.io)("http://localhost:3000", {
    path: "/api/socket",
});
function useMessage({ roomId }) {
    const [message, setMessage] = (0, react_1.useState)(null);
    const [isLoadingMessage, setIsLoadingMessage,] = (0, react_1.useState)(true);
    const appendMessage = (newMessage) => {
        setMessage(prev => prev ? [...prev, newMessage] : [newMessage]);
    };
    const fetchMessages = async () => {
        if (!roomId) {
            setIsLoadingMessage(false);
            setMessage(null);
            return;
        }
        setIsLoadingMessage(true);
        const data = await (0, getMessage_1.GetMessages)(roomId);
        setMessage(data.chat || null);
        if (data.status === 'success') {
            socket.emit("read-messages", roomId);
        }
        setIsLoadingMessage(false);
    };
    (0, react_1.useEffect)(() => {
        fetchMessages();
        socket.emit("join-room", roomId);
        socket.on("new-message", (newMsg) => {
            console.log("new-message event data:", newMsg);
            appendMessage({
                id: newMsg.message.id,
                content: newMsg.message.content,
                createdAt: newMsg.message.createdAt,
                senderId: newMsg.message.sendId,
            });
        });
        return () => {
            socket.off("new-message");
        };
    }, [roomId]);
    return { message, isLoadingMessage, fetchMessages };
}
