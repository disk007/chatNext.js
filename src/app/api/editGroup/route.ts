import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { roomId, name } = body;
        const existingRoom = await prisma.chatRoom.findUnique({
            where: { id: Number(roomId) },
            select: { name: true },
        });

        if (!existingRoom) {
            return NextResponse.json({ status: "error", message: "Room not found" }, { status: 404 });
        }

        if (existingRoom.name === name) {
            return NextResponse.json({
                status: "info",
                message: "No changes detected",
            });
        }
        await prisma.chatRoom.update({
            where: {
                id: Number(roomId),
            },
            data: {
                name: name,
            },
        });
        return NextResponse.json({ status: 'success', message: 'Group updated successfully' })
    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 })
    }
}