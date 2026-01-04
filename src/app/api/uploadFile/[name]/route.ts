import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mime from "mime";

export const GET = async(req: NextRequest, context:{params:Promise<{name:string}>}) =>{
  try {
    const params = await context.params
    const name = params.name;
    console.log("name : ",name);
    const filePath = path.join(process.cwd(), "uploads", name);
    console.log("filePath : ",filePath);
    if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const buffer = fs.readFileSync(filePath);
    const type = mime.getType(filePath) || "application/octet-stream";
    return new Response(buffer, { headers: { "Content-Type": type } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}