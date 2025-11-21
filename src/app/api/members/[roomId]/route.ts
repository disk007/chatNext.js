import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/prisma";

export const GET = async (req:NextRequest,context:{params:Promise<{roomId:string}>}) => {
    try {
        const params = await context.params;
        const roomId = parseInt(params.roomId)
        const members = await prisma.chatMember.findMany({
            where:{roomId,isApproved:true},
            select:{
                user: {        // <-- ดึงข้อมูลจาก relation User
                    select: {
                        id: true,
                        username: true,
                    },
                },
            }
        })
        return NextResponse.json({status:"success",messages:members})
    } catch (error) {
        return NextResponse.json({status:"error",message:error})
    }
}