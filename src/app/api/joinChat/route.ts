import { NextResponse } from "next/server"
import { prisma } from "../../../../prisma/prisma";

export const POST = async (req:Request) => {
    try {
        const body = await req.json();
        const { code,userId } = body;

        const member = await prisma.chatMember.findFirst({
            where: {
                userId: userId,
                isApproved: true,
            },
        });
        if(member){
            return NextResponse.json({
                status: "warning",
                message: "User is an approved member.",
            });
        }
        const existCode = await prisma.chatRoom.findFirst({
            where:{ code },
        })
        if(!existCode){
            return NextResponse.json({
                status: "error",
                message: "Chat room not found",
            }, { status: 404 });
        }
        await prisma.chatMember.create({
            data: {
                roomId: existCode.id,
                userId,
                role: "member",
            },
        })

        return NextResponse.json({ status: "success", message: "Joined chat room successfully" });
    } catch (error:any) {
         return NextResponse.json({ status: "error", message: error?.message ?? String(error) }, { status: 500 })
    }
}