"use server"; 

import { cookies } from "next/headers";
import { LoginSchema, LoginData } from "./validation";
import { redirect } from "next/navigation";

export async function handleLoginSubmit(prevState:any,formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce((acc, err) => {
      const key = err.path[0] as string;
      acc[key] = err.message;
      return acc;
    }, {} as Record<string, string>);
    return { status: 'validate', errors: fieldErrors };
  }
  try {
    const res = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
      credentials: "include",
    });
    const returnData = await res.json();
    if (!res.ok) {
      return returnData ;
    }
    if (returnData.token) {
      const cookiesInstance = await cookies()
      cookiesInstance.set({
        name: "token",
        value: returnData.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", 
        path: "/",
        maxAge: 60 * 60 * 24, // 1 วัน
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return { status: "error", message: "Network error" };
  }
  redirect('/');
}