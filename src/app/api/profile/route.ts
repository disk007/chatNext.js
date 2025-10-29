import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const GET = async (req: Request) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Missing token" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.id as number;

        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
        where: { id: userId },
            select: {
                id: true,
                username: true,
            },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
}