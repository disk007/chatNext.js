import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../prisma/prisma";

export const POST = async (req: Request) => {
    const body = await req.json();
    const { username, password } = body;
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return NextResponse.json({ status: 'duplicate', message: "Username exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { username, password: hashedPassword },
    });
    return NextResponse.json({ status: 'suscess',message: "User registered successfully" });
};