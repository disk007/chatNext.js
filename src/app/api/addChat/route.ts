import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import crypto from "crypto";
import fs from "fs";
import path from "path";


export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const message = formData.get("message") as string;
    const roomId = formData.get("roomId") as string;
    const userId = Number(formData.get("userId"));
    const files = formData.getAll("file") as File[];
    const uploadedFiles: {
      originalName: string;
      storedName: string;
    }[] = [];
    if (files && files.length > 0) {
      console.log("Received files:", files);
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of files) {
        if (!(file instanceof File) || file.size === 0) continue;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const originalName = file.name;
        const ext = path.extname(file.name);
        const storedName = `${crypto.randomUUID()}${ext}`;

        await fs.promises.writeFile(
          path.join(uploadDir, storedName),
          buffer
        );

        uploadedFiles.push({ originalName, storedName });
      }
    }
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        files: {
          create: uploadedFiles,
        },
        roomId: Number(roomId),
        senderId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        senderId: true,
        sender: {
          select: {
            username: true,
          },
        },
        files: {
          select: {
            originalName: true,
            storedName: true,
          },
        },
      },
    });
    const chat = await prisma.message.findMany({
      where: {
        roomId: Number(roomId),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        senderId: true,
        sender: {
          select: {
            username: true,
          },
        },
      },
    });
    const formatted = {
      id: newMessage.id,
      content: newMessage.content,
      createdAt: newMessage.createdAt,
      anotherChat: newMessage.senderId !== userId,
      senderId: newMessage.senderId,
      username: newMessage.sender?.username || "Unknown",
      files: newMessage.files.map((file) => ({
        originalName: file.originalName,
        storedName: file.storedName,
      })),
    };
    return NextResponse.json({ status: "success", message: formatted });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error },
      { status: 500 }
    );
  }
};
