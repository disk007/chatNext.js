"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = (0, http_1.createServer)((req, res) => {
        handle(req, res);
    });
    const io = new socket_io_1.Server(httpServer, {
        path: "/api/socket",
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("🟢 User connected:", socket.id);
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`👥 User joined room ${roomId}`);
        });
        socket.on("send-message", (message) => {
            console.log("📩 New message:", message);
            io.to(message.roomId).emit("new-message", message);
        });
    });
    const port = 3000;
    httpServer.listen(port, () => console.log(`🚀 Server ready on http://localhost:${port}`));
});
