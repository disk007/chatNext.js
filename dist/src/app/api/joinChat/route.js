"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("next/server");
const prisma_1 = require("../../../../prisma/prisma");
const POST = async (req) => {
    try {
        const body = await req.json();
        const { code, userId } = body;
        console.log('userId ', userId);
        const member = await prisma_1.prisma.chatMember.findFirst({
            where: {
                userId: userId,
                isApproved: true,
            },
        });
        console.log('member ', member);
        // if(member){
        //     return NextResponse.json({
        //         status: "warning",
        //         message: "User is an approved member.",
        //     });
        // }
        const existCode = await prisma_1.prisma.chatRoom.findFirst({
            where: { code },
        });
        if (!existCode) {
            return server_1.NextResponse.json({
                status: "error",
                message: "Chat room not found",
            }, { status: 404 });
        }
        await prisma_1.prisma.chatMember.create({
            data: {
                roomId: existCode.id,
                userId,
                role: "member",
            },
        });
        return server_1.NextResponse.json({ status: "success", message: "Joined chat room successfully" });
    }
    catch (error) {
        return server_1.NextResponse.json({ status: "error", message: error?.message ?? String(error) }, { status: 500 });
    }
};
exports.POST = POST;
