"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("next/server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jose_1 = require("jose");
const prisma_1 = require("../../../../prisma/prisma");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const POST = async (req) => {
    const body = await req.json();
    const { username, password } = body;
    const user = await prisma_1.prisma.user.findUnique({
        where: { username },
    });
    if (!user) {
        return server_1.NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return server_1.NextResponse.json({ status: "error", message: "Invalid password" }, { status: 401 });
    }
    const token = await new jose_1.SignJWT({
        id: user.id,
        username: user.username,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(JWT_SECRET);
    return server_1.NextResponse.json({
        status: 'success',
        message: "login successfully",
        token: token
    });
};
exports.POST = POST;
