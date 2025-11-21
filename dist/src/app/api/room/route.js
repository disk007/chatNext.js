"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const server_1 = require("next/server");
const prisma_1 = require("../../../../prisma/prisma");
const nanoid_1 = require("nanoid");
const POST = async (request) => {
    const body = await request.json();
    const { room, userId } = body;
    const code = (0, nanoid_1.nanoid)(8);
    const newRoom = await prisma_1.prisma.chatRoom.create({
        data: {
            name: room,
            createdBy: userId,
            code
        },
    });
    await prisma_1.prisma.chatMember.create({
        data: {
            roomId: newRoom.id,
            userId,
            role: "admin",
        },
    });
    return server_1.NextResponse.json({ status: 'success', message: "Room created successfully" });
};
exports.POST = POST;
// export const GET = async (request: Request) => {
//     try{
//         const body = await request.json();
//         const { userId } = body;
//         const rooms = await prisma.chatRoom.findMany({
//         where: {
//             members: {
//             some: { userId: userId }, 
//             },
//         },
//         include: {
//             members: {
//                 include: { user: true }, 
//             },
//         },
//         });
//         return NextResponse.json({
//             status: "success",
//             rooms,
//         });
//     }
//     catch(error){
//         return NextResponse.json({ status: "error", message: "Network error" }, { status: 500 });
//     }
// }
