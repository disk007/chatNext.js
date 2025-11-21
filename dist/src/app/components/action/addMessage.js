"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = addMessage;
const jose_1 = require("jose");
const headers_1 = require("next/headers");
const validation_1 = require("../validation/validation");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
async function addMessage(prevState, formData) {
    try {
        const cookieStore = await (0, headers_1.cookies)();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return { status: 'error', message: 'missing' };
        }
        const { payload } = await (0, jose_1.jwtVerify)(token, JWT_SECRET);
        const userId = payload.id;
        const data = {
            message: formData.get("message"),
        };
        const parsed = validation_1.AddMessageSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors = parsed.error.issues.reduce((acc, err) => {
                const key = err.path[0];
                acc[key] = err.message;
                return acc;
            }, {});
            const message = fieldErrors.message;
            return { status: 'validate', message };
        }
        const formatData = {
            message: formData.get("message"),
            roomId: formData.get("roomId"),
            userId
        };
        const res = await fetch(`${process.env.API_URL}/addChat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
        });
        const returnData = await res.json();
        if (!res.ok) {
            return returnData;
        }
        return returnData;
    }
    catch (error) {
        return { status: "error", message: "Server error" };
    }
}
