"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const prisma_1 = require("@/prisma/prisma");
const server_1 = require("next/server");
const POST = async (req) => {
    try {
        const body = await req.json();
        const { roomId, name } = body;
        const existingRoom = await prisma_1.prisma.chatRoom.findUnique({
            where: { id: Number(roomId) },
            select: { name: true },
        });
        if (!existingRoom) {
            return server_1.NextResponse.json({ status: "error", message: "Room not found" }, { status: 404 });
        }
        if (existingRoom.name === name) {
            return server_1.NextResponse.json({
                status: "info",
                message: "No changes detected",
            });
        }
        await prisma_1.prisma.chatRoom.update({
            where: {
                id: Number(roomId),
            },
            data: {
                name: name,
            },
        });
        return server_1.NextResponse.json({ status: 'success', message: 'Group updated successfully' });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.POST = POST;
