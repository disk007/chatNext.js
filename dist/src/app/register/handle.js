"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegisterSubmit = handleRegisterSubmit;
const validation_1 = require("./validation");
async function handleRegisterSubmit(prevState, formData) {
    const data = {
        username: formData.get("username"),
        password: formData.get("password"),
        cPassword: formData.get("cPassword"),
    };
    const parsed = validation_1.RegisterSchema.safeParse(data);
    if (!parsed.success) {
        const fieldErrors = parsed.error.issues.reduce((acc, err) => {
            const key = err.path[0];
            acc[key] = err.message;
            return acc;
        }, {});
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
            return returnData;
        }
        return returnData;
    }
    catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "Network error" };
    }
}
