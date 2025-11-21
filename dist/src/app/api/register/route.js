"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("next/server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../../../prisma/prisma");
const POST = async (req) => {
    const body = await req.json();
    const { username, password } = body;
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return server_1.NextResponse.json({ status: 'duplicate', message: "Username exists" }, { status: 400 });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await prisma_1.prisma.user.create({
        data: { username, password: hashedPassword },
    });
    return server_1.NextResponse.json({ status: 'suscess', message: "User registered successfully" });
};
exports.POST = POST;
