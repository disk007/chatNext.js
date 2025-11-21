"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
const socket_io_1 = require("socket.io");
const SocketHandler = async (req) => {
    const res = req.socket?.server?.res;
    if (!res?.socket?.server?.io) {
        console.log("✅ Starting Socket.IO server...");
        const io = new socket_io_1.Server(res.socket.server);
        io.on("connection", (socket) => {
            console.log("🟢 User connected:", socket.id);
            socket.on("join-room", (roomId) => {
                socket.join(roomId);
                console.log(`👥 Joined room ${roomId}`);
            });
            socket.on("send-message", (message) => {
                io.to(message.roomId).emit("new-message", message);
            });
        });
        res.socket.server.io = io;
    }
    return new Response("Socket.IO running", { status: 200 });
};
exports.SocketHandler = SocketHandler;
