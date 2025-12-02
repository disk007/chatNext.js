"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const prisma_1 = require("@/prisma/prisma");
const server_1 = require("next/server");
const GET = async (request, context) => {
    try {
        const params = await context.params;
        const roomId = parseInt(params.id);
        const userId = parseInt(params.userId);
        const chat = await prisma_1.prisma.message.findMany({
            where: {
                roomId: roomId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
            },
        });
        // const updatedMessages = chat?.map(msg => ({
        //     id: msg.id,
        //     content: msg.content,
        //     createdAt: msg.createdAt,
        //     anotherChat: msg.senderId !== userId, 
        // }));
        await prisma_1.prisma.message.updateMany({
            where: {
                roomId: roomId,
                senderId: userId,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
        return server_1.NextResponse.json({
            status: "success",
            chat: chat,
        });
    }
    catch (error) {
        console.error("Error fetching chat details:", error);
        return server_1.NextResponse.json({
            status: "error",
            message: "Internal server error",
        }, { status: 500 });
    }
};
exports.GET = GET;
