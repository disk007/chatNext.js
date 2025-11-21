import { NextRequest } from "next/server";
import { Server as ServerIO } from "socket.io";

export const SocketHandler = async (req: NextRequest) => {
  const res: any = (req as any).socket?.server?.res;

  if (!res?.socket?.server?.io) {
    console.log("✅ Starting Socket.IO server...");
    const io = new ServerIO(res.socket.server);

    io.on("connection", (socket) => {
      console.log("🟢 User connected:", socket.id);

      socket.on("join-room", (roomId: string) => {
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
