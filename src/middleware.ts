import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) return token?.role === "admin";
      return Boolean(token);
    }
  }
});

export const config = {
  matcher: ["/account/:path*", "/checkout", "/admin/:path*"]
};
