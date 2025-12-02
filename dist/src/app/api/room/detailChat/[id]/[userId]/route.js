"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("next/server");
const prisma_1 = require("@/prisma/prisma");
const GET = async (request, context) => {
    try {
        const params = await context.params;
        const roomId = parseInt(params.id);
        const userId = parseInt(params.userId);
        const chat = await prisma_1.prisma.chatRoom.findUnique({
            where: {
                id: roomId,
            },
            select: {
                id: true,
                name: true,
                isGroup: true,
                members: {
                    where: { userId },
                    select: { isApproved: true },
                },
            },
        });
        const chatData = {
            id: chat?.id,
            name: chat?.name,
            isGroup: chat?.isGroup,
            isApproved: chat?.members[0]?.isApproved ?? false,
        };
        return server_1.NextResponse.json({
            status: "success",
            chat: chatData,
        });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.GET = GET;
