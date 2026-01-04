import { createServer } from "http";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIOServer(httpServer, {
    path: "/api/socket",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log(`👥 User joined room ${roomId}`);
    });

    socket.on("send-message", (message) => {
      io.to(message.roomId).emit("new-message", message);
      io.to(message.roomId).emit("update-message", message);
    });

    socket.on("read-messages", (roomId) => {
      console.log(`✅ Messages in room ${roomId} marked as read`);
      io.to(roomId).emit("room-read", roomId );
    });

    socket.on("edit-message", (updatedMsg) => {
      console.log("✏️ Message edited:");
      io.emit("message-edited", updatedMsg);
    });

    socket.on("delete-message", (messageId,type) => {
      console.log(`🗑️ Message ${messageId} deleted`);
      io.emit("message-deleted", messageId,type);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  const port = 3000;
  httpServer.listen(port, () =>
    console.log(`🚀 Server ready on http://localhost:${port}`)
  );
});
