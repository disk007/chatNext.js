"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListChat = useListChat;
const react_1 = require("react");
const getRoom_1 = require("../api/room/getRoom");
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000", {
    path: "/api/socket",
});
function useListChat({ roomId } = {}) {
    const [rooms, setRooms] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const updateMessageById = (roomId, updatedMsg) => {
        const formattedMsg = {
            id: updatedMsg.id,
            content: updatedMsg.content,
            createdAt: updatedMsg.createdAt,
            sender: {
                id: updatedMsg.userId,
                username: updatedMsg.username,
            },
            anotherChat: updatedMsg.anotherChat ?? false,
        };
        setRooms(prev => prev?.map(room => {
            if (room.id !== roomId)
                return room;
            const messageExists = room.messages.some(msg => msg.id === formattedMsg.id);
            return {
                ...room,
                messages: messageExists
                    ? room.messages.map(msg => msg.id === formattedMsg.id ? { ...msg, ...formattedMsg } : msg)
                    : [...room.messages, formattedMsg],
                unreadCount: (room.unreadCount ?? 0) + 1,
            };
        }) || []);
    };
    const fetchRooms = async () => {
        const data = await (0, getRoom_1.GetRoom)();
        setRooms(data.rooms || null);
        setLoading(false);
    };
    (0, react_1.useEffect)(() => {
        fetchRooms();
    }, []);
    (0, react_1.useEffect)(() => {
        socket.emit("join-room", roomId);
        socket.on("room-read", (roomId) => {
            setRooms(prev => prev?.map(room => room.id === Number(roomId)
                ? { ...room, unreadCount: 0 }
                : room) || []);
        });
        socket.on("update-message", (newMsg) => {
            console.log("update event data:", newMsg);
            updateMessageById(newMsg.roomId, newMsg.message);
        });
        return () => {
            socket.off("room-read");
            socket.off("update-message");
        };
    }, [roomId]);
    return { rooms, loading, fetchRooms, setRooms };
}
