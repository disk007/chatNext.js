"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("next/server");
const prisma_1 = require("../../../../prisma/prisma");
const POST = async (req) => {
    try {
        const body = await req.json();
        const { message, userId, roomId } = body;
        const newMessage = await prisma_1.prisma.message.create({
            data: {
                content: message,
                roomId: Number(roomId),
                senderId: userId,
            },
        });
        const chat = await prisma_1.prisma.message.findMany({
            where: {
                roomId: Number(roomId),
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
                sender: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        const updatedMessages = chat?.map(msg => ({
            id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt,
            anotherChat: msg.senderId !== userId,
            userId: msg.senderId,
            username: msg.sender?.username || "Unknown",
        }));
        return server_1.NextResponse.json({ status: "success", message: updatedMessages });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.POST = POST;
