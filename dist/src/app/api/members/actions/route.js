"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const prisma_1 = require("@/prisma/prisma");
const server_1 = require("next/server");
const POST = async (req) => {
    try {
        const body = await req.json();
        const { selectedIds, actionType, roomId } = body;
        if (actionType === "approve") {
            await prisma_1.prisma.chatMember.updateMany({
                where: { userId: { in: selectedIds.map(Number) }, roomId: Number(roomId) },
                data: { isApproved: true },
            });
        }
        else if (actionType === "reject") {
            await prisma_1.prisma.chatMember.deleteMany({
                where: { userId: { in: selectedIds.map(Number) }, roomId: Number(roomId) },
            });
        }
        return server_1.NextResponse.json({ status: "success", message: actionType == "approve" ? "Approved successfully" : "Reject successfully" });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error });
    }
};
exports.POST = POST;
