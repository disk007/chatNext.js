"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("next/server");
const prisma_1 = require("../../../../../prisma/prisma");
const GET = async (req, context) => {
    try {
        const params = await context.params;
        const roomId = parseInt(params.roomId);
        const members = await prisma_1.prisma.chatMember.findMany({
            where: { roomId, isApproved: true },
            select: {
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            }
        });
        return server_1.NextResponse.json({ status: "success", messages: members });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error });
    }
};
exports.GET = GET;
