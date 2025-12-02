import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

interface Params {
    params: {
        id: string;     // roomId จาก URL
        userId: string; // userId ของผู้ใช้ปัจจุบัน
    };
}

export const GET = async (request: NextRequest,
    context: { params: Promise<{ id: string; userId: string }> }
) => {
    try {
        const params = await context.params;
        const roomId = parseInt(params.id);
        const userId = parseInt(params.userId);
        const chat = await prisma.chatRoom.findUnique({
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

        return NextResponse.json({
            status: "success",
            chat: chatData,
        });
    }
    catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }


}