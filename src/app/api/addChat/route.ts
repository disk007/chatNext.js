import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";


export const POST = async (req: Request) =>{
    try {
        const body = await req.json();
        const {message, userId,roomId} = body;
        await prisma.message.create({
            data:{
                content: message,
                roomId: Number(roomId),
                senderId: userId,
            },
        });
        return NextResponse.json({ status: "success", message: "Message added successfully" });
        
    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
    


}