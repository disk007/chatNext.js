"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroup = updateGroup;
async function updateGroup(prevState, formData) {
    try {
        const formatData = {
            roomId: formData.get("roomId"),
            name: formData.get("name")
        };
        const res = await fetch(`${process.env.API_URL}/editGroup`, {
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
        return { status: "error", message: error };
    }
}
