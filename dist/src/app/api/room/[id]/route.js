"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("next/server");
const prisma_1 = require("@/prisma/prisma");
const GET = async (request, context) => {
    try {
        const params = await context.params;
        const userId = parseInt(params.id);
        const raw = await prisma_1.prisma.chatRoom.findMany({
            where: {
                members: {
                    some: { userId: userId },
                },
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                messages: {
                    orderBy: { createdAt: 'desc' }, // เรียงจากล่าสุด
                    take: 1, // ดึงข้อความล่าสุด 1 ข้อความ
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        sender: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        });
        const rooms = raw.sort((a, b) => {
            const aTime = a.messages[0]?.createdAt
                ? new Date(a.messages[0].createdAt).getTime()
                : 0;
            const bTime = b.messages[0]?.createdAt
                ? new Date(b.messages[0].createdAt).getTime()
                : 0;
            return bTime - aTime;
        });
        return server_1.NextResponse.json({
            status: "success",
            rooms,
        });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.GET = GET;
