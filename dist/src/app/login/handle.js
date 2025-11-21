"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLoginSubmit = handleLoginSubmit;
const headers_1 = require("next/headers");
const validation_1 = require("./validation");
const navigation_1 = require("next/navigation");
async function handleLoginSubmit(prevState, formData) {
    const data = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const parsed = validation_1.LoginSchema.safeParse(data);
    if (!parsed.success) {
        const fieldErrors = parsed.error.issues.reduce((acc, err) => {
            const key = err.path[0];
            acc[key] = err.message;
            return acc;
        }, {});
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
            return returnData;
        }
        if (returnData.token) {
            const cookiesInstance = await (0, headers_1.cookies)();
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
    }
    catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "Network error" };
    }
    (0, navigation_1.redirect)('/');
}
