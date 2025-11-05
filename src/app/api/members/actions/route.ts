import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { selectedIds, actionType, roomId } = body;
        if (actionType === "approve") {
            await prisma.chatMember.updateMany({
                where: { userId: { in: selectedIds.map(Number) }, roomId: Number(roomId) },
                data: { isApproved: true },
            });
        }
        else if (actionType === "reject") {
            await prisma.chatMember.deleteMany({
                where: { userId: { in: selectedIds.map(Number) }, roomId: Number(roomId) },
            })
        }
        return NextResponse.json({ status: "success", message: actionType == "approve" ? "Approved successfully" : "Reject successfully" })
    } catch (error) {
        return NextResponse.json({ status: "error", message: error })
    }
}