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
                files: {
                    select: {
                        id: true,
                        originalName: true,
                        storedName: true,
                    },
                },
            },
            orderBy: {
                id: "asc",
            },
        });
        await prisma.message.updateMany({
            where: {
                roomId: roomId,
                senderId: userId,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
        return NextResponse.json({
            status: "success",
            chat:chat,
        });
    } catch (error) {
        console.error("Error fetching chat details:", error);
        return NextResponse.json({
            status: "error",
            message: "Internal server error",
        }, { status: 500 });
    }
   }