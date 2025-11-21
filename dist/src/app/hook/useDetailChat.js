'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDetailChat = useDetailChat;
const react_1 = require("react");
const getDatailChat_1 = require("../api/room/detailChat/getDatailChat");
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000", {
    path: "/api/socket",
});
function useDetailChat({ roomId }) {
    const [detailChat, setDetailChat] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const fetchDetailChat = async () => {
        if (!roomId) {
            setDetailChat(null);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const data = await (0, getDatailChat_1.GetDetailChat)(roomId);
        setDetailChat(data.chat || null);
        setIsLoading(false);
    };
    (0, react_1.useEffect)(() => {
        if (!roomId)
            return;
        // join room
        socket.emit("join-room", roomId);
        // fetch ข้อมูลครั้งแรก
        fetchDetailChat();
        // subscribe message ใหม่
        const handleNewMessage = async (message) => {
            console.log("Received new-message:", message);
            // ถ้าต้องการ fetch ใหม่จาก API
            await fetchDetailChat();
            // หรือถ้าแค่ map content
            // setDetailChat(prev => prev ? { ...prev, messages: [...prev.messages, { content: message.message }] } : prev);
        };
        socket.on("new-message", handleNewMessage);
        return () => {
            socket.off("new-message", handleNewMessage);
        };
    }, [roomId]);
    return { detailChat, isLoading, fetchDetailChat };
}
