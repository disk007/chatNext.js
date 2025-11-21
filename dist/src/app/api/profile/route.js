"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("next/server");
const prisma_1 = require("../../../../prisma/prisma");
const jose_1 = require("jose");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const GET = async (req) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return server_1.NextResponse.json({ message: "Missing token" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const { payload } = await (0, jose_1.jwtVerify)(token, JWT_SECRET);
        const userId = payload.id;
        if (!userId) {
            return server_1.NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
            },
        });
        if (!user) {
            return server_1.NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return server_1.NextResponse.json(user);
    }
    catch (error) {
        return server_1.NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
};
exports.GET = GET;
