"use server"
import { cookies } from "next/headers";
import { JoinRoomSchema } from "../validation/validation";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function JoinChatRoom(prevState:any, formData:FormData) {
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return { status: 'error', message: 'missing' };
        }
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = (payload as any).id as number;
        const data = {
            code: formData.get("code") as string,
        };
        const parsed = JoinRoomSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors = parsed.error.issues.reduce((acc, err) => {
                const key = err.path[0] as string;
                acc[key] = err.message;
                return acc;
            }, {} as Record<string, string>);
            return { status: 'validate', errors: fieldErrors};
        }
        const formatData = {
            code: formData.get("code") as string,
            userId
        }
        const res = await fetch(`${process.env.API_URL}/joinChat`, {
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
        return { status: "error", message: error };
    }
}