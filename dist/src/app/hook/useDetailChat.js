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
            setIsLoading(false);
            setDetailChat(null);
            return;
        }
        setIsLoading(true);
        const data = await (0, getDatailChat_1.GetDetailChat)(roomId);
        setDetailChat(data.chat || null);
        setIsLoading(false);
    };
    (0, react_1.useEffect)(() => {
        fetchDetailChat();
    }, [roomId]);
    return { detailChat, isLoading, fetchDetailChat };
}
