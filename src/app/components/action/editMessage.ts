"use server";

import { EditMessageSchema } from "../validation/validation";

export async function editMessage(prev: any, formData: FormData) {
    try {
        const data = {
            message: formData.get("message") as string,
        };
        const parsed = EditMessageSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors = parsed.error.issues.reduce((acc, err) => {
                const key = err.path[0] as string;
                acc[key] = err.message;
                return acc;
            }, {} as Record<string, string>);
            const message = fieldErrors.message
            return { status: 'validate', chat:message };
        }
        const formatData = {
            messageId: formData.get("messageId") as string,
            newContent: formData.get("message") as string,
        }
        const res = await fetch(`${process.env.API_URL}/updateMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
        })
        const returnData = await res.json();
        if (!res.ok) {
            return returnData;
        }
        return returnData;
    } catch (error) {
        return { status: "error", message: error };
    }
}