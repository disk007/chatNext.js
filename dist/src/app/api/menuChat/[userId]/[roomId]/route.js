"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("next/server");
const prisma_1 = require("../../../../../../prisma/prisma");
const GET = async (req, context) => {
    try {
        const params = await context.params;
        const userId = parseInt(params.userId);
        const roomId = parseInt(params.roomId);
        console.log(userId);
        const permission = await prisma_1.prisma.chatMember.findFirst({
            where: { userId }
        });
        const approvedCount = await prisma_1.prisma.chatMember.count({
            where: { isApproved: true, roomId },
        });
        const pendingCount = await prisma_1.prisma.chatMember.count({
            where: { isApproved: false, roomId },
        });
        let messages;
        if (permission?.role != 'admin') {
            messages = {
                approvedCount,
                pendingCount,
                role: permission?.role
            };
        }
        else {
            messages = {
                approvedCount,
                pendingCount: null,
                role: permission?.role
            };
        }
        return server_1.NextResponse.json({ status: "success", messages });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.GET = GET;
