import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request,context: { params: Promise<{ id: string }> }) => {
    try {
        const params = await context.params;
        const userId = parseInt(params.id);
        const raw = await prisma.message.findFirst({
            where:{
                senderId: userId,
                isRead: false,

            }
        })
        return NextResponse.json({
            status: "success",
            message: raw,
        });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
}