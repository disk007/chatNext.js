import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// เส้นทางที่ต้องการให้ "ล็อกอินก่อนถึงเข้าได้"
const protectedRoutes = ["/profile", "/dashboard", "/member", "/classroom"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ตรวจสอบ JWT token
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next(); // ผ่านการตรวจสอบ
  } catch (error) {
    console.error("Invalid JWT:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["//:path*", "/dashboard/:path*", "/member/:path*", "/classroom/:path*"],
};
