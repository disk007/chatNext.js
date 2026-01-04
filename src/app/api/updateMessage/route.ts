import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try{
        const body = await req.json();
        const { messageId, newContent } = body;
        const updatedMessage = await prisma.message.update({
            where: {
                id: Number(messageId),
            },
            data: {
                content: newContent,
            },
        });
        if (!updatedMessage) {
            return NextResponse.json({ status: "error", message: "Message not found" }, { status: 404 });
        }
        return NextResponse.json({ status: "success", message: updatedMessage });
    }
    catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
}