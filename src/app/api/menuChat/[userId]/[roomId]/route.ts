import { NextResponse } from "next/server"
import { prisma } from "../../../../../../prisma/prisma";

export const GET = async (req:Request,context: { params: Promise<{userId: string,roomId:string }> }) =>{
    try {
        const params = await context.params;
        const userId = parseInt(params.userId);
        const roomId = parseInt(params.roomId)
        console.log(userId)
        const permission = await prisma.chatMember.findFirst({
            where:{userId}
        })
        console.log(permission?.role)
        if(permission?.role != 'admin'){
            return NextResponse.json({status:"error",message:'Access denied'})
        }
        const approvedCount = await prisma.chatMember.count({
            where: { isApproved: true,roomId },
        });

        const pendingCount = await prisma.chatMember.count({
            where: { isApproved: false,roomId },
        });
        const messages = {
            approvedCount,
            pendingCount
        }
        return NextResponse.json({status:"success",messages})

    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 })
    }
}