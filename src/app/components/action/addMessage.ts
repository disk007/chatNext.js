"use server"; 

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AddMessageSchema } from "../validation/validation";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function addMessage(prevState:any, formData: FormData) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return { status: 'error', message: 'missing' };
        }
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const files = formData.getAll("file") as File[];
        const userId = (payload as any).id as number;
        const data = {
            message: formData.get("message") as string,
        };
        const formatData = new FormData();
        formatData.append("message", formData.get("message") as string);
        formatData.append("roomId", formData.get("roomId") as string);
        formatData.append("userId", String(userId));

        const startsWithSpace = /^\s+/.test(data.message);
        for (const file of files) {
            if (file instanceof File && file.size > 0) {
                formatData.append("file", file);
            }
        }
        const hasFiles = files.some(
            f => f instanceof File && f.size > 0
        );
        if((data.message.trim() === "" || startsWithSpace) && (!hasFiles)){
            return
        }
        const res = await fetch(`${process.env.API_URL}/addChat`, {
            method: "POST",
            body: formatData,
        })
        const returnData = await res.json();
        if (!res.ok) {
            return returnData ;
        }
        return returnData;
        
    }
    catch(error){
        return { status: "error", message: "Server error" };
    }
}