"use server"; 

export async function getMembers(roomId:string){
    try {
        const res = await fetch(`${process.env.API_URL}/members/${roomId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const returnData = await res.json();
        if (!res.ok) {
            return returnData ;
        }
        return returnData;
    } catch (error) {
        console.error("API Error:", error);
        return { status: "error", message: "API Error" };
    }
}
