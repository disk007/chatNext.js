"use server";

export async function actionMembers(prevState: any, formData: FormData) {
    try {
        const actionType = formData.get("actionType");
        const formatData = {
            selectedIds: formData.getAll("selected"),
            actionType,
            roomId: formData.get("roomId")
        }
        const res = await fetch(`${process.env.API_URL}/members/actions`, {
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
        console.log('returnData ',returnData)
        return returnData;

    } catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "API Error" };
    }
}