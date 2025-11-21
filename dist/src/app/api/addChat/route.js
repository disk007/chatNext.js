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
        return server_1.NextResponse.json({ status: "success", message: newMessage });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.POST = POST;
