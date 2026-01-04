import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { messageId } = body;
        const id = Number(messageId);

    // 1️⃣ เช็คว่ามี file ผูกอยู่ไหม
    const fileCount = await prisma.messageFile.count({
      where: { messageId: id },
    });

    let result;

    if (fileCount > 0) {
      result = await prisma.message.update({
        where: { id },
        data: { content: "" },
      });
    } else {
      // 3️⃣ ไม่มี file → ลบทั้ง message
      result = await prisma.message.delete({
        where: { id },
      });
      await prisma.messageFile.deleteMany({
        where: { messageId: id },
      });
    }
    console.log("Delete message result:", result);
        return NextResponse.json({ status: "success", message: result,type:"message" });
    } catch (error) {
        return NextResponse.json({ status: "error", message: error }, { status: 500 });
    }
}