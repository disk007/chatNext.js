import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";


export const POST = async (req: Request) =>{
    try {
        const body = await req.json();
        const {message, userId,roomId} = body;
        const newMessage = await prisma.message.create({
            data:{
                content: message,
                roomId: Number(roomId),
                senderId: userId,
            },
        });
        const chat = await prisma.message.findMany({
            where: {
                roomId: Number(roomId),
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
        return NextResponse.json({ status: "success", message: updatedMessages });
        
    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
    


}