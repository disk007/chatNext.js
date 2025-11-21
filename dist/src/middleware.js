"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
const jose_1 = require("jose");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
// เส้นทางที่ต้องการให้ "ล็อกอินก่อนถึงเข้าได้"
const protectedRoutes = ["/profile", "/dashboard", "/member", "/classroom"];
async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;
    if (!token) {
        return server_1.NextResponse.redirect(new URL("/login", req.url));
    }
    try {
        // ตรวจสอบ JWT token
        await (0, jose_1.jwtVerify)(token, JWT_SECRET);
        return server_1.NextResponse.next(); // ผ่านการตรวจสอบ
    }
    catch (error) {
        console.error("Invalid JWT:", error);
        return server_1.NextResponse.redirect(new URL("/login", req.url));
    }
}
exports.config = {
    matcher: ["//:path*", "/dashboard/:path*", "/member/:path*", "/classroom/:path*"],
};
