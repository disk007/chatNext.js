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
        const userId = (payload as any).id as number;
        const data = {
            message: formData.get("message") as string,
        };
        const parsed = AddMessageSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors = parsed.error.issues.reduce((acc, err) => {
                const key = err.path[0] as string;
                acc[key] = err.message;
                return acc;
            }, {} as Record<string, string>);
            const message =  fieldErrors.message
            return { status: 'validate', message};
        }
        const formatData = {
            message: formData.get("message") as string,
            roomId: formData.get("roomId") as string,
            userId
        }
        const res = await fetch(`${process.env.API_URL}/addChat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
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