import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest,
   context: { params: Promise<{id: string;userId:string}>}) => {
    try {
        const params = await context.params;
        const roomId = parseInt(params.id);
        const userId = parseInt(params.userId);

        const chat = await prisma.message.findMany({
            where: {
                roomId: roomId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
            },
        });
        const updatedMessages = chat?.map(msg => ({
            id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt,
            anotherChat: msg.senderId !== userId, 
        }));
        return NextResponse.json({
            status: "success",
            chat:updatedMessages,
        });
    } catch (error) {
        console.error("Error fetching chat details:", error);
        return NextResponse.json({
            status: "error",
            message: "Internal server error",
        }, { status: 500 });
    }
   }