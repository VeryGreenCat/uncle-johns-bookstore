import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Custom middleware function that also checks the user's role
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If the request is for an admin route but the user is not an admin, redirect to the home page
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Otherwise, allow the request to proceed
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/", // Redirects unauthenticated users to the home page
    },
  }
);

export const config = {
  // Protect user pages and all admin pages
  matcher: [
    "/favourite",
    "/OrderHistory",
    "/payment",
    "/profile",
    "/admin/:path*",
  ],
};
