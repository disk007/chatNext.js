"use server"
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function getMenuChat(roomId:string){
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { status: 'error', message: 'missing' };
        }
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = (payload as any).id
        const res = await fetch(`${process.env.API_URL}/menuChat/${userId}/${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const returnData = await res.json();
        if (!res.ok) {
            return returnData ;
        }
        return returnData;
    } catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "Network error" };
    }

}