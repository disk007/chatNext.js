import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { messageId } = body;
        const files = await prisma.messageFile.findMany({
            where: { messageId: Number(messageId) },
            select: { storedName: true },
        });
        const nameMessage = await prisma.message.findUnique({
            where: { id: Number(messageId) },
            select: { content: true },
        });
        const deletedFile = await prisma.messageFile.deleteMany({
            where: {
                messageId: Number(messageId)
            }
        })
        if (nameMessage?.content == "") {
            await prisma.message.delete({
                where: { id: Number(messageId) },
            });
        }
        if (deletedFile.count === 0) {
            return NextResponse.json({ status: "error", message: "File not found" }, { status: 404 });
        }
        for (const file of files) {
            const filePath = path.join(
                process.cwd(),
                "uploads",
                file.storedName
            );
            try {
                await fs.unlink(filePath);
            } catch (err) {
                console.warn("Cannot delete file:", filePath);
            }
        }
        return NextResponse.json({ status: "success", message: deletedFile, type: "file" });

    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
}