import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../prisma/prisma";

interface Params {
  params: {
    id: string;     // roomId จาก URL
    userId: string; // userId ของผู้ใช้ปัจจุบัน
  };
}

export const GET = async (request: Request,
   context: { params: Promise<{ id: string; userId: string }> }
) => {
    try{
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
                messages: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        senderId: true,
                    },
                },
            },
        });
        const updatedMessages = chat?.messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt,
            anotherChat: msg.senderId !== userId, 
        }));

        return NextResponse.json({
            status: "success",
            chat: {
                ...chat,
                messages: updatedMessages
            },
        });
    }
    catch(error){
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
    
    
}