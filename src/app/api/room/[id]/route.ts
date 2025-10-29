import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";


export const GET = async (request: Request,context: { params: Promise<{ id: string }> }) => {
    try{
        const params = await context.params;
        const userId = parseInt(params.id);
        const rooms = await prisma.chatRoom.findMany({
            where: {
                members: {
                some: { userId: userId },
                },
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
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


        return NextResponse.json({
            status: "success",
            rooms,
        });
    }
    catch(error){
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
    
    
}