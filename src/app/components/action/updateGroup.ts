"use server";

export async function updateGroup (prevState:any,formData:FormData) {
    try {
        const formatData = {
            roomId: formData.get("roomId") as string,
            name:formData.get("name") as string
        }
        const  res = await fetch(`${process.env.API_URL}/editGroup`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
        })
        const returnData = await res.json();
        if (!res.ok) {
            return returnData ;
        }
        return returnData;
    } catch (error) {
        return { status: "error", message: error };
    }
}