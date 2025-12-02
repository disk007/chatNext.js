import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";


export const GET = async (request: Request,context: { params: Promise<{ id: string }> }) => {
    try{
        const params = await context.params;
        const userId = parseInt(params.id);
        const raw = await prisma.chatRoom.findMany({
            where: {
                members: {
                some: { userId: userId },
                },
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                _count: {
                    select: {
                        messages: {
                            where: {
                                isRead: false,
                                senderId: userId, // ถ้ามี field บอกว่าใครเป็นผู้รับ
                            },
                        },
                    },
                },
                messages: {
                    orderBy: { createdAt: 'desc' }, // เรียงจากล่าสุด
                    take: 1, // ดึงข้อความล่าสุด 1 ข้อความ
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        sender: {
                        select: {
                            id: true,
                            username: true,
                        },
                        },
                    },
                },
            },
        });

        const sortData = raw.sort((a, b) => {
            const aTime = a.messages[0]?.createdAt
                ? new Date(a.messages[0].createdAt).getTime()
                : 0;
            const bTime = b.messages[0]?.createdAt
                ? new Date(b.messages[0].createdAt).getTime()
                : 0;
            return bTime - aTime;
        });
        const rooms = sortData.map(room => ({
            id: room.id,
            name: room.name,
            createdAt: room.createdAt,
            messages: room.messages,
            unreadCount: room._count.messages
        }));
        return NextResponse.json({
            status: "success",
            rooms,
        });
    }
    catch(error){
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
    
    
}