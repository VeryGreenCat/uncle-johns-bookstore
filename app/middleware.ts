import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Get token from cookie

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!); // Verify JWT
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if token is invalid
  }

  return NextResponse.next(); // Continue to the page
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all routes under /dashboard
};
