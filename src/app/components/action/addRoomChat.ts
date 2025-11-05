"use server"; 

import { cookies } from "next/headers";
import { AddRoomSchema } from "../validation/validation"
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export async function handleAddRoom(prevState:any,formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return { status: 'error', message: 'missing' };
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = (payload as any).id as number;
    const data = {
        room: formData.get("room") as string,
    };
    const parsed = AddRoomSchema.safeParse(data);
    if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce((acc, err) => {
        const key = err.path[0] as string;
        acc[key] = err.message;
        return acc;
    }, {} as Record<string, string>);
    return { status: 'validate', errors: fieldErrors };
    }
  try {
    const formatData = {
        room: formData.get("room") as string,
        userId
    }
    const res = await fetch(`${process.env.API_URL}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatData),
    });
    const returnData = await res.json();
    if (!res.ok) {
      return returnData ;
    }
    return returnData;
  } catch (error) {
    console.error("API Error:", error);
    return { status: "error", message: "API Error" };
  }
}