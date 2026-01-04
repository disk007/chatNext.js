"use server";

export async function deleteMessage(formData:FormData) {
    try{
        const messageId = formData.get("messageId");
        const type = formData.get("type");
        const formatData = {
            messageId,
        }
        let res: any;
        if(type === "file"){
            console.log("delete file", messageId);
            console.log("type", type);
            res = await fetch(`${process.env.API_URL}/deleteFile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messageId }),
        });
        }
        else{
            res = await fetch(`${process.env.API_URL}/deleteMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
        });
        }
        const returnData = await res.json();
        if (!res.ok) {
            return returnData
        }
        return returnData;
    }
    catch (error) {
        return { status: "error", message: error };
    }
}