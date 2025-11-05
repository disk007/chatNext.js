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
        const approvedCount = await prisma.chatMember.count({
            where: { isApproved: true,roomId },
        });

        const pendingCount = await prisma.chatMember.count({
            where: { isApproved: false,roomId },
        });
        let messages:any
        if(permission?.role != 'admin'){
            messages = {
                approvedCount,
                pendingCount,
                role:permission?.role
            }
        }
        else{
            messages = {
                approvedCount,
                pendingCount:null,
                role:permission?.role
            }
        }
        
        return NextResponse.json({status:"success",messages})

    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 })
    }
}