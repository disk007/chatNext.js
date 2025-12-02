"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessages = GetMessages;
const jose_1 = require("jose");
const cookies_1 = require("next/dist/server/request/cookies");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
async function GetMessages(id) {
    try {
        const cookieStore = await (0, cookies_1.cookies)();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return { status: 'error', message: 'missing' };
        }
        const { payload } = await (0, jose_1.jwtVerify)(token, JWT_SECRET);
        const userId = payload.id;
        const res = await fetch(`${process.env.API_URL}/messages/${id}/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const returnData = await res.json();
        if (!res.ok) {
            return returnData;
        }
        return returnData;
    }
    catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "Network error" };
    }
}
