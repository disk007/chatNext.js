"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const prisma_1 = require("@/prisma/prisma");
const server_1 = require("next/server");
const GET = async (request, context) => {
    try {
        const params = await context.params;
        const userId = parseInt(params.id);
        const raw = await prisma_1.prisma.message.findFirst({
            where: {
                senderId: userId,
                isRead: false,
            }
        });
        return server_1.NextResponse.json({
            status: "success",
            message: raw,
        });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
};
exports.GET = GET;
