import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export const POST = async (request: Request) => {
    const body = await request.json();
    const { room,userId } = body;

    const newRoom = await prisma.chatRoom.create({
        data: { 
            name: room,  
            createdBy: userId,    
        },
    });
    await prisma.chatMember.create({
      data: {
        roomId: newRoom.id,
        userId,
        role: "admin",
      },
    });
    return NextResponse.json({ status: 'success', message: "Room created successfully"});
}

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