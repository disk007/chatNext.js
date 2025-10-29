"use server"; 

import { RegisterSchema, RegisterData } from "./validation";

export async function handleRegisterSubmit(prevState:any,formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    cPassword: formData.get("cPassword") as string,
  };
  const parsed = RegisterSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors = parsed.error.issues.reduce((acc, err) => {
      const key = err.path[0] as string;
      acc[key] = err.message;
      return acc;
    }, {} as Record<string, string>);
    return { status: 'validate', errors: fieldErrors };
  }
  try {
    const res = await fetch(`${process.env.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
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