"use server"; 

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function GetRoom() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return { status: 'error', message: 'missing' };
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = (payload as any).id as number;
        const res = await fetch(`${process.env.API_URL}/room/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
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