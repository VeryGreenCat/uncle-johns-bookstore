import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirects to the home page
  },
});

export const config = {
  matcher: ["/favourite", "/OrderHistory", "/payment", "/profile"], // Protected routes
};
